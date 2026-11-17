// Uso: node render.js [saida/video.mp4] [--fps 30] [--workers 4]
// Lê audio/timeline.json, renderiza os quadros com Playwright (1080x1920) e junta com a voz via ffmpeg.
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const { chromium } = require('playwright');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const out = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'saida/video.mp4';
const FPS = +arg('--fps', 30), W = +arg('--workers', 4);
const TL = JSON.parse(fs.readFileSync('audio/timeline.json', 'utf8'));
const frames = path.resolve('saida/frames'); fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
const N = Math.ceil(TL.total * FPS);
(async () => {
  const br = await chromium.launch({ args: ['--no-sandbox'] });
  let next = 0, feitos = 0;
  await Promise.all(Array.from({ length: W }, async () => {
    const ctx = await br.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
    const pg = await ctx.newPage(); await pg.addInitScript(tl => { window.TL = tl; }, TL);
    await pg.goto('file://' + path.resolve('motor.html')); await pg.waitForFunction('window.pronto');
    for (;;) {
      const n = next++; if (n >= N) break;
      await pg.evaluate(t => window.seek(t), n / FPS);
      await pg.screenshot({ path: `${frames}/f${String(n).padStart(6, '0')}.jpg`, type: 'jpeg', quality: 92 });
      if (++feitos % 60 === 0) process.stdout.write(`\rquadros ${feitos}/${N}`);
    }
  }));
  await br.close(); console.log(`\rquadros ${N}/${N}`);
  const ins = [], fil = []; TL.cenas.forEach((c, i) => { ins.push('-i', c.audio); fil.push(`[${i + 1}:a]adelay=${Math.round(c.audio_start * 1000)}|${Math.round(c.audio_start * 1000)}[a${i}]`); });
  const mix = fil.join(';') + ';' + TL.cenas.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${TL.cenas.length}:normalize=0:dropout_transition=0[a]`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', FPS, '-i', `${frames}/f%06d.jpg`, ...ins, '-filter_complex', mix,
    '-map', '0:v', '-map', '[a]', '-t', TL.total, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], { stdio: 'inherit' });
  if (r.status) process.exit(r.status);
  fs.rmSync(frames, { recursive: true, force: true }); console.log('ok →', out);
})();
