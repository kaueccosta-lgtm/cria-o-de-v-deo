// Perfil crescendo na própria barbearia (mantém o mesmo mundo, sem fundo roxo).
CENAS.r_perfil = (p, d) => {
  const steps = [[0, 83, 'SEMANA 1', ''], [1.2, 93, 'SEMANA 2', '+10'], [2.4, 123, 'SEMANA 3', '+30']], cur = steps.filter(s => p >= s[0]).pop(), ab = 4 + 18 * Math.abs(Math.sin(p * 15));
  return barbeariaReal(p) + abs('inset:0;background:#000;opacity:.5', '') + figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, olhar: -3, e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6, 4] }), 330, 560, 150) +
    celular(170, 120, 240, perfilInsta('@barbearia_leo', Math.min(9, 3 + Math.floor(p * 1.5)), cur[1], 170), Math.sin(p * 1.5)) +
    steps.map(([t0, , lab, plus]) => abs(`left:20px;top:${150 + steps.findIndex(s => s[2] === lab) * 90}px;${pop(p, t0, .3)}`, `<div style="background:#EFEBE0;color:#141414;border-radius:12px;padding:8px 12px;font:500 12px GeistMono;letter-spacing:.06em">${lab}<div style="font:900 24px Archivo;font-stretch:120%;color:#264466">${plus || '83'}</div></div>`)).join('') +
    [...Array(8)].map((_, i) => { const ph = (p * 90 + i * 60) % 400; return abs(`left:${180 + (i * 47) % 220}px;top:${700 - ph}px;font-size:${20 + i % 3 * 7}px;color:#F43F5E;opacity:${clamp(1 - ph / 400)}`, '♥'); }).join('') +
    nota('que corte!', 360, 400, 120, p, 1.6) + nota('onde fica?', 20, 500, 120, p, 2.6) + vinheta;
};
META.r_perfil = { cam: [1, 1.04, 0, 0, 0, 0] };
