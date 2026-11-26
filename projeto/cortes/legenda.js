// Gera PNGs transparentes da legenda e a lista (concat) com a duração de cada um.
// Uso: node legenda.js chunks.json pasta_saida
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
const [, , specPath, outDir] = process.argv, spec = JSON.parse(fs.readFileSync(specPath, 'utf8')), FPS = 30;
(async () => {
  const br = await chromium.launch({ args: ['--no-sandbox'] }), pg = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.goto('file://' + path.resolve(__dirname, 'legenda.html')); await pg.evaluate(() => document.fonts.ready);
  fs.mkdirSync(outDir, { recursive: true }); let n = 0; const list = [];
  const shot = async (html, s, o) => { await pg.evaluate(([h, a, b]) => window.setText(h, a, b), [html, s, o]); const f = path.resolve(outDir, `f${String(n++).padStart(5, '0')}.png`); await pg.screenshot({ path: f, omitBackground: true }); return f; };
  const blank = await shot('', 1, 0); let t = 0;
  for (const c of spec.chunks) {
    if (c.start > t + 1e-3) { list.push([blank, c.start - t]); t = c.start; }
    const html = c.words.map(w => `<span class="${w.cls}">${w.t}</span>`).join(' ');
    const dur = c.end - c.start, p0 = Math.min(2 / FPS, dur / 3);
    list.push([await shot(html, .92, .55), p0], [await shot(html, 1.035, 1), p0], [await shot(html, 1, 1), Math.max(dur - 2 * p0, 1 / FPS)]); t = c.end;
  }
  if (t < spec.total) list.push([blank, spec.total - t]);
  fs.writeFileSync(path.join(outDir, 'list.txt'), list.map(([f, d]) => `file '${f}'\nduration ${d.toFixed(4)}`).join('\n') + `\nfile '${list[list.length - 1][0]}'\n`);
  await br.close(); console.log('legenda ok', n, 'quadros');
})();
