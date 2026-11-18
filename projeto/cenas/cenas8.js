// Preview: gancho com cortes rápidos, texto que "bate", tremor de impacto e squash & stretch.
const slam = (p, t0, dur = .18) => { const k = clamp((p - t0) / dur); return k <= 0 ? 'opacity:0' : `opacity:1;transform:scale(${1 + (1 - back(k)) * -0 + (1 - k) * .9})`; };
CENAS.v_gancho = (p, d) => {
  const hit = 1.15, dt = p - hit, imp = dt > 0 ? Math.exp(-dt * 6) : 0;
  const shake = imp * Math.sin(p * 120) * 9, flash = dt > 0 && dt < .09 ? .75 : 0;
  const sq = dt > 0 ? .16 * Math.exp(-dt * 5) * Math.sin(dt * 28) : 0;
  // planos: A close no cliente (0–1.0), B aberto (1.0–2.0), C close no Léo (2.0–fim)
  const shot = p < 1.0 ? { s: 1.9 + p * .12, x: 247, y: -19 } : p < 2.0 ? { s: 1.0 + imp * .08, x: shake, y: 0 } : { s: 1.8 + (p - 2) * .1, x: -144 + shake * .3, y: 126 };
  const mundo = barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: .3, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 9) * 5 * (p < 1.1 ? 1 : 0), oculos: true, cor: '#64748B', pele: '#B77A53', mood: 'feliz' }), 55, 430, 170) +
    abs('left:170px;top:590px', celular(0, 0, 100, chatIA, -6).replace('position:absolute;left:0px;top:0px', 'position:absolute')) +
    abs(`left:250px;top:340px;width:200px;transform-origin:50% 100%;transform:scale(${1 - sq},${1 + sq * 1.6}) translateY(${imp * -10}px)`, '') +
    figR(leo({ mood: dt > 0 ? 'surpreso' : 'normal', bob: Math.sin(p * 5) * 2, pisca: piscar(p), olhar: -4, e: [20 + imp * 30, -30], d: [-20 - imp * 30, -30] }), 250, 340, 200, `transform-origin:50% 100%;transform:scale(${1 - sq},${1 + sq * 1.6})`) + (dt > 0 ? suor(p, 396, 360) : '') + (p > 1.7 ? bolha('é… eu…', 330, 300, 120, p, 1.7) : '');
  return `<div style="position:absolute;inset:0;transform-origin:50% 50%;transform:translate(${shot.x}px,${shot.y}px) scale(${shot.s})">${mundo}</div>` + vinheta +
    abs(`left:0;right:0;top:100px;text-align:center;font:400 58px/1 Anton;color:#FDE047;text-shadow:0 6px 0 #000;${slam(p, .05)}`, 'TODO MUNDO JÁ USA IA.') +
    abs(`left:0;right:0;top:170px;text-align:center;font:400 124px/1 Anton;color:#F87171;text-shadow:0 7px 0 #000;transform-origin:center;${slam(p, hit, .12)}`, `<div style="transform:translateX(${shake}px) rotate(${shake * .15}deg)">E VOCÊ?</div>`) +
    abs(`inset:0;background:#fff;opacity:${flash}`, '');
};
META.v_gancho = { semLeg: true, cam: [1, 1, 0, 0, 0, 0] };
