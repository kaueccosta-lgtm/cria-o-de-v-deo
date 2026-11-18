// Estilo semi-realista 2.5D: gradientes nos personagens, sombras, luz quente, profundidade e vinheta.
const defsReal = `<svg width="0" height="0" style="position:absolute"><defs>
<linearGradient id="gPele" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3C49A"/><stop offset="1" stop-color="#BF8455"/></linearGradient>
<linearGradient id="gPeleD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C98A60"/><stop offset="1" stop-color="#8A5636"/></linearGradient>
<linearGradient id="gCam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#B8BDC8"/></linearGradient>
<linearGradient id="gAvl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A62D6"/><stop offset="1" stop-color="#11265F"/></linearGradient>
<linearGradient id="gCal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#46526E"/><stop offset="1" stop-color="#171E2F"/></linearGradient>
<linearGradient id="gTerno" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2E2E36"/><stop offset="1" stop-color="#0C0C10"/></linearGradient>
<linearGradient id="gCapa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8794AB"/><stop offset="1" stop-color="#3C4557"/></linearGradient>
<linearGradient id="gCouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B8322A"/><stop offset="1" stop-color="#5B0F0D"/></linearGradient>
<linearGradient id="gCromo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8C919B"/><stop offset=".45" stop-color="#F4F6FA"/><stop offset="1" stop-color="#6E7480"/></linearGradient>
</defs></svg>`;
const sombra = svg => svg.replace(/#E2A878/g, 'url(#gPele)').replace(/#D9A06F/g, 'url(#gPele)').replace(/#B77A53/g, 'url(#gPeleD)').replace(/#F3F4F6/g, 'url(#gCam)').replace(/#1E3A8A/g, 'url(#gAvl)').replace(/#27324A/g, 'url(#gCal)')
  .replace(/#1B1B1F/g, 'url(#gTerno)').replace(/#64748B/g, 'url(#gCapa)').replace(/#141414"(?=\/>)/g, '#141414"');
const figR = (svg, x, y, w, extra = '') => { const T = window.T || 0, sway = Math.sin(T * 1.6 + x * .013) * 1.1, br = 1 + Math.sin(T * 2.2 + x * .02) * .012, base = `rotate(${sway}deg) scale(1,${br})`;
  extra = extra.includes('transform:') ? extra.replace('transform:', `transform:${base} `) : extra + `;transform-origin:50% 100%;transform:${base}`;
  return abs(`left:${x}px;top:${y}px;width:${w}px;filter:drop-shadow(0 ${w * .08}px ${w * .06}px #000a) drop-shadow(0 0 ${w * .05}px #FFB86644);${extra}`, sombra(svg)) +
  abs(`left:${x + w * .12}px;top:${y + w * 1.77}px;width:${w * .76}px;height:${w * .1}px;border-radius:50%;background:radial-gradient(#000b,#0000 70%)`, ''); };
const vinheta = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#0000 52%,#000b);pointer-events:none"></div><div style="position:absolute;inset:0;background:linear-gradient(#FFB86618,#0000 40%,#1E3A8A22);mix-blend-mode:overlay;pointer-events:none"></div>`;
function barbeariaReal(p) {
  const lamp = x => abs(`left:${x - 60}px;top:0;width:120px`, `<div style="position:absolute;left:59px;top:0;width:2px;height:70px;background:#111"></div><div style="position:absolute;left:30px;top:66px;width:60px;height:32px;border-radius:60px 60px 4px 4px;background:linear-gradient(#3A3A3A,#111)"></div>
    <div style="position:absolute;left:-60px;top:70px;width:240px;height:300px;background:radial-gradient(ellipse at 50% 12%,#FFD79A${(88 + Math.round(Math.sin(p * 6 + x) * 6)).toString(16).padStart(2, '0')},#FFB86600 70%)"></div>`);
  const frasco = (x, h, c) => `<div style="position:absolute;left:${x}px;bottom:0;width:22px;height:${h}px;border-radius:5px 5px 3px 3px;background:linear-gradient(90deg,${c},#fff6 45%,${c})"></div>`;
  return defsReal + `<div style="position:absolute;inset:0;background:linear-gradient(#34241D,#1E1410)"></div>
  <div style="position:absolute;inset:0;filter:blur(2.6px)"><div style="position:absolute;left:0;right:0;top:0;height:600px;background:repeating-linear-gradient(0deg,#0003 0 2px,#0000 2px 34px),repeating-linear-gradient(90deg,#0003 0 2px,#0000 2px 70px),linear-gradient(#5C3F2F,#3A261C);opacity:.9"></div>
    <div style="position:absolute;left:30px;top:150px;width:220px;height:340px;border-radius:110px 110px 10px 10px;background:linear-gradient(135deg,#B7CBE0,#41566B 60%,#1E2A36);border:9px solid #B58A2A;box-shadow:inset 0 0 40px #000a,0 12px 30px #000a;overflow:hidden"><div style="position:absolute;left:${(p * 40) % 340 - 120}px;top:-20px;width:60px;height:420px;background:linear-gradient(90deg,#fff0,#fff5,#fff0);transform:rotate(18deg)"></div></div>
    <div style="position:absolute;left:300px;top:330px;width:200px;height:12px;background:linear-gradient(#6B4A33,#2F1F15);box-shadow:0 8px 14px #000a"></div>
    <div style="position:absolute;left:310px;top:250px;width:180px;height:80px">${frasco(0, 70, '#2F6B8F')}${frasco(34, 56, '#8F2F2F')}${frasco(66, 74, '#C9A227')}${frasco(100, 52, '#2F8F5B')}${frasco(134, 66, '#6B2F8F')}</div>
    <div style="position:absolute;left:436px;top:380px;width:42px;height:200px;border-radius:21px;background:repeating-linear-gradient(135deg,#D9332B 0 22px,#fff 22px 44px,#2956C8 44px 66px);border:5px solid #E5E7EB"><div style="position:absolute;inset:0;border-radius:16px;background:linear-gradient(90deg,#0006,#fff5 38%,#0007)"></div></div>
    ${lamp(90)}${lamp(270)}${lamp(450)}</div>
  <div style="position:absolute;left:-260px;width:1060px;top:540px;height:760px;transform-origin:50% 0;transform:perspective(380px) rotateX(62deg);background:linear-gradient(#EFEBE3,#FAF8F4 45%,#E4DFD5)"></div>
  <div style="position:absolute;left:0;right:0;top:540px;height:420px;background:linear-gradient(#1E1410,#1E141000 18%,#0000)"></div>`;
}
const cadeiraReal = (x, y, s = 1.55) => abs(`left:${x}px;top:${y}px;transform:scale(${s});transform-origin:top left;filter:drop-shadow(0 14px 10px #000a)`,
  `<svg width="120" height="130" viewBox="0 0 120 130"><rect x="20" y="0" width="80" height="60" rx="20" fill="url(#gCouro)"/><rect x="8" y="52" width="104" height="34" rx="14" fill="url(#gCouro)"/><rect x="26" y="8" width="68" height="12" rx="6" fill="#fff" opacity=".18"/><rect x="54" y="86" width="12" height="30" fill="url(#gCromo)"/><ellipse cx="60" cy="122" rx="36" ry="8" fill="url(#gCromo)"/></svg>`);

CENAS.r_gancho = (p, d) => { const sh = p > .6 && p < 1.1 ? Math.sin(p * 90) * 5 : 0;
  return barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: .3, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 2.2) * 4, oculos: true, cor: '#64748B', pele: '#B77A53' }), 55, 430, 170) +
    abs('left:170px;top:590px', celular(0, 0, 100, chatIA, -6).replace('position:absolute;left:0px;top:0px', 'position:absolute')) +
    figR(leo({ mood: 'surpreso', bob: Math.sin(p * 5) * 2, pisca: piscar(p), olhar: -4, e: [20, -30], d: [-20, -30] }), 250, 340, 200) + suor(p, 396, 360) + bolha('é… eu…', 330, 300, 120, p, 1.1) + vinheta +
    abs(`left:0;right:0;top:100px;text-align:center;font:400 58px/1 Anton;color:#FDE047;text-shadow:0 6px 0 #000`, 'TODO MUNDO JÁ USA IA.') +
    abs(`left:0;right:0;top:170px;text-align:center;font:400 120px/1 Anton;color:#F87171;text-shadow:0 7px 0 #000;${pop(p, .5, .3)}`, `<div style="transform:translateX(${sh}px)">E VOCÊ?</div>`); };
META.r_gancho = { semLeg: true, cam: [1.03, 1.1, 0, 0, 0, 0] };

CENAS.r_cortando = (p, d) => { const ab = 4 + 18 * Math.abs(Math.sin(p * 15));
  const cabelo = [...Array(18)].map((_, i) => { const ph = (p * 75 + i * 41) % 230, x = 176 + 40 * Math.sin(i * 2.3) + 9 * Math.sin(p * 3 + i);
    return `<div style="position:absolute;left:${x}px;top:${470 + ph}px;width:8px;height:4px;border-radius:2px;background:#3B2A22;opacity:${clamp(1 - ph / 230)};transform:rotate(${ph * 4 + i * 30}deg)"></div>`; }).join('');
  return barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: clamp(p / d * 1.1), bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 3) * 3, mood: 'feliz' }), 55, 430, 170) +
    figR(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, olhar: -3, pisca: piscar(p), e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(ab), d: [-6 + 3 * Math.sin(p * 2), 4] }), 250, 340, 200) + cabelo + vinheta; };
META.r_cortando = { cam: [1.15, 1.3, 20, 60, 0, -40] };

CENAS.r_dono = (p, d) => barbeariaReal(p) + cadeiraReal(40, 575) + figR(clienteCapa({ corte: .2, bob: Math.sin(p * 2) * 1.5, mood: 'feliz', oculos: true, cor: '#141414', pele: '#B77A53' }), 55, 430, 170) +
  [0, 1, 2].map(i => figR(clienteAndando({ cor: ['#2563EB', '#F59E0B', '#EC4899'][i], mood: 'feliz', bob: Math.sin(p * 2 + i) * 1.5 }), 300 + i * 70, 690 + (i % 2) * 8, 60)).join('') +
  figR(leo({ mood: 'falando', t: p, bob: Math.sin(p * 4) * 2, pisca: piscar(p), olhar: -3, e: [40 + 25 * Math.sin(p * 4), -50], d: [-30 - 20 * Math.sin(p * 4 + 1), -50] }), 250, 340, 200) +
  [['+1.000 seguidores', 30, 250, .5], ['agenda cheia', 270, 215, 1.4], ['+ clientes', 290, 300, 2.3]].map(([t, x, y, t0]) => chip(t, x, y, 220, p, t0, '#10B981')).join('') + vinheta +
  abs('left:0;right:0;top:104px;text-align:center;font:400 46px Anton;color:#fff;text-shadow:0 5px 0 #000', '1 MÊS DEPOIS');
META.r_dono = { cam: [1, 1.08, 0, 0, 0, 0] };
