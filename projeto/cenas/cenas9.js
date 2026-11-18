// v5 final: 12 partes no estilo "cartoon com vida" (cortes rápidos, texto que bate, squash & stretch).
const planos = (p, list) => { let t0 = 0; for (const [t1, s, x, y] of list) { if (p < t1) return { s: s + (p - t0) * .06, x, y }; t0 = t1; } const l = list[list.length - 1]; return { s: l[1] + (p - t0) * .06, x: l[2], y: l[3] }; };
const camR = (inner, sh) => `<div style="position:absolute;inset:0;transform-origin:50% 50%;transform:translate(${sh.x}px,${sh.y}px) scale(${sh.s})">${inner}</div>`;
const sqz = (p, t0, a = .15) => { const dt = p - t0; return dt > 0 ? a * Math.exp(-dt * 5) * Math.sin(dt * 28) : 0; };
const sqS = s => `transform-origin:50% 100%;transform:scale(${1 - s},${1 + s * 1.6})`;
const slamT = (txt, p, t0, css, dur = .15) => { const k = clamp((p - t0) / dur); return k <= 0 ? '' : abs(`left:0;right:0;text-align:center;${css};opacity:1;transform:scale(${1 + (1 - k) * .8})`, txt); };
const stroke = 'text-shadow:0 6px 0 #000;font-family:Anton';

CENAS.r_crise = (p, d) => {
  const sh = planos(p, [[1.3, 1.35, 0, 81], [Infinity, 1.0, 0, 0]]), s1 = sqz(p, .25) + sqz(p, 1.5, .1);
  const bal = [['IA pra tudo', 10, 250, '#7C3AED', 1.5], ['Todo mundo usa', 350, 320, '#2563EB', 1.9], ['e eu?', 10, 390, '#DC2626', 2.4]].map(([t, x, y, c, t0]) => chip(t, x, y + Math.sin(p * 3 + x) * 5, 180, p, t0, c)).join('');
  return camR(barbeariaReal(p) + cadeiraReal(40, 575) + figR(leo({ mood: 'surpreso', bob: Math.sin(p * 5) * 2, pisca: piscar(p), olhar: Math.sin(p * 2) * 4, e: [30 + Math.sin(p * 6) * 6, -60], d: [-30 - Math.sin(p * 6) * 6, -60] }), 170, 340, 200, sqS(s1)) + (p > .25 ? suor(p, 300, 360) : ''), sh) + vinheta + bal +
    (p > 1.5 ? abs(`left:380px;top:560px;font:400 120px/1 Anton;color:#FDE68A;transform:rotate(${Math.sin(p * 2) * 8}deg)`, '?') : '') +
    slamT('NEM SABIA POR<br>ONDE COMEÇAR', p, 2.2, `top:100px;font-size:52px;line-height:1;color:#fff;${stroke}`);
};
META.r_crise = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_conta = (p, d) => {
  const ab = 4 + 18 * Math.abs(Math.sin(p * 15)), sh = planos(p, [[1.5, 1.45, 188, -14], [Infinity, 1.0, 0, 0]]);
  const itens = [['POSTS ✓', 20, 260, 2.0], ['IMAGENS ✓', 290, 330, 2.6], ['VÍDEOS ✓', 20, 400, 3.2]].map(([t, x, y, t0]) => chip(t, x, y, 200, p, t0, '#10B981')).join('');
  const antes = p > 4.2 ? abs(`left:140px;top:700px;${pop(p, 4.2)}`, `<div style="background:#EFEBE0;border-radius:14px;padding:10px 14px;box-shadow:0 10px 24px #0008;font:900 14px Archivo;color:#141414">ANTES 83 → DEPOIS 1.800<div style="height:6px;border-radius:3px;background:#14141422;margin-top:6px"><div style="width:${ease((p - 4.4) / 1.2) * 100}%;height:100%;border-radius:3px;background:#264466"></div></div></div>`) : '';
  return camR(barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: .4, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 9) * 4, oculos: true, cor: '#64748B', pele: '#B77A53', mood: 'feliz' }), 55, 430, 170) +
    figR(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, olhar: -3, pisca: piscar(p), e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6, 4] }), 250, 340, 200), sh) + vinheta + itens + antes +
    slamT('O LÉO ESTAVA CORTANDO<br>O CABELO DA SOLUÇÃO', p, 1.7, `top:96px;font-size:46px;line-height:1.02;color:#FDE047;${stroke}`);
};
META.r_conta = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_contrata = (p, d) => {
  const sh = planos(p, [[1.1, 1.4, 154, 84], [Infinity, 1.0, 0, 0]]), hit = 1.95, m = Math.min(1, Math.max(0, (p - 1.6) / .4)), sq = sqz(p, hit);
  const lista = ['conversa direta', 'estilo da barbearia', 'plano sob medida'].map((t, i) => chip('✓ ' + t, 130, 140 + i * 62, 280, p, 2.4 + i * .5, '#10B981')).join('');
  return camR(barbeariaReal(p) + (p < 1.1 ? abs(`left:60px;top:500px;${pop(p, .1)}`, celular(0, 0, 90, perfilInsta('@barbearia_leo', 3, 83, 80), -6).replace('position:absolute;left:0px;top:0px', 'position:absolute')) : '') +
    figR(leo({ mood: p < 1.1 ? 'triste' : 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), d: [-8 - 77 * m, -10 * m] }), 60, 340, 200, sqS(sq)) +
    figR(dono({ mood: 'feliz', bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), e: [6 + 79 * m, 10 * m], perna: p < 1.6 && p > .4 ? Math.sin(p * 11) * 22 : 0 }), Math.max(300, 600 - Math.max(0, p - .4) * 280), 340, 200, sqS(sq)), sh) + vinheta + lista +
    (p > 3.5 ? abs(`left:90px;right:90px;top:640px;${pop(p, 3.5, .3)}`, `<div style="background:#EFEBE0;border-radius:16px;padding:12px;text-align:center;box-shadow:0 12px 30px #000a"><div style="font:500 12px GeistMono;color:#264466;letter-spacing:.08em">[ SEG ] ✓</div><div style="font:900 22px Archivo;font-stretch:115%;color:#141414">COMEÇA ESSA SEMANA</div></div>`) : '');
};
META.r_contrata = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_diario = (p, d) => {
  const ab = 4 + 18 * Math.abs(Math.sin(p * 15)), sh = planos(p, [[2.2, 1.0, 0, 0], [Infinity, 1.5, -262, -135]]), vib = (p % 1) < .25 ? Math.sin(p * 120) * 3 : 0, dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
  const tiles = dias.map((t, i) => { const on = p > .5 + i * .6; return abs(`left:${22 + i * 100}px;top:110px;width:92px;opacity:${on ? 1 : .35}`, `<div style="background:${on ? '#EFEBE0' : '#ffffff22'};border-radius:12px;padding:6px;text-align:center;color:#141414;font:500 11px GeistMono">${t}<div style="height:62px;border-radius:8px;margin-top:4px;background:${on ? ['#60A5FA', '#F472B6', '#FBBF24', '#34D399', '#A78BFA'][i] : '#0003'};font-size:28px;line-height:62px;color:#fff">${on ? '✂' : ''}</div></div>`); }).join('');
  return camR(barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: clamp(p / d), bob: Math.sin(p * 2) * 1.5, mood: 'feliz' }), 55, 430, 170) +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: -3, e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6, 4] }), 250, 340, 200) +
    abs(`left:${420 + vib}px;top:560px`, celular(0, 0, 90, `<div style="padding:6px;font:800 10px/1.2 Montserrat;color:#fff"><div style="background:#10B981;border-radius:6px;padding:5px">Post publicado ✓</div></div>`, 4).replace('position:absolute;left:0px;top:0px', 'position:absolute')), sh) + vinheta + tiles;
};
META.r_diario = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_clientepost = (p, d) => {
  const ab = 4 + 18 * Math.abs(Math.sin(p * 15)), x = Math.max(300, 520 - p * 110), anda = x > 300, parou = p > 2.0;
  return camR(barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: .3, bob: Math.sin(p * 2) * 1.5, mood: 'normal' }), 55, 430, 170) +
    figR(leo({ mood: parou ? 'feliz' : 'normal', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: parou ? 4 : -3, e: [96 + 7 * Math.sin(p * 5) * (parou ? 0 : 1), 8 * Math.sin(p * 9) * (parou ? 0 : 1)], extE: tesouraSvg(parou ? 3 : ab), d: [-6, 4] }), 170, 340, 200, sqS(sqz(p, 2.0))) +
    figR(clienteAndando({ cor: '#0EA5A4', perna: anda ? Math.sin(p * 11) * 24 : 0, bob: anda ? Math.abs(Math.sin(p * 11)) * -4 : 0, mood: 'feliz' }), x, 520, 110) +
    (!anda ? abs(`left:${x + 60}px;top:590px`, celular(0, 0, 100, `<div style="transform:scale(.33);transform-origin:0 0;width:300px">${posterBase({ frame: 1, logo: 1, head: 1, preco: 1, btn: 1 })}</div>`, -8).replace('position:absolute;left:0px;top:0px', 'position:absolute')) : ''), planos(p, [[2.0, 1.0, 0, 0], [Infinity, 1.3, -39, 0]])) + vinheta +
    (p > 2.2 ? chip('+1 CLIENTE', 300, 170, 200, p, 2.2, '#10B981') : '') +
    (p > 2.0 ? abs(`left:0;right:0;top:104px;text-align:center;font:400 52px Anton;color:#FDE047;text-shadow:0 6px 0 #000;${pop(p, 2.0, .2)}`, 'VEIO POR UM POST') : '');
};
META.r_clientepost = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_mais = (p, d) => {
  const reels = [0, 1, 2].map(i => abs(`left:${130 + i * 100 - ((p * 30) % 100)}px;top:150px;width:92px;opacity:${i === 0 ? clamp(1 - ((p * 30) % 100) / 100) : 1}`, `<div style="height:164px;border-radius:12px;background:linear-gradient(160deg,${['#6366F1', '#EC4899', '#F59E0B'][i]},#141414);position:relative;box-shadow:0 8px 18px #0008"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:34px;color:#fff">▶</div><div style="position:absolute;left:6px;right:6px;bottom:8px;height:6px;border-radius:3px;background:#fff6"></div></div>`)).join('');
  return camR(barbeariaReal(p) + figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 4 }), 60, 340, 200, sqS(sqz(p, .4, .1))) +
    figR(dono({ mood: 'falando', t: p, bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), e: [60, -70] }), 300, 340, 200) +
    abs('left:30px;top:100px', celular(0, 0, 120, `<div style="margin:6px;height:158px;border-radius:10px;background:linear-gradient(160deg,#6366F1,#EC4899);display:flex;align-items:center;justify-content:center;font-size:36px;color:#fff;transform:scale(${1 + .04 * Math.sin(p * 5)})">▶</div><div style="margin:0 8px;height:6px;border-radius:3px;background:#fff4"><div style="width:${(p * 25) % 100}%;height:100%;border-radius:3px;background:#fff"></div></div>`, -3).replace('position:absolute;left:0px;top:0px', 'position:absolute')), planos(p, [[2.3, 1.0, 0, 0], [Infinity, 1.12, 0, 20]])) + vinheta +
    bolha('Dá pra fazer vídeo também?', 30, 560, 220, p, .3) + bolha('Dá. E dá pra ir bem mais longe.', 280, 520, 240, p, 1.8, '#EFEBE0', '#141414') +
    slamT('E TEM MAIS', p, 3.0, `top:100px;font-size:76px;line-height:1;color:#FDE047;${stroke}`);
};
META.r_mais = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_cta = (p, d) => { const ab = 4 + 18 * Math.abs(Math.sin(p * 15));
  return barbeariaReal(p) + cadeiraReal(40, 445, 1.2) + figR(clienteCapa({ corte: .8, mood: 'feliz', bob: Math.sin(p * 2) * 1.5 }), 55, 330, 140) +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6, 4] }), 240, 250, 170, sqS(sqz(p, .5, .1))) + vinheta +
    bolha('E eu nem precisei virar designer!', 250, 140, 250, p, .3) +
    abs(`left:30px;right:30px;top:620px;${pop(p, 2.2, .4)}`, `<div style="background:#141414;border-radius:24px;padding:22px 18px;text-align:center;box-shadow:0 20px 50px #000a"><div style="font:900 78px/1 Archivo;font-stretch:125%;color:#EFEBE0;letter-spacing:-.03em">KOSTA</div><div style="font:italic 400 28px InstrumentSerif;color:#9DB8DB;margin:6px 0 14px">conteúdo assim, e muito mais.</div><div style="background:#EFEBE0;color:#141414;border-radius:999px;padding:14px;font:900 24px Archivo;font-stretch:118%;transform:scale(${1 + .03 * Math.sin(p * 6)})">COMENTA “KOSTA”</div></div>`);
};
META.r_cta = { semLeg: true, cam: [1, 1.05, 0, 0, 0, 0] };
