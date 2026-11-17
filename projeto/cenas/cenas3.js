// Versão 2 da história: cartoon em movimento (mundo do Léo) + linguagem editorial de luxo (marca Kosta).
const CREME = '#EFEBE0', INK = '#141414', AZUL = '#264466', AZUL2 = '#7a9bc3';
const IMGS = ['barbearia-promo', 'pet-shop', 'restaurante-delivery', 'salao-shine-textura', 'estetica-clinica', 'academia-personal', 'loja-roupas', 'design-ia', 'ebook-vender'].map(n => `imagens/${n}.webp`);
const META = {};
const mono = (t, x, y, cor = INK, size = 13, extra = '') => abs(`left:${x}px;top:${y}px;font:500 ${size}px GeistMono;letter-spacing:.08em;color:${cor};text-transform:uppercase;${extra}`, t);
const wm = (size, cor = INK) => `<span style="font:900 ${size}px/1 Archivo;font-stretch:125%;letter-spacing:-.03em;color:${cor}">KOSTA</span>`;
const serif = (t, size, cor) => `<span style="font:italic 400 ${size}px/1 InstrumentSerif;color:${cor}">${t}</span>`;
const foto = (n, x, y, w, h, o = {}) => abs(`left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${o.rot || 0}deg) scale(${o.s ?? 1});opacity:${o.op ?? 1};border-radius:${o.r ?? 14}px;overflow:hidden;box-shadow:0 14px 34px #0006`,
  `<img src="imagens/${n}.webp" style="width:100%;height:100%;object-fit:cover;display:block">`);
const luxClaro = p => { let l = ''; for (let i = 0; i < 8; i++) l += `<div style="position:absolute;top:0;bottom:0;left:${i * 90 + ((p * 8) % 90) - 90}px;width:1px;background:#14141415"></div>`; return `<div style="position:absolute;inset:0;background:${CREME}"></div>${l}`; };
const luxEscuro = p => `<div style="position:absolute;inset:0;background:${INK}"></div><div style="position:absolute;left:${-120 + Math.sin(p * .8) * 60}px;top:${200 + Math.cos(p * .6) * 60}px;width:780px;height:780px;border-radius:50%;background:radial-gradient(circle,#26446655,#26446600 65%)"></div>`;
const ranhura = (i, n, p) => `${(i / n) * 100}`;

// ====== MUNDO DO LÉO (cartoon em movimento) ======
CENAS.cortando = (p, d) => {
  const ab = 4 + 18 * Math.abs(Math.sin(p * 15)), a1 = 96 + 7 * Math.sin(p * 5), a2 = 8 * Math.sin(p * 9 + 1);
  const cabelo = [...Array(18)].map((_, i) => { const ph = (p * 75 + i * 41) % 230, x = 176 + 40 * Math.sin(i * 2.3) + 9 * Math.sin(p * 3 + i);
    return `<div style="position:absolute;left:${x}px;top:${470 + ph}px;width:8px;height:4px;border-radius:2px;background:#3B2A22;opacity:${clamp(1 - ph / 230)};transform:rotate(${ph * 4 + i * 30}deg)"></div>`; }).join('');
  return fundoBarbearia() + cadeira(40, 575, 1.55) + fig(clienteCapa({ corte: clamp(p / d * 1.1), bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 3) * 3, mood: 'feliz' }), 55, 430, 170) +
    fig(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, olhar: -3, pisca: piscar(p), e: [a1, a2], extE: tesouraSvg(ab), d: [-6 + 3 * Math.sin(p * 2), 4] }), 250, 340, 200) + cabelo;
};
META.cortando = { cam: [1, 1.18, 0, 45, 0, -40] };

CENAS.tempo_editando = (p, d) => {
  const k = ease(p / (d * .9)), min = Math.round(k * 118), clips = [['#F472B6', 4, 50], ['#60A5FA', 56, 70], ['#FBBF24', 128, 40], ['#34D399', 170, 60]];
  const trilha = [0, 1].map(r => clips.map(([c, x, w]) => `<div style="position:absolute;left:${x + r * 14}px;top:${r * 22}px;width:${w}px;height:18px;border-radius:4px;background:${c};opacity:.9"></div>`).join('')).join('');
  const play = 6 + (p * 70) % 215;
  return fundoEscuro() +
    celular(40, 150, 240, `<div style="padding:10px"><div style="height:230px;border-radius:10px;background:linear-gradient(135deg,#6366F1,#EC4899);display:flex;align-items:center;justify-content:center;font-size:80px;color:#fff;transform:scale(${1 + .02 * Math.sin(p * 6)})">✂</div>
      <div style="position:relative;height:60px;margin-top:14px;background:#111827;border-radius:8px;overflow:hidden">${trilha}<div style="position:absolute;left:${play}px;top:0;bottom:0;width:3px;background:#FCD34D"></div></div>
      <div style="margin-top:10px;display:flex;gap:6px">${['Aa', '♪', '✂', '⌛'].map(x => `<div style="flex:1;height:32px;border-radius:8px;background:#1F2937;color:#9CA3AF;display:flex;align-items:center;justify-content:center;font:800 14px Montserrat">${x}</div>`).join('')}</div></div>`, -2) +
    abs(`left:318px;top:150px`, relogio(p / d * 3, 170)) + abs(`left:300px;top:340px;width:220px;text-align:center;font:400 78px/1 Anton;color:#FCA5A5`, `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}h`) +
    abs(`left:300px;top:420px;width:220px;text-align:center;font:800 17px Montserrat;color:#E5E7EB`, 'pra 1 único post') +
    fig(leo({ mood: 'triste', bob: Math.sin(p * 4) * 2, pisca: piscar(p), d: [-62 + 8 * Math.sin(p * 9), -24 + 6 * Math.sin(p * 11)], e: [6, 0] }), 330, 480, 170) +
    abs('left:20px;top:690px;width:90px', clienteAndando({ mood: 'triste', bob: Math.sin(p * 2) * 2, perna: 0 })) + bolha('Tô esperando…', 8, 640, 140, p, 1.2);
};
META.tempo_editando = { cam: [1, 1.07, 0, 0, 0, 0] };

CENAS.cliente_indo = (p, d) => {
  const dias = Math.round(ease(p / (d * .75)) * 21);
  const andando = [['#2563EB', 0], ['#F59E0B', 1], ['#10B981', 2]].map(([c, i]) => { const x = 300 + i * 120 - p * 95 - 40; const perna = Math.sin(p * 9 + i) * 24;
    return abs(`left:${x}px;top:610px;width:84px;opacity:${clamp((x + 100) / 100)}`, clienteAndando({ cor: c, perna, bob: Math.abs(Math.sin(p * 9 + i)) * -4, mood: 'triste' })); }).join('');
  return fundoBarbearia(.15) + fig(leo({ mood: 'triste', bob: Math.sin(p * 2) * 2, pisca: piscar(p), olhar: -3 }), 150, 320, 200) + andando +
    abs(`left:0;right:0;top:112px;text-align:center;font:400 130px/1 Anton;color:#FCA5A5;transform:scale(${1 + .02 * Math.sin(p * 5)})`, dias) +
    abs('left:0;right:0;top:250px;text-align:center;font:400 38px Anton;color:#fff;letter-spacing:1px', 'DIAS SEM POSTAR');
};
META.cliente_indo = { cam: [1, 1.06, 0, 0, 0, 0] };

CENAS.espera_celular = (p, d) => {
  const rows = [...Array(14)].map((_, r) => `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:4px;height:80px">${[0, 1, 2].map(c => `<div style="background:${['#60A5FA', '#F472B6', '#FBBF24', '#34D399', '#A78BFA', '#FB7185'][(r * 3 + c) % 6]};border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:32px">✂</div>`).join('')}</div>`).join('');
  const cora = [...Array(7)].map((_, i) => { const ph = (p * 60 + i * 90) % 400; return abs(`left:${300 + (i * 53) % 150}px;top:${700 - ph}px;font-size:${24 + (i % 3) * 8}px;color:#F43F5E;opacity:${clamp(1 - ph / 400)}`, '♥'); }).join('');
  return fundoNoite() +
    celular(250, 130, 250, `<div style="padding:8px;color:#fff;font:800 14px Montserrat">@barbearia_rival · 2.340</div><div style="overflow:hidden;height:420px;padding:0 8px"><div style="transform:translateY(${-(p * 70) % 336}px)">${rows}</div></div>`, 2) + cora +
    fig(leo({ mood: p > 1.4 ? 'surpreso' : 'normal', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 4, d: [-40, -80], extD: celularMao }), 10, 400, 230) +
    abs(`left:20px;top:112px;font:400 44px/1 Anton;color:#FDE68A`, 'O CONCORRENTE');
};
META.espera_celular = { cam: [1, 1.08, 0, 0, 0, 0] };

CENAS.rival_chips = (p, d) => fundoNoite() +
  celular(150, 160, 240, perfilInsta('@barbearia_rival', 9, 2340, 170), Math.sin(p * 2) * 2) +
  [['Viralizou', '48 mil views', '#F97316', 20, 250, .3], ['Trouxe cliente', '12 agendamentos', '#10B981', 330, 400, 1.4], ['Aquece a conta', '+86 seguidores', '#6366F1', 20, 560, 2.5]]
    .map(([a, b, c, x, y, t0]) => abs(`left:${x}px;top:${y + Math.sin(p * 2 + t0) * 5}px;width:190px;${pop(p, t0)}`,
      `<div style="background:${c};color:#fff;border-radius:16px;padding:10px 12px;box-shadow:0 10px 24px #0007"><div style="font:400 28px/1 Anton;text-transform:uppercase">${a}</div><div style="font:800 14px Montserrat;opacity:.9;margin-top:3px">${b}</div></div>`)).join('') +
  fig(leo({ mood: 'surpreso', bob: Math.sin(p * 3) * 2, pisca: piscar(p) }), 340, 620, 150) + abs('left:20px;top:112px;font:400 44px/1 Anton;color:#fff', 'TODO DIA TEM POST');
META.rival_chips = { cam: [1, 1.06, 0, 0, 0, 0] };

CENAS.pergunta_tempo = (p, d) => {
  const orb = [[() => relogio(p * .3, 90), 0], [() => `<div style="width:110px;height:110px;border-radius:18px;background:#fff;color:#111;font:400 24px/1.1 Anton;display:flex;align-items:center;justify-content:center;text-align:center">AGENDA<br>CHEIA</div>`, 2.1], [() => `<div style="width:100px;height:100px;border-radius:50%;background:#DC2626;color:#fff;font:400 52px/100px Anton;text-align:center">?</div>`, 4.2]]
    .map(([fn, a0]) => { const a = p * 1.3 + a0; return abs(`left:${240 + Math.cos(a) * 190 - 55}px;top:${460 + Math.sin(a) * 120 - 55}px`, fn()); }).join('');
  return fundoNoite() + abs(`left:0;right:0;top:110px;text-align:center;font:400 220px/1 Anton;color:#FDE68A;transform:translateY(${Math.sin(p * 3) * 10}px) rotate(${Math.sin(p * 2) * 4}deg)`, '?') +
    fig(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: Math.sin(p * 1.3) * 4, d: [-150, -110] }), 160, 380, 220) + orb;
};
META.pergunta_tempo = { cam: [1, 1.1, 0, 0, 0, 0] };

// ====== MUNDO DA KOSTA (editorial de luxo) ======
CENAS.kosta_logo = (p, d) => {
  const letras = 'KOSTA'.split('').map((l, i) => { const k = ease((p - .25 - i * .1) / .55);
    return `<span style="display:inline-block;transform:translateY(${(1 - k) * 90}px);opacity:${k}">${l}</span>`; }).join('');
  const brilho = clamp((p - 1.2) / 1.4);
  return luxEscuro(p) + mono('[ kosta ]', 30, 112, '#9DB8DB') + mono('[ 2026 ]', 440, 112, '#9DB8DB') +
    abs(`left:0;right:0;top:340px;text-align:center;font:900 98px/1 Archivo;font-stretch:125%;letter-spacing:-.03em;color:#EFEBE0;overflow:hidden`, letras +
      `<div style="position:absolute;top:0;bottom:0;left:${-30 + brilho * 130}%;width:18%;background:linear-gradient(100deg,transparent,#ffffff66,transparent);transform:skewX(-18deg)"></div>`) +
    abs(`left:0;right:0;top:470px;text-align:center;opacity:${ease((p - 1) / .6)};transform:translateY(${(1 - ease((p - 1) / .6)) * 16}px)`, serif('onde prompt vira peça de design', 36, '#EFEBE0')) +
    abs(`left:60px;right:60px;top:560px;height:1px;background:#EFEBE055;transform-origin:left;transform:scaleX(${ease((p - 1.2) / .8)})`, '') +
    mono('Prompt & Design · Consultoria de IA · Criação com IA', 40, 585, '#9DB8DB', 11, `opacity:${ease((p - 1.6) / .5)}`);
};
META.kosta_logo = { tema: 'lux', wipe: CREME, semSelo: false, cam: [1, 1.1, 0, 0, 0, 0] };

CENAS.kosta_servicos = (p, d) => {
  const S = [['01', 'Criação de\nconteúdo', 'design-ia'], ['02', 'Imagens para\nredes sociais', 'barbearia-promo'], ['03', 'Imagens a partir de\nbanco de dados', 'restaurante-delivery'], ['04', 'Criação\nde vídeo', 'academia-personal']];
  const ativo = Math.min(3, Math.floor(p / (d / 4.4)));
  return luxClaro(p) + mono('[ serviços ]', 30, 112) + S.map(([n, t, img], i) => { const k = ease((p - i * (d / 4.4)) / .6); if (p < i * (d / 4.4)) return ''; const on = i === ativo;
    return abs(`left:30px;right:30px;top:${150 + i * 160}px;height:140px;opacity:${on ? 1 : .55}`,
      `<div style="position:absolute;left:0;right:0;top:0;height:2px;background:${INK};transform-origin:left;transform:scaleX(${k})"></div>
       <div style="position:absolute;left:0;top:14px;font:500 14px GeistMono;color:${AZUL}">${n}</div>
       <div style="position:absolute;left:46px;top:14px;width:290px;font:800 25px/1.08 Archivo;font-stretch:110%;color:${INK};letter-spacing:-.02em;transform:translateX(${(1 - k) * 40}px)">${t}</div>
       ${n === '04' ? '' : ''}<div style="position:absolute;right:0;top:12px;width:118px;height:118px;border-radius:14px;overflow:hidden;transform:scale(${on ? 1.04 : 1}) rotate(${(1 - k) * 8}deg);box-shadow:0 8px 20px #0003"><img src="imagens/${img}.webp" style="width:100%;height:100%;object-fit:cover">${n === '04' ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#0004"><div style="width:44px;height:44px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:${INK};font-size:20px;padding-left:4px">▶</div></div>` : ''}</div>`);
  }).join('');
};
META.kosta_servicos = { tema: 'claro', wipe: INK, cam: [1, 1.03, 0, 0, 0, 0] };

CENAS.kosta_portfolio = (p, d) => {
  const col = (names, x, vel, off) => { const h = 260, n = names.length, y = -((p * vel + off) % (h * n));
    return abs(`left:${x}px;top:0;width:164px`, [0, 1].map(r => names.map((nm, i) => `<img src="imagens/${nm}.webp" style="display:block;width:164px;height:${h - 14}px;object-fit:cover;border-radius:12px;margin-bottom:14px;position:absolute;top:${y + (r * n + i) * h + 100}px">`).join('')).join('')); };
  return luxEscuro(p) + col(['barbearia-promo', 'pet-shop', 'loja-roupas'], 14, 40, 0) + col(['restaurante-delivery', 'salao-shine-textura', 'design-ia'], 188, -0 + 62, 140) + col(['estetica-clinica', 'academia-personal', 'ebook-vender'], 362, 34, 60) +
    abs('left:0;right:0;top:0;height:960px;background:linear-gradient(#141414f2,#14141400 20%,#14141400 62%,#141414f2)', '') +
    abs(`left:30px;right:30px;top:316px;${pop(p, .3)};transform-origin:center`, `<div style="background:#141414ee;border:1px solid #EFEBE044;border-radius:22px;padding:26px 24px;backdrop-filter:blur(6px)"><div style="font:500 12px GeistMono;letter-spacing:.08em;color:#9DB8DB">[ PORTFÓLIO ]</div>
      <div style="font:900 40px/1.02 Archivo;font-stretch:112%;color:#EFEBE0;margin-top:10px;letter-spacing:-.02em">Cada projeto nasce do zero.</div><div style="margin-top:8px">${serif('nunca um pacote pronto.', 44, '#9DB8DB')}</div></div>`);
};
META.kosta_portfolio = { tema: 'lux', wipe: CREME, cam: [1, 1.05, 0, 0, 0, 0] };

CENAS.kosta_vs_agencia = (p, d) => {
  const A = ['caro', 'demorado', 'pacote pronto'], K = ['valor que cabe no bolso', 'sob medida pra sua marca', 'você aprende a fazer'];
  const lin = (arr, x, ok) => arr.map((t, i) => { const k = ease((p - .5 - i * .55) / .5); return abs(`left:${x}px;top:${300 + i * 105}px;width:230px;opacity:${k};transform:translateX(${(1 - k) * 24}px)`,
    `<div style="display:flex;gap:10px;align-items:flex-start;font:800 22px/1.1 Archivo;font-stretch:105%;color:${ok ? INK : '#8B8577'};${ok ? '' : 'text-decoration:line-through;text-decoration-thickness:3px'}"><span style="font:500 20px GeistMono;color:${ok ? '#1F7A4D' : '#B91C1C'}">${ok ? '✓' : '✕'}</span>${t}</div>`); }).join('');
  return luxClaro(p) + mono('[ agência × kosta ]', 30, 112) +
    abs('left:30px;top:200px;font:900 30px Archivo;font-stretch:112%;color:#8B8577', 'AGÊNCIA') + abs('left:290px;top:200px', wm(30, AZUL)) +
    abs(`left:269px;top:196px;width:1px;height:${Math.min(1, p / .8) * 520}px;background:${INK}`, '') + lin(A, 30, false) + lin(K, 290, true) +
    abs(`left:0;right:0;top:690px;text-align:center;${pop(p, 2.4)}`, serif('mais rápido, mais acessível.', 36, AZUL));
};
META.kosta_vs_agencia = { tema: 'claro', wipe: INK, cam: [1, 1.04, 0, 0, 0, 0] };

CENAS.zap_alinhamento = (p, d) => {
  const fase2 = p > d * .52;
  const chat = `<div style="padding:12px;font-family:Montserrat">
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px"><div style="width:34px;height:34px;border-radius:50%;background:#141414;color:#EFEBE0;display:flex;align-items:center;justify-content:center;font:900 16px Archivo;font-stretch:125%">K</div><div style="color:#fff;font:800 15px Montserrat">Kosta <span style="color:#34D399;font-size:11px">● online</span></div></div>
    <div style="${pop(p, .2)};transform-origin:right;background:#005C4B;color:#fff;border-radius:14px;padding:9px 11px;font:700 14px/1.25 Montserrat;margin:0 0 9px 46px">Oi! Um cliente meu indicou vocês.</div>
    <div style="${pop(p, 1.3)};transform-origin:left;background:#1F2C34;color:#fff;border-radius:14px;padding:9px 11px;font:700 14px/1.25 Montserrat;margin:0 46px 9px 0">Oi, Léo! Eu sou o dono da Kosta. Me conta da barbearia e do que você precisa.</div>
    <div style="${pop(p, 2.4)};transform-origin:right;background:#005C4B;color:#fff;border-radius:14px;padding:9px 11px;font:700 14px/1.25 Montserrat;margin:0 0 9px 70px">Estilo, público, horários…</div></div>`;
  const itens = ['Conversa direta com o dono', 'Estilo e público da barbearia', 'Plano sob medida', 'Início: esta semana'];
  const lista = `<div style="padding:14px;font-family:Montserrat"><div style="font:500 11px GeistMono;color:#9DB8DB;letter-spacing:.08em;margin-bottom:10px">[ ALINHAMENTO ]</div>${itens.map((t, i) => `<div style="${pop(p, d * .52 + .2 + i * .55)};transform-origin:left;display:flex;gap:9px;align-items:center;background:${i === 3 ? '#264466' : '#1F2937'};color:#fff;border-radius:12px;padding:11px;margin-bottom:9px;font:800 15px/1.1 Montserrat"><span style="color:#34D399;font-size:18px">✓</span>${t}</div>`).join('')}</div>`;
  return fundoNoite() + celular(150, 110, 240, fase2 ? lista : chat, 0) +
    fig(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, pisca: piscar(p), d: [-8 + 5 * Math.sin(p * 2), 0] }), 20, 600, 150) +
    fig(dono({ mood: 'falando', t: p, bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1), d: [-30 + 20 * Math.sin(p * 4), -10] }), 360, 600, 150);
};
META.zap_alinhamento = { cam: [1, 1.05, 0, 0, 0, 0] };

CENAS.materiais_banco = (p, d) => {
  const T = [['Corte', '45'], ['Barba', '35'], ['Combo', '70'], ['Pigmentação', '90']], k = ease((p - d * .38) / .8);
  const planilha = abs(`left:${30 - k * 14}px;top:${200 - k * 20}px;width:300px;opacity:${1 - k * .35};transform:scale(${1 - k * .15}) rotate(${-k * 4}deg);transform-origin:left top`,
    `<div style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 10px 28px #0004;font:500 14px GeistMono;color:#111"><div style="background:#16A34A;color:#fff;padding:8px 10px;font:800 13px Montserrat">servicos.xlsx</div>${T.map(([a, b], i) => `<div style="display:grid;grid-template-columns:1fr 70px;border-top:1px solid #E5E7EB;padding:8px 10px;background:${(Math.floor(p * 2) % 4) === i ? '#DCFCE7' : '#fff'}"><span>${a}</span><span>R$ ${b}</span></div>`).join('')}</div>`);
  const cartaz = abs(`left:250px;top:170px;width:260px;${pop(p, d * .4, .6)};transform-origin:center`, `<div style="background:${CREME};border-radius:16px;padding:20px 18px;box-shadow:0 18px 40px #0007;border:1px solid #14141422">
    <div style="font:500 11px GeistMono;color:${AZUL};letter-spacing:.08em">[ TABELA DE PREÇOS ]</div><div style="margin:6px 0 12px">${serif('Serviços', 44, INK)}</div>
    ${T.map(([a, b]) => `<div style="display:flex;justify-content:space-between;border-top:1px solid #14141433;padding:7px 0;font:800 17px Archivo;font-stretch:108%;color:${INK}"><span>${a}</span><span>R$ ${b}</span></div>`).join('')}</div>`);
  return luxEscuro(p) + mono('[ banco de dados → material ]', 30, 112, '#9DB8DB') + planilha +
    abs(`left:210px;top:330px;font:400 60px/1 Anton;color:#9DB8DB;opacity:${clamp(k * 2)};transform:translateX(${Math.sin(p * 6) * 6}px)`, '→') + cartaz +
    foto('barbearia-promo', 36, 470, 230, 287, { rot: -4 + Math.sin(p * 1.5) * 1.5, s: ease((p - d * .55) / .6) }) +
    abs(`left:290px;top:560px;width:220px;opacity:${ease((p - d * .6) / .5)}`, serif('cartaz, cartão,<br>promoção.', 40, '#EFEBE0'));
};
META.materiais_banco = { tema: 'lux', wipe: CREME, cam: [1, 1.05, 0, 0, 0, 0] };

CENAS.entregas = (p, d) => {
  const C = [['barbearia-promo', 'Foto', -3], ['academia-personal', 'Stories', 2], ['design-ia', 'Carrossel', -2], ['estetica-clinica', 'Reels', 3]];
  const n = Math.min(4, 3 + Math.floor((p / d) * 2));
  return luxClaro(p) + mono('[ entrega diária ]', 30, 112) +
    abs(`left:0;right:0;top:140px;text-align:center;font:900 170px/1 Archivo;font-stretch:125%;letter-spacing:-.04em;color:${INK};${pop(p, .1)}`, `3<span style="font-size:80px;position:relative;top:-46px">–</span>4`) +
    abs('left:0;right:0;top:310px;text-align:center', serif('conteúdos por dia', 46, AZUL)) +
    C.map(([f, t, r], i) => { const x = 22 + i * 126, y = 420 + (i % 2) * 40 + Math.sin(p * 2 + i) * 5;
      return foto(f, x, y, 116, 175, { rot: r, op: 1, s: back((p - .6 - i * .5) / .5), r: 10 }) + abs(`left:${x + 8}px;top:${y + 184}px;${pop(p, .9 + i * .5)}`, `<span style="font:500 11px GeistMono;background:${INK};color:${CREME};padding:4px 8px;border-radius:999px;letter-spacing:.06em">${t.toUpperCase()}</span>`); }).join('') +
    mono('prontos pra postar', 30, 740, AZUL, 14);
};
META.entregas = { tema: 'claro', wipe: INK, cam: [1, 1.04, 0, 0, 0, 0] };

CENAS.curtidas2 = (p, d) => {
  const n = Math.round(10 + ease(p / (d * .85)) * 22);
  const cora = [...Array(12)].map((_, i) => { const ph = (p * 120 + i * 70) % 560; return abs(`left:${60 + (i * 83) % 430}px;top:${700 - ph}px;font-size:${22 + (i % 4) * 8}px;color:#F43F5E;opacity:${clamp(1 - ph / 560)};transform:rotate(${Math.sin(p * 3 + i) * 20}deg)`, '♥'); }).join('');
  const com = [['Quero agendar!', 40, 330, 1.2], ['Que corte! 🔥', 300, 480, 2.4]];
  return fundoNoite() + celular(150, 170, 240, `<div style="padding:10px"><div style="height:240px;border-radius:12px;background:linear-gradient(135deg,#60A5FA,#A78BFA);display:flex;align-items:center;justify-content:center;font-size:90px;color:#fff;transform:scale(${1 + .03 * Math.sin(p * 6)})">✂</div>
    <div style="margin-top:10px;color:#fff;font:800 20px Montserrat"><span style="color:#F43F5E;font-size:28px;display:inline-block;transform:scale(${1 + .2 * Math.abs(Math.sin(p * 6))})">♥</span> ${n} curtidas</div></div>`, 0) + cora +
    nota('Quero agendar!', 20, 300, 170, p, 1.2) + nota('Que corte!', 340, 440, 160, p, 2.3) +
    abs('left:0;right:0;top:112px;text-align:center;font:400 50px Anton;color:#fff', 'CADA POST, MAIS ALCANCE') +
    abs(`left:0;right:0;top:700px;text-align:center;font:400 130px/1 Anton;color:#F43F5E;text-shadow:0 5px 0 #000a`, '♥ ' + n);
};
META.curtidas2 = { cam: [1, 1.07, 0, 0, 0, 0] };

CENAS.semanas_lux = (p, d) => {
  const v = [83, 210, 540, 980, 1840], H = [40, 100, 190, 300, 420];
  return luxClaro(p) + mono('[ seguidores · semana 1–5 ]', 30, 112) +
    abs(`left:30px;top:150px;font:900 84px/1 Archivo;font-stretch:125%;letter-spacing:-.04em;color:${INK}`, Math.round(83 + ease(p / (d * .85)) * 1757).toLocaleString('pt-BR')) + abs('left:34px;top:240px', serif('seguidores', 34, AZUL)) +
    v.map((x, i) => { const k = ease((p - .3 - i * .55) / .8); return abs(`left:${30 + i * 98}px;top:${770 - H[i] * k}px;width:84px`,
      `<div style="height:${H[i] * k}px;border-radius:10px 10px 0 0;background:${i === 4 ? AZUL : '#14141433'}"></div><div style="font:500 12px GeistMono;color:${INK};margin-top:6px;letter-spacing:.06em">SEM ${i + 1}</div>`); }).join('');
};
META.semanas_lux = { tema: 'claro', wipe: INK, cam: [1, 1.03, 0, 0, 0, 0] };

CENAS.tempo_13h = (p, d) => {
  const k = ease(p / (d * .6));
  return luxEscuro(p) + mono('[ tempo de volta pra cadeira ]', 30, 112, '#9DB8DB') +
    abs(`left:0;right:0;top:170px;text-align:center;font:900 230px/1 Archivo;font-stretch:125%;letter-spacing:-.05em;color:#EFEBE0`, `${Math.round(k * 13)}<span style="font-size:90px">h</span>`) +
    abs('left:0;right:0;top:410px;text-align:center', serif('economizadas por semana', 44, '#9DB8DB')) +
    abs('left:40px;right:40px;top:500px;height:14px;border-radius:7px;background:#EFEBE022;overflow:hidden', `<div style="width:${k * 100}%;height:100%;background:linear-gradient(90deg,${AZUL2},#EFEBE0)"></div>`) +
    mono('fonte: activecampaign', 40, 530, '#EFEBE099', 11) +
    abs(`left:40px;right:40px;top:610px;${pop(p, d * .5)}`, `<div style="border:1px solid #EFEBE044;border-radius:18px;padding:18px;display:flex;gap:16px;align-items:center"><div style="font:900 64px/1 Archivo;font-stretch:125%;color:#EFEBE0;letter-spacing:-.04em">91%</div><div style="font:700 17px/1.2 Archivo;color:#EFEBE0">das PMEs que usam IA dizem que ela aumenta a receita<div style="font:500 11px GeistMono;color:#EFEBE099;margin-top:6px;letter-spacing:.06em">FONTE: SALESFORCE</div></div></div>`);
};
META.tempo_13h = { tema: 'lux', wipe: CREME, cam: [1, 1.06, 0, 0, 0, 0] };

CENAS.fila_nova = (p, d) => {
  const ab = 4 + 18 * Math.abs(Math.sin(p * 15));
  const fila = ['#2563EB', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6'].map((c, i) => { const alvo = 24 + i * 72, ini = 560 + i * 90, x = Math.max(alvo, ini - p * 150), anda = x > alvo;
    return abs(`left:${x}px;top:${640 + (i % 2) * 12}px;width:70px`, clienteAndando({ cor: c, perna: anda ? Math.sin(p * 11 + i) * 24 : 0, bob: anda ? Math.abs(Math.sin(p * 11 + i)) * -4 : Math.sin(p * 2 + i) * 1.5, mood: 'feliz' })); }).join('');
  return fundoBarbearia() + cadeira(60, 560, 1.4) + fig(clienteCapa({ corte: .85, bob: Math.sin(p * 2) * 1.5, mood: 'feliz', cor: '#9333EA' }), 70, 420, 150) +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, olhar: -3, e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6, 4] }), 240, 330, 200) + fila +
    titulo('Fila na porta', '#86EFAC', 104, 56) + abs(`left:60px;right:60px;top:200px;text-align:center;background:#10B981;color:#fff;border-radius:18px;padding:10px;font:400 30px Anton;${pop(p, .8)}`, 'AGENDA CHEIA');
};
META.fila_nova = { cam: [1, 1.06, 0, 0, 0, 0] };

CENAS.cta_kosta = (p, d) => luxEscuro(p) + mono('[ kosta · criação com ia ]', 30, 112, '#9DB8DB') +
  abs(`left:0;right:0;top:250px;text-align:center;font:900 98px/1 Archivo;font-stretch:125%;letter-spacing:-.03em;color:#EFEBE0;${pop(p, .1, .7)}`, 'KOSTA') +
  abs(`left:0;right:0;top:395px;text-align:center;opacity:${ease((p - .6) / .6)}`, serif('aparece todo dia.<br>sem perder tempo.', 46, '#9DB8DB')) +
  abs(`left:50px;right:50px;top:600px;${pop(p, 1.2)};transform-origin:center`, `<div style="background:#EFEBE0;color:#141414;border-radius:999px;padding:20px;text-align:center;font:900 30px Archivo;font-stretch:118%;letter-spacing:-.01em;transform:scale(${1 + .03 * Math.sin(p * 5)})">COMENTA “KOSTA”</div>`);
META.cta_kosta = { tema: 'lux', wipe: CREME, cam: [1, 1.08, 0, 0, 0, 0] };
