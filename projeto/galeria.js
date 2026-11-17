// Gera saida/galeria.png com todas as cenas (para revisar o visual). Uso: node galeria.js
const { chromium } = require('playwright'), path = require('path');
(async () => {
  const br = await chromium.launch({ args: ['--no-sandbox'] }), pg = await br.newPage({ viewport: { width: 540, height: 960 } });
  const nomes = ['barbearia_ocupada','horas_postando','leo_pensando','concorrente_perfil','concorrente_posts','kosta_empresa','agencia_vs_kosta','contratar','pedido_chat','posts_do_dia','curtidas','semanas','viral','fila_clientes','cta','kosta_chega','conteudo_chegando','perfil_cheio'];
  const tl = { total: 40, etapas: 0, cenas: nomes.map((n, i) => ({ cena: n, start: i * 4, dur: 4, palavras: [] })) };
  await pg.addInitScript(t => { window.TL = t; }, tl); await pg.goto('file://' + path.resolve('motor.html')); await pg.waitForFunction('window.pronto');
  for (let i = 0; i < nomes.length; i++) { await pg.evaluate(t => window.seek(t), i * 4 + 3.2); await pg.screenshot({ path: `/tmp/w/g${i}.png` }); }
  await br.close();
})();
