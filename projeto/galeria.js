// Contact sheet de cenas. Uso: node galeria.js cena1,cena2,... [segundos_na_cena=3] [duracao=6]
const { chromium } = require('playwright'), path = require('path'), { spawnSync } = require('child_process');
(async () => {
  const nomes = (process.argv[2] || '').split(',').filter(Boolean), P = +(process.argv[3] || 3), D = +(process.argv[4] || 6);
  const br = await chromium.launch({ args: ['--no-sandbox'] }), pg = await br.newPage({ viewport: { width: 540, height: 960 } });
  pg.on('pageerror', e => console.log('PAGEERR', e.message));
  const tl = { total: nomes.length * D, etapas: 5, cenas: nomes.map((n, i) => ({ cena: n, start: i * D, dur: D, selo: { n: 1 + (i % 5), txt: 'Capitulo teste' }, palavras: [{ w: 'LEGENDA', s: i * D + .5, e: i * D + 5 }, { w: 'TESTE', s: i * D + .5, e: i * D + 5 }] })) };
  await pg.addInitScript(t => { window.TL = t; }, tl); await pg.goto('file://' + path.resolve('motor.html')); await pg.waitForFunction('window.pronto');
  for (let i = 0; i < nomes.length; i++) { await pg.evaluate(t => window.seek(t), i * D + P); await pg.screenshot({ path: `/tmp/w/g${i}.png` }); }
  await br.close();
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-start_number', 0, '-i', '/tmp/w/g%d.png', '-vf', `scale=270:-1,tile=${Math.min(nomes.length, 7)}x${Math.ceil(nomes.length / 7)}`, '-frames:v', 1, 'saida/galeria3.png'], { stdio: 'inherit' });
})();
