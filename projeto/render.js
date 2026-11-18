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
  // áudio: voz + efeitos + trilha
  if (!fs.existsSync('audio/sfx_snip.wav')) spawnSync('python3', ['sfx.py'], { stdio: 'inherit' });
  const SFX = { v_gancho: [[1.15, 'thud']], r_crise: [[.25, 'pop'], [1.5, 'pop'], [2.2, 'thud']], r_conta: [[2.0, 'pop'], [2.6, 'pop'], [3.2, 'pop'], [4.2, 'ding']],
    r_contrata: [[1.9, 'thud'], [2.0, 'pop'], [2.4, 'pop'], [2.8, 'pop'], [3.1, 'ding']], r_site: [[.4, 'pop'], [1.0, 'pop'], [1.6, 'pop']], r_diario: [[.5, 'ding'], [1.1, 'ding'], [1.7, 'ding'], [2.3, 'ding'], [2.9, 'ding']],
    r_clientepost: [[2.0, 'ding'], [2.2, 'pop']], r_dono: [[.5, 'pop'], [1.4, 'pop'], [2.3, 'pop']], r_mais: [[.3, 'pop'], [1.8, 'pop'], [3.0, 'thud']], r_foto: [[.5, 'pop']], r_cta: [[2.2, 'pop']], r_perfil: [[1.2, 'pop'], [2.4, 'pop']],
    st_gancho: [[.2, 'snip'], [.7, 'snip'], [1.1, 'snip'], [1.9, 'snip'], [2.4, 'snip'], [3.0, 'snip']], st_aurelio: [[.5, 'snip'], [1.4, 'snip'], [2.3, 'snip'], [3.2, 'snip'], [3.6, 'pop']], st_leo: [[1.6, 'pop'], [2.5, 'pop'], [3.3, 'pop']],
    st_noticia: [[.8, 'thud']], st_marta: [[.3, 'sino'], [2.1, 'pop']], st_ia_noite: [[.5, 'pop'], [1.6, 'ding'], [3.4, 'thud']], st_rejeita: [[1.2, 'pop'], [3.3, 'pop']],
    st_escuta: [[1.3, 'pop'], [3.9, 'pop'], [6.5, 'pop']], st_direcao: [[3.2, 'ding']], st_noite_post: [[1.0, 'ding'], [1.8, 'ding'], [2.6, 'ding'], [3.3, 'ding']],
    st_fila: [[1.2, 'pop'], [2.4, 'pop']], st_emocao: [[3.4, 'pop'], [3.8, 'pop'], [4.2, 'pop']], st_fecho: [[1.0, 'pop'], [3.3, 'thud']] };
  const evs = [];
  TL.cenas.forEach((c, i) => { evs.push([`audio/${c.audio.split('/').pop()}`, c.audio_start, 1.0]); if (i > 0) evs.push(['audio/sfx_whoosh.wav', c.start - .04, .55]); (SFX[c.cena] || []).forEach(([t, k]) => evs.push([`audio/sfx_${k}.wav`, c.start + t, k === 'thud' ? .8 : .5])); });
  const ins = [], fil = [];
  evs.forEach(([f, t, v], i) => { ins.push('-i', f); fil.push(`[${i + 1}:a]adelay=${Math.round(t * 1000)}|${Math.round(t * 1000)},volume=${v}[a${i}]`); });
  ins.push('-stream_loop', '-1', '-i', 'audio/music.wav'); const mi = evs.length + 1;
  fil.push(`[${mi}:a]volume=.5,afade=t=in:d=1.5[m]`);
  const mix = fil.join(';') + ';' + evs.map((_, i) => `[a${i}]`).join('') + `[m]amix=inputs=${evs.length + 1}:normalize=0:dropout_transition=0,afade=t=out:st=${Math.max(0, TL.total - 1.2)}:d=1.2[a]`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', FPS, '-i', `${frames}/f%06d.jpg`, ...ins, '-filter_complex', mix,
    '-map', '0:v', '-map', '[a]', '-t', TL.total, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], { stdio: 'inherit' });
  if (r.status) process.exit(r.status);
  fs.rmSync(frames, { recursive: true, force: true }); console.log('ok →', out);
})();
