// Começo da história: gancho, aluguel do espaço, Léo e a IA, boom da IA.
const chaveSvg = `<g transform="translate(0 58)"><circle cx="0" cy="6" r="9" fill="none" stroke="#FBBF24" stroke-width="5"/><rect x="-2.5" y="14" width="5" height="26" fill="#FBBF24"/><rect x="2.5" y="28" width="9" height="4" fill="#FBBF24"/><rect x="2.5" y="36" width="7" height="4" fill="#FBBF24"/></g>`;

CENAS.gancho = (p, d) => {
  const shake = p > 1.3 && p < 1.75 ? Math.sin(p * 90) * 5 : 0;
  const walk = 320 + p * 60;
  return fundoNoite() +
    abs(`left:0;right:0;top:100px;text-align:center;font:400 104px/.95 Anton;color:#FDE047;text-shadow:0 6px 0 #000`, 'USAVA IA') +
    abs(`left:0;right:0;top:206px;text-align:center;font:400 104px/.95 Anton;color:#fff;text-shadow:0 6px 0 #000;${pop(p, .35, .3)}`, 'TODO DIA') +
    abs(`left:0;right:0;top:330px;text-align:center;font:400 62px/.95 Anton;color:#F87171;text-shadow:0 6px 0 #000;${pop(p, 1.2, .3)}`, `<div style="transform:translateX(${shake}px)">E PERDIA CLIENTE</div>`) +
    celular(150, 470, 150, `<div style="padding:8px;font:800 11px/1.2 Montserrat;color:#fff"><div style="background:#2563EB;border-radius:8px;padding:5px;margin-bottom:6px">Ideias de post?</div><div style="${pop(p, .6)};background:#374151;border-radius:8px;padding:5px">✦ Aqui vão 5 ideias…</div></div>`, -4 + Math.sin(p * 3) * 2) +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 4) * 2, pisca: piscar(p), olhar: 4, d: [-30, -95], extD: '' }), 20, 470, 210) +
    abs(`left:${walk}px;top:620px;width:84px`, clienteAndando({ cor: '#F59E0B', perna: Math.sin(p * 10) * 24, bob: Math.abs(Math.sin(p * 10)) * -4, mood: 'triste' }));
};
META.gancho = { semLeg: true, semSelo: true, cam: [1.04, 1.12, 0, 0, 0, 0] };

CENAS.aluga_espaco = (p, d) => {
  const f1 = 1 - ease((p - 1) / .2), f2 = ease((p - 1.2) / .3), luz = p > 1.5, sw = Math.sin(p * 3) * (p < 1.2 ? 7 : 2);
  const conf = p > 1.4 ? [...Array(26)].map((_, i) => { const t = p - 1.4 - (i % 5) * .04, x = 270 + (i - 13) * 18 + Math.sin(i * 3 + p * 4) * 14, y = 300 + t * 220 + (i % 4) * 14;
    return abs(`left:${x}px;top:${y}px;width:8px;height:12px;background:${['#FBBF24', '#EC4899', '#34D399', '#60A5FA'][i % 4]};transform:rotate(${p * 200 + i * 40}deg);opacity:${clamp(1.1 - t / 2.2)}`, ''); }).join('') : '';
  return abs('inset:0;background:linear-gradient(#312E81,#BE5A9E 75%,#F59E0B)', '') +
    abs('left:40px;top:330px;width:460px;height:420px;background:#3B2F5C;border-radius:10px 10px 0 0', '') +
    abs(`left:70px;top:470px;width:170px;height:170px;background:${luz ? '#FDE68A' : '#1F2A44'};border:8px solid #1C1730;border-radius:8px`, luz ? `<div style="position:absolute;left:50px;top:70px;width:70px;height:100px;background:#B45309;border-radius:30px 30px 0 0"></div>` : '') +
    abs('left:300px;top:480px;width:120px;height:270px;background:#8B5E3C;border:8px solid #1C1730;border-radius:60px 60px 0 0', `<div style="position:absolute;right:14px;top:130px;width:12px;height:12px;border-radius:50%;background:#FBBF24"></div>`) +
    abs(`left:30px;top:410px;width:480px;height:50px;transform:scaleY(${f2});transform-origin:top;background:repeating-linear-gradient(90deg,#DC2626 0 40px,#fff 40px 80px)`, '') +
    abs(`left:90px;top:230px;width:360px;transform-origin:50% 0;transform:rotate(${sw}deg)`,
      `<div style="margin:0 auto;width:300px;transform:scaleX(${f1});display:${f1 > .02 ? 'block' : 'none'};background:#fff;border:6px solid #DC2626;border-radius:10px;text-align:center;font:400 54px/1.2 Anton;color:#DC2626;padding:8px">ALUGA-SE</div>
       <div style="margin:0 auto;width:360px;transform:scaleX(${f2});display:${f2 > .02 ? 'block' : 'none'};background:#141414;border:6px solid #FBBF24;border-radius:10px;text-align:center;font:400 36px/1.15 Anton;color:#FBBF24;padding:10px">BARBEARIA<br>DO LÉO</div>`) +
    abs('left:0;right:0;top:750px;bottom:0;background:#2D2A3E', '') +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 4) * 2, pisca: piscar(p), d: [-140 + 10 * Math.sin(p * 9), -25 + 8 * Math.sin(p * 9 + 1)], extD: chaveSvg }), 340, 430, 190) + conf;
};
META.aluga_espaco = { cam: [1, 1.1, 0, 0, 0, 20] };

CENAS.ia_pesquisa = (p, d) => {
  const dots = (a, b) => p > a && p < b ? `<div style="display:flex;gap:4px;padding:10px 12px;background:#374151;border-radius:14px;width:50px">${[0, 1, 2].map(i => `<i style="width:8px;height:8px;border-radius:50%;background:#9CA3AF;display:block;transform:translateY(${Math.sin(p * 10 + i) * 3}px)"></i>`).join('')}</div>` : '';
  const m = (t, who, t0) => `<div style="${pop(p, t0)};transform-origin:${who ? 'right' : 'left'};background:${who ? '#2563EB' : '#374151'};color:#fff;border-radius:14px;padding:9px 11px;font:700 15px/1.25 Montserrat;margin:0 ${who ? 0 : 36}px 9px ${who ? 36 : 0}px">${t}</div>`;
  const spark = [...Array(6)].map((_, i) => abs(`left:${30 + i * 85}px;top:${700 - ((p * 50 + i * 120) % 560)}px;font-size:${18 + i % 3 * 8}px;color:#A78BFA;opacity:.7`, '✦')).join('');
  return fundoNoite() + spark + celular(190, 110, 320, `<div style="padding:12px"><div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;color:#fff;font:800 15px Montserrat"><span style="color:#A78BFA;font-size:20px">✦</span> Assistente de IA</div>
    ${m('Qual a melhor pomada pra cabelo cacheado?', 1, .3)}${dots(.9, 1.5)}${p > 1.5 ? m('Aqui vão 3 opções que seguram bem…', 0, 1.5) : ''}${p > 2.7 ? m('Ideia de promoção pra terça fraca?', 1, 2.7) : ''}${dots(3.2, 3.8)}${p > 3.8 ? m('Combo corte + barba só na terça!', 0, 3.8) : ''}</div>`, 0) +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 4 }), 4, 480, 190) + abs('left:20px;top:112px;font:400 44px/1 Anton;color:#C4B5FD', 'ELE AMA IA');
};
META.ia_pesquisa = { cam: [1, 1.07, 0, 0, 0, 0] };

CENAS.boom_ia = (p, d) => {
  const C = [['IA pra tudo', 20, 130, -4, '#7C3AED'], ['Todo mundo usando IA', 270, 195, 3, '#2563EB'], ['IA no marketing', 24, 290, 2, '#DB2777'], ['#IA em alta', 300, 370, -3, '#0EA5A4'], ['IA faz em segundos', 40, 450, -2, '#F59E0B'], ['Fica pra trás?', 290, 520, 4, '#DC2626']];
  return fundoNoite() + C.map(([t, x, y, r, c], i) => abs(`left:${x}px;top:${y + Math.sin(p * 2 + i) * 6}px;${pop(p, .2 + i * .5)};transform-origin:center`,
    `<div style="background:${c};color:#fff;border-radius:16px;padding:12px 16px;font:400 28px/1 Anton;text-transform:uppercase;box-shadow:0 10px 22px #0007;transform:rotate(${r}deg)">${t}</div>`)).join('') +
    abs(`left:0;right:0;top:96px;text-align:center;font:400 40px Anton;color:#fff;opacity:.9`, 'O BOOM DA IA') +
    fig(leo({ mood: p > 2 ? 'triste' : 'surpreso', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: Math.sin(p * 1.4) * 5, e: [30 + Math.sin(p * 3) * 6, -60], d: [-30 - Math.sin(p * 3) * 6, -60] }), 160, 560, 190) +
    abs(`left:380px;top:600px;font:400 120px/1 Anton;color:#FDE68A;transform:rotate(${Math.sin(p * 2) * 8}deg);opacity:${clamp((p - 1.5) / .4)}`, '?');
};
META.boom_ia = { cam: [1, 1.08, 0, 0, 0, 0] };

// pergunta: agora inclui o chip de IA na órbita
CENAS.pergunta_tempo = (p, d) => {
  const itens = [() => relogio(p * .3, 90), () => `<div style="width:110px;height:110px;border-radius:18px;background:#fff;color:#111;font:400 24px/1.1 Anton;display:flex;align-items:center;justify-content:center;text-align:center">AGENDA<br>CHEIA</div>`,
    () => `<div style="width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#2563EB);color:#fff;font:400 48px/110px Anton;text-align:center">IA</div>`, () => `<div style="width:100px;height:100px;border-radius:22px;background:#DB2777;color:#fff;font:400 22px/1.05 Anton;display:flex;align-items:center;justify-content:center;text-align:center">MARKE-<br>TING</div>`];
  const orb = itens.map((fn, i) => { const a = p * 1.3 + i * Math.PI / 2; return abs(`left:${240 + Math.cos(a) * 195 - 55}px;top:${470 + Math.sin(a) * 120 - 55}px`, fn()); }).join('');
  return fundoNoite() + abs(`left:0;right:0;top:110px;text-align:center;font:400 220px/1 Anton;color:#FDE68A;transform:translateY(${Math.sin(p * 3) * 10}px) rotate(${Math.sin(p * 2) * 4}deg)`, '?') +
    fig(leo({ mood: 'normal', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: Math.sin(p * 1.3) * 4, d: [-150, -110] }), 160, 380, 220) + orb;
};
