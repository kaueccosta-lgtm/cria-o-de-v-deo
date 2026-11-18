// v7: correções do mapa de erros. Mesmo cenário em todos os takes, tesoura no cabelo, sem sobreposição, quem fala mexe a boca.
const cortaPose = (p, ativo = true) => ({ e: ativo ? [106 + 5 * Math.sin(p * 5), 3 * Math.sin(p * 9)] : [8, 0], extE: tesouraSvg(ativo ? 4 + 18 * Math.abs(Math.sin(p * 15)) : 3) });
const SET = p => barbeariaReal(p) + cadeiraReal(40, 575);
const cliSent = (p, o = {}) => figR(clienteCapa({ corte: .25, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 2.2) * 3, ...o }), 55, 430, 170);
const leoCorta = (p, o = {}, x = 250, w = 200, ativo = true, ex = '') => figR(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, olhar: -3, pisca: piscar(p), ...cortaPose(p, ativo), d: [-6 + 3 * Math.sin(p * 2), 4], ...o }), x, 340, w, ex);
const celBig = (x, y, w, inner, rot = 0) => celular(x, y, w, inner, rot);
const cardRes = ([n, a, b], i, p, t0 = .4, gap = .6) => { const k = ease((p - t0 - .2 - i * gap) / .9), v = Math.round(a + (b - a) * k);
  return `<div style="background:#fff;border-radius:12px;padding:8px 10px;margin-bottom:8px;opacity:${clamp((p - t0 - i * gap) / .3)}"><div style="font:500 9px GeistMono;color:#264466;letter-spacing:.08em">${n} · ANTES → DEPOIS</div>
  <div style="display:flex;align-items:baseline;gap:6px"><span style="font:900 28px Archivo;font-stretch:120%;color:#141414">${v.toLocaleString('pt-BR')}</span><span style="font:italic 400 16px InstrumentSerif;color:#264466">seguidores</span></div>
  <div style="height:5px;border-radius:3px;background:#14141414;margin-top:5px"><div style="width:${k * 100}%;height:100%;border-radius:3px;background:#264466"></div></div></div>`; };

CENAS.r_crise = (p, d) => {
  const sh = planos(p, [[1.3, 1.35, -108, 81], [Infinity, 1.0, 0, 0]]), s1 = sqz(p, .25) + sqz(p, 1.5, .1);
  const bal = [['IA pra tudo', 10, 250, '#7C3AED', 1.5], ['Todo mundo usa', 330, 300, '#2563EB', 1.9], ['e eu?', 10, 390, '#DC2626', 2.4]].map(([t, x, y, c, t0]) => chip(t, x, y + Math.sin(p * 3 + x) * 5, 180, p, t0, c)).join('');
  return camR(SET(p) + cliSent(p, { giro: 0, oculos: true, pele: '#B77A53' }) +
    figR(leo({ mood: 'surpreso', bob: Math.sin(p * 5) * 2, pisca: piscar(p), olhar: Math.sin(p * 2) * 4, e: [30 + Math.sin(p * 6) * 6, -60], d: [-30 - Math.sin(p * 6) * 6, -60] }), 250, 340, 200, sqS(s1)) + (p > .25 ? suor(p, 396, 360) : ''), sh) + vinheta + bal +
    slamT('NEM SABIA POR<br>ONDE COMEÇAR', p, 2.2, `top:100px;font-size:52px;line-height:1;color:#fff;${stroke}`);
};
META.r_crise = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_conta = (p, d) => {
  const sh = planos(p, [[1.5, 1.45, 188, -14], [Infinity, 1.0, 0, 0]]);
  const itens = [['POSTS ✓', 20, 250, 2.0], ['IMAGENS ✓', 300, 250, 2.6], ['VÍDEOS ✓', 20, 330, 3.2]].map(([t, x, y, t0]) => chip(t, x, y, 200, p, t0, '#10B981')).join('');
  const antes = p > 4.2 ? abs(`left:130px;top:700px;${pop(p, 4.2)}`, `<div style="background:#EFEBE0;border-radius:14px;padding:10px 14px;box-shadow:0 10px 24px #0008;font:900 14px Archivo;color:#141414">ANTES 83 → DEPOIS 1.800<div style="height:6px;border-radius:3px;background:#14141422;margin-top:6px"><div style="width:${ease((p - 4.4) / 1.2) * 100}%;height:100%;border-radius:3px;background:#264466"></div></div></div>`) : '';
  return camR(SET(p) + cliSent(p, { oculos: true, pele: '#B77A53', mood: 'feliz', fala: p < 6.4 }) + leoCorta(p, { mood: 'feliz' }), sh) + vinheta + itens + antes +
    slamT('O LÉO ESTAVA CORTANDO<br>O CABELO DA SOLUÇÃO', p, 1.7, `top:96px;font-size:46px;line-height:1.02;color:#FDE047;${stroke}`);
};
META.r_conta = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_site = (p, d) => {
  const R = [['BARBEARIA', 83, 1800], ['RESTAURANTE', 120, 2400], ['PET SHOP', 60, 1500]];
  return camR(SET(p) + abs('left:-500px;right:-500px;top:-500px;bottom:-500px;background:#000;opacity:.4', '') +
    celBig(150, 105, 240, `<div style="padding:12px;background:#EFEBE0;height:100%"><div style="font:900 26px/1 Archivo;font-stretch:125%;color:#141414;letter-spacing:-.03em">KOSTA</div><div style="font:500 9px GeistMono;color:#264466;letter-spacing:.08em;margin:4px 0 8px">[ RESULTADOS DE CLIENTES ]</div>${R.map((r, i) => cardRes(r, i, p)).join('')}</div>`, -2 + Math.sin(p * 1.5)) +
    figR(leo({ mood: 'surpreso', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 4 }), 215, 590, 150) + figR(dono({ mood: 'falando', t: p, bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), e: [140, -20] }), 370, 590, 150), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta;
};
META.r_site = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_contrata = (p, d) => {
  const hit = 1.9, m = Math.min(1, Math.max(0, (p - 1.5) / .4)), sq = sqz(p, hit), dx = Math.max(370, 640 - Math.max(0, p - .3) * 300), anda = p > .3 && dx > 370;
  const lista = ['conversa direta', 'estilo da barbearia', 'plano sob medida'].map((t, i) => chip('✓ ' + t, 130, 140 + i * 62, 280, p, 2.0 + i * .4, '#10B981')).join('');
  return camR(SET(p) + (p < 1.3 ? celular(30, 440, 90, perfilInsta('@barbearia_leo', 3, 83, 80), -6) : '') +
    figR(leo({ mood: p < 1.5 ? 'triste' : 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), d: [-8 - 77 * m, -10 * m] }), 140, 340, 170, sqS(sq)) +
    figR(dono({ mood: 'feliz', bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), e: [6 + 79 * m, 10 * m], perna: anda ? Math.sin(p * 11) * 22 : 0 }), dx, 340, 170, sqS(sq)) +
    (m > .8 ? abs(`left:${325 + Math.sin(p * 30) * 2}px;top:462px;width:30px;height:30px;border-radius:50%;background:#D9A06F;box-shadow:inset -4px -4px 8px #0004`, '') : ''), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta + lista +
    (p > 3.1 ? abs(`left:90px;right:90px;top:660px;${pop(p, 3.1, .3)}`, `<div style="background:#EFEBE0;border-radius:16px;padding:12px;text-align:center;box-shadow:0 12px 30px #000a"><div style="font:500 12px GeistMono;color:#264466;letter-spacing:.08em">[ SEG ] ✓</div><div style="font:900 22px Archivo;font-stretch:115%;color:#141414">COMEÇA ESSA SEMANA</div></div>`) : '');
};
META.r_contrata = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_diario = (p, d) => {
  const vib = (p % .6) < .2 ? Math.sin(p * 120) * 3 : 0, dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'], n = Math.min(5, Math.floor((p - .4) / .6) + 1);
  const tiles = dias.map((t, i) => { const on = i < n; return abs(`left:${22 + i * 100}px;top:110px;width:92px;opacity:${on ? 1 : .35}`, `<div style="background:${on ? '#EFEBE0' : '#ffffff22'};border-radius:12px;padding:6px;text-align:center;color:#141414;font:500 11px GeistMono">${t}<div style="height:62px;border-radius:8px;margin-top:4px;background:${on ? ['#60A5FA', '#F472B6', '#FBBF24', '#34D399', '#A78BFA'][i] : '#0003'};font-size:28px;line-height:62px;color:#fff">${on ? '✂' : ''}</div></div>`); }).join('');
  return camR(SET(p) + cliSent(p, { corte: clamp(p / d) * .4, mood: 'feliz' }) + leoCorta(p, { mood: 'feliz' }, 215, 190) +
    abs('left:380px;top:690px;width:160px;height:14px;border-radius:4px;background:linear-gradient(#8A6040,#5E3F27);box-shadow:0 10px 16px #0007', '') + abs('left:392px;top:704px;width:136px;height:60px;background:linear-gradient(#5E3F27,#3B2616)', '') +
    celular(408 + vib, 515, 90, `<div style="padding:6px;font:800 10px/1.2 Montserrat;color:#fff"><div style="background:#10B981;border-radius:6px;padding:5px;transform:scale(${1 + .1 * Math.max(0, Math.sin(p * 10))})">Post publicado ✓<br>${dias[Math.max(0, n - 1)]}</div></div>`, 3), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta + tiles;
};
META.r_diario = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_foto = (p, d) => {
  const s = ease((p - .5) / (d * .7)) * 100, crua = `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#6B6B6B,#3A3A3A);overflow:hidden"><svg style="position:absolute;left:70px;top:150px;transform:rotate(8deg)" width="160" height="190" viewBox="0 0 120 130"><rect x="20" y="0" width="80" height="60" rx="20" fill="#7A2A22"/><rect x="8" y="52" width="104" height="34" rx="14" fill="#7A2A22"/><rect x="54" y="86" width="12" height="30" fill="#999"/><ellipse cx="60" cy="122" rx="36" ry="8" fill="#777"/></svg><div style="position:absolute;left:12px;bottom:12px;background:#000a;color:#fff;border-radius:999px;padding:5px 10px;font:500 11px GeistMono">FOTO BASE</div></div>`;
  return camR(SET(p) + abs('left:-500px;right:-500px;top:-500px;bottom:-500px;background:#000;opacity:.4', '') +
    abs('left:110px;top:110px;width:300px;height:375px;transform:scale(1.12);transform-origin:50% 0;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px #000b', `<div style="position:absolute;inset:0">${crua}</div><div style="position:absolute;inset:0;clip-path:inset(0 ${100 - s}% 0 0)">${posterBase({ frame: 1, logo: 1, head: 1, preco: 1, btn: 1 })}</div><div style="position:absolute;left:${s}%;top:0;bottom:0;width:3px;background:#fff;opacity:${s > 98 ? 0 : 1}"></div>`) +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 3, d: [-60, -75], extD: celularMao }), 215, 590, 150) + figR(dono({ mood: 'feliz', bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), e: [120, -20] }), 370, 590, 150), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta;
};
META.r_foto = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_perfil = (p, d) => {
  const steps = [[0, 83, 'SEMANA 1', ''], [1.2, 93, 'SEMANA 2', '+10'], [2.4, 123, 'SEMANA 3', '+30']], cur = steps.filter(s => p >= s[0]).pop();
  return SET(p) + abs('left:-500px;right:-500px;top:-500px;bottom:-500px;background:#000;opacity:.3', '') +
    celular(200, 110, 240, perfilInsta('@barbearia_leo', Math.min(9, 3 + Math.floor(p * 1.5)), cur[1], 170), Math.sin(p * 1.5)) +
    steps.map(([t0, , lab, plus], i) => abs(`left:14px;top:${130 + i * 86}px;${pop(p, t0, .3)}`, `<div style="background:#EFEBE0;color:#141414;border-radius:12px;padding:8px 12px;font:500 12px GeistMono;letter-spacing:.06em">${lab}<div style="font:900 24px Archivo;font-stretch:120%;color:#264466">${plus || '83'}</div></div>`)).join('') +
    [...Array(8)].map((_, i) => { const ph = (p * 90 + i * 60) % 400; return abs(`left:${210 + (i * 47) % 200}px;top:${700 - ph}px;font-size:${20 + i % 3 * 7}px;color:#F43F5E;opacity:${clamp(1 - ph / 400)}`, '♥'); }).join('') +
    nota('que corte!', 408, 330, 120, p, 1.6) + nota('onde fica?', 14, 392, 125, p, 2.6) +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: -3 }), 330, 560, 190) + cliSent(p, { mood: 'feliz' }) + vinheta;
};
META.r_perfil = { cam: [1, 1.04, 0, 0, 0, 0] };

CENAS.r_clientepost = (p, d) => {
  const x = Math.max(372, 560 - p * 110), anda = x > 372, parou = p > 1.9;
  return camR(SET(p) + cliSent(p, { mood: 'normal' }) + leoCorta(p, { mood: parou ? 'feliz' : 'normal', olhar: parou ? 4 : -3 }, 215, 190, !parou, sqS(sqz(p, 1.9))) +
    figR(clienteAndando({ cor: '#0EA5A4', perna: anda ? Math.sin(p * 11) * 24 : 0, bob: anda ? Math.abs(Math.sin(p * 11)) * -4 : Math.sin(p * 2) * 1.5, mood: 'feliz' }), x, 540, 100) +
    (!anda ? celular(396, 598, 64, `<div style="transform:scale(.21);transform-origin:0 0;width:300px">${posterBase({ frame: 1, logo: 1, head: 1, preco: 1, btn: 1 })}</div>`, -8) : ''), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    (p > 2.0 ? chip('+1 CLIENTE', 300, 180, 200, p, 2.0, '#10B981') : '') + (p > 1.9 ? abs(`left:0;right:0;top:104px;text-align:center;font:400 52px Anton;color:#FDE047;text-shadow:0 6px 0 #000;${pop(p, 1.9, .2)}`, 'VEIO POR UM POST') : '');
};
META.r_clientepost = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_dono = (p, d) => {
  const sofa = abs('left:335px;top:705px;width:195px;height:62px;border-radius:14px 14px 6px 6px;background:linear-gradient(#9A3B22,#5A1F10);box-shadow:0 10px 16px #0007', '');
  return camR(SET(p) + cliSent(p, { oculos: true, pele: '#B77A53', mood: 'feliz', giro: Math.sin(p * 1.5) * 5 }) +
    [0, 1, 2].map(i => figR(clienteAndando({ cor: ['#2563EB', '#F59E0B', '#EC4899'][i], mood: 'feliz', bob: Math.sin(p * 2 + i) * 1.5 }), 348 + i * 52, 600, 66)).join('') + sofa +
    figR(leo({ mood: 'falando', t: p, bob: Math.sin(p * 4) * 2, pisca: piscar(p), olhar: -3, e: [40 + 25 * Math.sin(p * 4), -50], d: [-30 - 20 * Math.sin(p * 4 + 1), -50] }), 215, 360, 180), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    [['+1.000 seguidores', 30, 230, .5], ['agenda cheia', 300, 200, 1.4], ['+ clientes', 310, 280, 2.3]].map(([t, x, y, t0]) => chip(t, x, y, 210, p, t0, '#10B981')).join('') +
    abs('left:0;right:0;top:104px;text-align:center;font:400 46px Anton;color:#fff;text-shadow:0 5px 0 #000', '1 MÊS DEPOIS');
};
META.r_dono = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_mais = (p, d) => {
  const fl = p < 1.6 ? 'falando' : 'feliz', fd = p > 1.8 ? 'falando' : 'feliz';
  return camR(SET(p) + figR(leo({ mood: fl, t: p, bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 4, e: [8 + 25 * (p < 1.6 ? Math.sin(p * 5) : 0), 0] }), 60, 340, 200, sqS(sqz(p, .4, .1))) +
    figR(dono({ mood: fd, t: p, bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), e: [150, -10] }), 300, 340, 200) +
    celular(266, 292, 90, `<div style="margin:5px;height:128px;border-radius:8px;background:linear-gradient(160deg,#6366F1,#EC4899);display:flex;align-items:center;justify-content:center;font-size:30px;color:#fff;transform:scale(${1 + .04 * Math.sin(p * 5)})">▶</div><div style="margin:0 6px;height:5px;border-radius:3px;background:#fff4"><div style="width:${(p * 25) % 100}%;height:100%;background:#fff;border-radius:3px"></div></div>`, -6), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    bolha('Dá pra fazer vídeo também?', 20, 235, 215, p, .3) + bolha('Dá. E dá pra ir bem mais longe.', 280, 200, 240, p, 1.8, '#EFEBE0', '#141414') +
    slamT('E TEM MAIS', p, 3.0, `top:96px;font-size:62px;line-height:1;color:#FDE047;${stroke}`);
};
META.r_mais = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.r_cta = (p, d) => barbeariaReal(p) + cadeiraReal(40, 400, 1.2) + figR(clienteCapa({ corte: .5, mood: 'feliz', bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 3) * 3 }), 55, 285, 140) +
  figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: -3, ...cortaPose(p), d: [-6, 4] }), 205, 215, 170, sqS(sqz(p, .5, .1))) + vinheta +
  bolha('E eu nem precisei virar designer!', 240, 120, 250, p, .3) +
  abs(`left:30px;right:30px;top:580px;${pop(p, 2.2, .4)}`, `<div style="background:#141414;border-radius:24px;padding:20px 18px;text-align:center;box-shadow:0 20px 50px #000a"><div style="font:900 74px/1 Archivo;font-stretch:125%;color:#EFEBE0;letter-spacing:-.03em">KOSTA</div><div style="font:italic 400 26px InstrumentSerif;color:#9DB8DB;margin:6px 0 12px">conteúdo assim, e muito mais.</div><div style="background:#EFEBE0;color:#141414;border-radius:999px;padding:13px;font:900 22px Archivo;font-stretch:118%;transform:scale(${1 + .03 * Math.sin(p * 6)})">COMENTA “KOSTA”</div></div>`);
META.r_cta = { cam: [1, 1.04, 0, 0, 0, 0] };
