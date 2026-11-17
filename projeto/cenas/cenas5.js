// Versão focada: cliente indica a Kosta → materiais + passo a passo → autonomia e gestão.
const suor = (p, x, y) => [0, 1, 2].map(i => { const t = (p * 1.6 + i * .33) % 1; return abs(`left:${x + i * 14}px;top:${y + t * 40}px;font-size:22px;color:#7DD3FC;opacity:${1 - t}`, '●'); }).join('');

CENAS.gancho_cliente = (p, d) => fundoBarbearia() +
  abs(`left:0;right:0;top:104px;text-align:center;font:400 62px/1 Anton;color:#FDE047;text-shadow:0 6px 0 #000`, 'CADÊ O INSTAGRAM') +
  abs(`left:0;right:0;top:172px;text-align:center;font:400 62px/1 Anton;color:#fff;text-shadow:0 6px 0 #000;${pop(p, .5, .3)}`, 'DA SUA BARBEARIA?') +
  cadeira(40, 575, 1.55) + fig(clienteCapa({ corte: .3, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 2.2) * 4, mood: 'normal' }), 55, 430, 170) +
  fig(leo({ mood: 'surpreso', bob: Math.sin(p * 5) * 2, pisca: piscar(p), olhar: -4, e: [20, -30], d: [-20, -30] }), 250, 340, 200) + suor(p, 396, 360) +
  bolha('Eu… tô sem tempo pra postar.', 270, 700, 230, p, 1.6);
META.gancho_cliente = { semLeg: true, semSelo: true, cam: [1.04, 1.12, 0, 0, 0, 0] };

CENAS.perfil_parado = (p, d) => {
  const dias = Math.round(ease(p / (d * .8)) * 21);
  return fundoNoite() + celular(40, 150, 250, perfilInsta('@barbearia_leo', 3, 83, 175), -2 + Math.sin(p * 1.5)) +
    abs(`left:310px;top:170px;font:400 130px/1 Anton;color:#FCA5A5;text-shadow:0 5px 0 #000a`, dias) + abs('left:312px;top:300px;font:400 34px/1.05 Anton;color:#fff', 'DIAS SEM<br>POSTAR') +
    abs(`left:320px;top:400px`, relogio(p / d * 2, 120)) +
    fig(leo({ mood: 'triste', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: -3, e: [20, -40], d: [-20, -40] }), 300, 520, 190) + suor(p, 440, 540) +
    abs('left:30px;top:112px;font:500 13px GeistMono;color:#C4B5FD;letter-spacing:.08em', '[ PERFIL DO LÉO ]');
};
META.perfil_parado = { cam: [1, 1.07, 0, 0, 0, 0] };

CENAS.cliente_conta = (p, d) => {
  const ab = 4 + 18 * Math.abs(Math.sin(p * 15)), thumbs = ['barbearia-promo', 'restaurante-delivery', 'pet-shop', 'academia-personal'];
  const grid = `<div style="padding:6px"><div style="display:flex;gap:5px;align-items:center;margin-bottom:6px"><div style="width:18px;height:18px;border-radius:5px;background:#141414;color:#EFEBE0;font:900 11px/18px Archivo;text-align:center">K</div><span style="color:#fff;font:800 11px Montserrat">Material novo</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px">${thumbs.map((t, i) => `<div style="${pop(p, .5 + i * .45, .3)};height:88px;border-radius:8px;overflow:hidden;position:relative"><img src="imagens/${t}.webp" style="width:100%;height:100%;object-fit:cover"><div style="position:absolute;right:3px;bottom:3px;background:#10B981;color:#fff;border-radius:50%;width:16px;height:16px;font:800 11px/16px Montserrat;text-align:center">✓</div></div>`).join('')}</div></div>`;
  return fundoBarbearia() + cadeira(40, 575, 1.55) + fig(clienteCapa({ corte: .4, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 2.2) * 4, mood: 'feliz' }), 55, 430, 170) +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, olhar: -3, pisca: piscar(p), e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6 + 3 * Math.sin(p * 2), 4] }), 250, 340, 200) +
    celular(60, 120, 160, grid, -4 + Math.sin(p * 2) * 2) + bolha('Eu uso a Kosta!', 250, 175, 210, p, .3, '#EFEBE0', '#141414') +
    bolha('Eles mandam o material pra divulgar.', 250, 255, 230, p, 1.6);
};
META.cliente_conta = { cam: [1, 1.1, 0, 12, 0, 0] };

// ---- passo a passo de criar uma imagem ----
const PASSOS = ['Ideia', 'Gerar', 'Identidade', 'Publicar'];
const passos = ativo => abs('left:30px;right:30px;top:150px;display:flex;gap:6px', PASSOS.map((t, i) => `<div style="flex:1;text-align:center;font:500 11px GeistMono;letter-spacing:.06em;padding:7px 0;border-radius:999px;background:${i === ativo ? '#EFEBE0' : i < ativo ? '#26446688' : '#EFEBE018'};color:${i === ativo ? INK : '#EFEBE0'};text-transform:uppercase">${i + 1} ${t}</div>`).join(''));
function posterBase(o = {}) {
  const { gen = 1, frame = 0, logo = 0, head = 0, preco = 0, btn = 0 } = o, w = 300, h = 375;
  const t = k => `opacity:${clamp(k)};transform:translateY(${(1 - clamp(k)) * 12}px)`;
  return `<div style="position:relative;width:${w}px;height:${h}px;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px #000b;background:radial-gradient(circle at 50% 40%,#E3D2B4,#8C7458 68%,#3A2E22);filter:blur(${(1 - gen) * 22}px);opacity:${.35 + .65 * gen};transform:scale(${1.08 - .08 * gen})">
    <div style="position:absolute;left:50%;top:-20px;width:240px;height:240px;margin-left:-120px;border-radius:50%;background:radial-gradient(#fff9,#fff0 70%)"></div>
    <svg style="position:absolute;left:78px;top:128px" width="144" height="170" viewBox="0 0 120 130"><rect x="20" y="0" width="80" height="60" rx="20" fill="#3B1E14"/><rect x="8" y="52" width="104" height="34" rx="14" fill="#4A2618"/><rect x="54" y="86" width="12" height="30" fill="#B8BCC4"/><ellipse cx="60" cy="122" rx="36" ry="8" fill="#8C919B"/><rect x="26" y="10" width="68" height="14" rx="7" fill="#fff" opacity=".14"/></svg>
    <div style="position:absolute;inset:${10}px;border:2px solid #C9A227;border-radius:8px;opacity:${clamp(frame)};transform:scale(${1 - (1 - clamp(frame)) * .06})"></div>
    <div style="position:absolute;left:0;right:0;top:26px;text-align:center;${t(logo)}"><div style="font:900 13px Archivo;font-stretch:125%;color:#141414;letter-spacing:.14em">BARBEARIA DO LÉO</div><div style="width:40px;height:2px;background:#C9A227;margin:6px auto 0"></div></div>
    <div style="position:absolute;left:0;right:0;top:56px;text-align:center;${t(head)}"><span style="font:italic 400 44px/1 InstrumentSerif;color:#141414">Dia do Cliente</span></div>
    <div style="position:absolute;left:0;right:0;bottom:56px;text-align:center;${t(preco)}"><div style="font:900 20px Archivo;font-stretch:112%;color:#fff;text-shadow:0 2px 6px #000a">Corte + Barba · R$ 70</div><div style="font:500 11px GeistMono;color:#F5E7C8;letter-spacing:.08em;margin-top:4px">SÓ NA TERÇA</div></div>
    <div style="position:absolute;left:70px;right:70px;bottom:14px;text-align:center;background:#C9A227;color:#141414;border-radius:999px;padding:7px;font:900 12px Archivo;font-stretch:112%;${t(btn)}">AGENDE AGORA</div></div>`;
}
CENAS.passo_prompt = (p, d) => {
  const txt = 'Cartaz de promoção pra barbearia, estilo clássico, cadeira vintage, tons quentes';
  const tp = clamp(p / (d * .42)), n = Math.floor(tp * txt.length), gerar = p > d * .46, gen = ease((p - d * .52) / (d * .42));
  return luxEscuro(p) + mono(gerar ? '[ passo 2 / 4 · a IA gera a imagem ]' : '[ passo 1 / 4 · descreva a ideia ]', 30, 112, '#9DB8DB') + passos(gerar ? 1 : 0) +
    abs('left:30px;right:30px;top:200px', `<div style="background:#1E2733;border:1px solid #EFEBE033;border-radius:16px;padding:14px 16px"><div style="font:500 11px GeistMono;color:#9DB8DB;letter-spacing:.08em;margin-bottom:6px">PROMPT</div>
      <div style="font:500 17px/1.35 GeistMono;color:#EFEBE0;min-height:70px">${txt.slice(0, n)}<span style="opacity:${Math.sin(p * 9) > 0 ? 1 : 0}">▍</span></div>
      <div style="text-align:right;margin-top:6px"><span style="display:inline-block;background:${gerar ? '#10B981' : '#EFEBE0'};color:${gerar ? '#fff' : INK};border-radius:999px;padding:7px 16px;font:900 13px Archivo;font-stretch:112%;transform:scale(${gerar && p < d * .5 ? 1.12 : 1})">${gerar ? '✦ GERANDO' : 'GERAR'}</span></div></div>`) +
    (p > d * .46 ? abs('left:120px;top:395px', posterBase({ gen })) + (gen < .95 ? abs(`left:0;right:0;top:545px;text-align:center;font:500 13px GeistMono;color:#9DB8DB;letter-spacing:.1em`, 'GERANDO' + '.'.repeat(1 + Math.floor(p * 4) % 3)) : '') : abs('left:120px;top:395px;width:300px;height:375px;border:1px dashed #EFEBE055;border-radius:14px', ''));
};
META.passo_prompt = { tema: 'lux', wipe: CREME, cam: [1, 1.03, 0, 0, 0, 0] };

CENAS.passo_final = (p, d) => {
  const a = ease((p - .1) / .5), b = ease((p - d * .12) / .5), c = ease((p - d * .22) / .5), e = ease((p - d * .5) / .5), f = ease((p - d * .6) / .5), pub = p > d * .78;
  return luxEscuro(p) + mono(pub ? '[ passo 4 / 4 · publicar ]' : '[ passo 3 / 4 · identidade da marca ]', 30, 112, '#9DB8DB') + passos(pub ? 3 : p > d * .45 ? 3 : 2) +
    abs('left:120px;top:200px', posterBase({ frame: a, logo: b, head: c, preco: e, btn: f })) +
    abs('left:30px;right:30px;top:590px;display:flex;gap:8px', [['Identidade', a], ['Texto', c], ['Preço', e]].map(([t, k]) => `<div style="flex:1;text-align:center;background:#EFEBE014;border:1px solid #EFEBE033;color:#EFEBE0;border-radius:12px;padding:9px 0;font:500 12px GeistMono;letter-spacing:.05em;opacity:${.3 + .7 * clamp(k)}"><span style="color:#34D399">${k > .9 ? '✓' : '·'}</span> ${t.toUpperCase()}</div>`).join('')) +
    abs(`left:80px;right:80px;top:660px;text-align:center;border-radius:999px;padding:16px;font:900 24px Archivo;font-stretch:118%;background:${pub ? '#10B981' : '#EFEBE0'};color:${pub ? '#fff' : INK};transform:scale(${pub ? 1 + .04 * Math.sin(p * 8) : 1})`, pub ? '✓ PUBLICADO' : 'PUBLICAR') +
    (pub ? [...Array(8)].map((_, i) => { const ph = ((p - d * .78) * 120 + i * 50) % 300; return abs(`left:${90 + i * 48}px;top:${650 - ph}px;font-size:${20 + i % 3 * 6}px;color:#F43F5E;opacity:${clamp(1 - ph / 300)}`, '♥'); }).join('') : '');
};
META.passo_final = { tema: 'lux', wipe: CREME, cam: [1, 1.03, 0, 0, 0, 0] };

CENAS.gestao = (p, d) => {
  const K = [['Calendário de posts', 1.2], ['Legendas e ideias', 2.0], ['Gestão das redes', 2.8]], L = [['Cria as peças', .6], ['Aprova e posta', 1.4]];
  const item = (t, t0, x, ok) => abs(`left:${x}px;top:${0}px;width:225px;${pop(p, t0)};transform-origin:left`, `<div style="background:${ok ? '#264466' : '#14141412'};color:${ok ? '#fff' : INK};border-radius:14px;padding:11px 12px;font:800 16px/1.1 Archivo;font-stretch:105%"><span style="color:${ok ? '#9DB8DB' : '#1F7A4D'}">✓</span> ${t}</div>`);
  const col = (arr, x, ok) => arr.map(([t, t0], i) => abs(`left:${x}px;top:${362 + i * 66}px;width:225px;${pop(p, t0)};transform-origin:left`, `<div style="background:${ok ? AZUL : '#14141412'};color:${ok ? '#fff' : INK};border-radius:14px;padding:11px 12px;font:800 16px/1.1 Archivo;font-stretch:105%"><span style="color:${ok ? '#9DB8DB' : '#1F7A4D'}">✓</span> ${t}</div>`)).join('');
  const dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'], on = Math.floor(clamp((p - 1.6) / (d * .6)) * 6);
  return luxClaro(p) + mono('[ criar + gerenciar ]', 30, 112) +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), d: [-8 + 4 * Math.sin(p * 4), 0] }), 80, 140, 92) + fig(dono({ mood: 'feliz', bob: Math.sin(p * 3 + 1) * 2, pisca: piscar(p + 1) }), 370, 140, 92) +
    abs('left:30px;top:318px;font:900 24px Archivo;font-stretch:120%;color:#141414', 'LÉO') + abs('left:290px;top:318px', wm(24, AZUL)) +
    abs('left:269px;top:318px;width:1px;height:230px;background:#14141433', '') + col(L, 30, false) + col(K, 290, true) +
    abs('left:30px;right:30px;top:580px;display:flex;gap:6px', dias.map((x, i) => `<div style="flex:1;text-align:center;padding:12px 0;border-radius:12px;background:${i < on ? AZUL : '#14141414'};color:${i < on ? '#fff' : INK};font:500 12px GeistMono;transition:none">${i < on ? '✓' : ''}<br>${x}</div>`).join('')) +
    abs(`left:0;right:0;top:690px;text-align:center;${pop(p, 2.2)}`, serif('você cria, a Kosta sustenta.', 34, AZUL));
};
META.gestao = { tema: 'claro', wipe: INK, cam: [1, 1.04, 0, 0, 0, 0] };
