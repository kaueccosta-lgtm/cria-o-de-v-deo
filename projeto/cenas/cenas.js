// Biblioteca de cenas. Palco: 540x960 (renderizado em 2x = 1080x1920).
// Cada cena: (p, d) => html, onde p = segundos desde o início da cena e d = duração total.
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = t => 1 - Math.pow(1 - clamp(t), 3);                       // easeOutCubic
const back = t => { t = clamp(t); const c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const pop = (p, t0 = 0, dur = .45) => { const k = back((p - t0) / dur); return `transform:scale(${k});opacity:${clamp((p - t0) / .15)}`; };
const abs = (css, inner) => `<div style="position:absolute;${css}">${inner}</div>`;
const fig = (svg, x, y, w, extra = '') => abs(`left:${x}px;top:${y}px;width:${w}px;${extra}`, svg);

// ---------- Cenários ----------
function fundoBarbearia(escuro = 0) {
  return `<div style="position:absolute;inset:0;background:linear-gradient(#2B2140,#3A2C57 60%,#241B38)"></div>
  <div style="position:absolute;left:0;right:0;top:560px;bottom:0;background:linear-gradient(#4A3A2A,#33281D)"></div>
  <div style="position:absolute;left:36px;top:150px;width:200px;height:300px;border-radius:100px 100px 14px 14px;background:linear-gradient(135deg,#7DD3FC55,#ffffff22);border:8px solid #C9A227"></div>
  <div style="position:absolute;left:420px;top:210px;width:40px;height:250px;border-radius:20px;background:repeating-linear-gradient(135deg,#EF4444 0 22px,#fff 22px 44px,#2563EB 44px 66px);border:5px solid #E5E7EB"></div>
  <div style="position:absolute;left:0;right:0;top:0;bottom:0;background:#000;opacity:${escuro}"></div>`;
}
function fundoNoite() { return `<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,#4C1D95,#1E1B4B 60%,#0B1020)"></div>`; }
function fundoEscuro() { return `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#241B38,#1A1330)"></div>`; }

// ---------- Props ----------
function cadeira(x, y, s = 1, cor = '#B91C1C') {
  return abs(`left:${x}px;top:${y}px;transform:scale(${s});transform-origin:top left`,
    `<svg width="120" height="130" viewBox="0 0 120 130"><rect x="20" y="0" width="80" height="60" rx="20" fill="${cor}"/><rect x="8" y="52" width="104" height="34" rx="14" fill="${cor}"/><rect x="54" y="86" width="12" height="30" fill="#9CA3AF"/><ellipse cx="60" cy="122" rx="36" ry="8" fill="#6B7280"/></svg>`);
}
function cliente(x, y, cor, s = 1) {
  return abs(`left:${x}px;top:${y}px;transform:scale(${s});transform-origin:top left`,
    `<svg width="70" height="90" viewBox="0 0 70 90"><rect x="10" y="44" width="50" height="46" rx="20" fill="${cor}"/><circle cx="35" cy="26" r="22" fill="#E2A878"/><path d="M13 24 Q14 4 35 4 Q56 4 57 24 Q48 14 35 14 Q22 14 13 24Z" fill="#3B2A22"/><circle cx="27" cy="27" r="2.6" fill="#1F1512"/><circle cx="43" cy="27" r="2.6" fill="#1F1512"/><path d="M27 36 Q35 43 43 36" stroke="#5B2B22" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`);
}
function celular(x, y, w, conteudo, rot = 0) {
  const h = w * 1.95;
  return abs(`left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg)`,
    `<div style="position:absolute;inset:0;border-radius:${w * .14}px;background:#0B0F1A;border:${w * .035}px solid #E5E7EB;box-shadow:0 18px 40px #0008;overflow:hidden">
      <div style="position:absolute;left:50%;top:6px;width:${w * .28}px;height:${w * .05}px;margin-left:-${w * .14}px;border-radius:9px;background:#000"></div>
      <div style="position:absolute;left:0;right:0;top:${w * .12}px;bottom:0">${conteudo}</div></div>`);
}
function perfilInsta(nome = '@barbearia_leo', posts = 0, seguidores = 0, ph = 200) {
  const cores = ['#60A5FA', '#F472B6', '#FBBF24', '#34D399', '#A78BFA', '#FB7185', '#38BDF8', '#F59E0B', '#4ADE80'];
  let g = '';
  for (let i = 0; i < 9; i++) {
    const on = i < posts;
    g += `<div style="background:${on ? cores[i] : '#1F2937'};border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:${ph * .12}px;color:#fff;opacity:${on ? 1 : .5}">${on ? '✂' : ''}</div>`;
  }
  return `<div style="padding:10px;color:#fff;font-family:Montserrat;font-weight:800">
    <div style="display:flex;align-items:center;gap:10px"><div style="width:${ph * .28}px;height:${ph * .28}px;border-radius:50%;background:linear-gradient(135deg,#F59E0B,#EC4899)"></div>
    <div style="font-size:${ph * .075}px;line-height:1.3">${nome}<br><span style="font-weight:600;opacity:.7">${seguidores} seguidores</span></div></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:12px;height:${ph * 1.05}px">${g}</div></div>`;
}
function grafico(p, sobe = false, w = 400, h = 220, cor) {
  const pts = sobe ? [[0, 190], [.25, 150], [.5, 110], [.75, 60], [1, 14]] : [[0, 20], [.25, 60], [.5, 100], [.75, 150], [1, 196]];
  const k = ease(p), n = pts.length;
  let d = '';
  pts.forEach(([x, y], i) => { if (i / (n - 1) <= k + .0001) d += (d ? 'L' : 'M') + x * w + ' ' + y; });
  const c = cor || (sobe ? '#34D399' : '#F87171');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" rx="18" fill="#111827"/><path d="${d}" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 0)"/></svg>`;
}
function calendario(p, d = 30) {
  let c = '';
  const n = Math.floor(clamp(p) * d);
  for (let i = 0; i < d; i++) c += `<div style="height:44px;border-radius:10px;background:${i < n ? '#34D399' : '#374151'};color:#fff;display:flex;align-items:center;justify-content:center;font:800 16px Montserrat">${i < n ? '✓' : i + 1}</div>`;
  return `<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;width:440px;padding:16px;border-radius:20px;background:#1F2937">${c}</div>`;
}
function bolha(txt, x, y, w, p, t0 = 0, cor = '#fff', fg = '#111') {
  return abs(`left:${x}px;top:${y}px;width:${w}px;${pop(p, t0)};transform-origin:bottom left`,
    `<div style="background:${cor};color:${fg};border-radius:22px;padding:14px 18px;font:800 22px/1.15 Montserrat;box-shadow:0 8px 20px #0006">${txt}</div>`);
}
function notificacao(txt, y, p, t0 = 0) {
  const k = ease((p - t0) / .4);
  return abs(`left:30px;right:30px;top:${y - (1 - k) * 80}px;opacity:${k}`,
    `<div style="display:flex;gap:12px;align-items:center;background:#F9FAFB;border-radius:20px;padding:14px 18px;box-shadow:0 10px 24px #0007;font:800 21px/1.15 Montserrat;color:#111"><div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#2DD4BF,#0EA5A4);color:#7C2D12;font:400 28px Anton;display:flex;align-items:center;justify-content:center">K</div><div>${txt}</div></div>`);
}
function titulo(txt, cor = '#fff', y = 120, size = 54) {
  return abs(`left:20px;right:20px;top:${Math.max(y, 104)}px;text-align:center;font:400 ${size}px/1.05 Anton;color:${cor};text-transform:uppercase;text-shadow:0 4px 0 #0007`, txt);
}

// ---------- Cenas ----------
const CENAS = {
  // Léo sozinho, cadeiras vazias
  barbearia_vazia: (p, d) => fundoBarbearia() + cadeira(60, 520, 1.2) + cadeira(330, 520, 1.2) +
    fig(barbeiro({ mood: 'triste', bob: Math.sin(p * 2) * 2 }), 170, 380, 200, `opacity:${clamp(p / .3)}`) +
    titulo('Sem cliente\nhoje de novo', '#FCA5A5', 90, 50),
  // Léo olhando o perfil vazio
  perfil_vazio: (p, d) => fundoNoite() +
    celular(130, 190, 280, perfilInsta('@barbearia_leo', 0, 83, 190), -3 + Math.sin(p * 1.5)) +
    fig(barbeiro({ mood: 'triste' }), 20, 600, 190) +
    bolha('Faz 3 semanas que não posto...', 250, 720, 260, p, .4) + titulo('Perfil parado', '#FDE68A', 70),
  // Gráfico de clientes despencando
  grafico_caindo: (p, d) => fundoEscuro() + titulo('Clientes por semana', '#fff', 90, 44) +
    abs('left:70px;top:250px', grafico(p / (d * .8), false, 400, 260)) +
    abs(`left:0;right:0;top:520px;text-align:center;font:400 110px Anton;color:#F87171;${pop(p, .6)}`, '-40%') +
    fig(barbeiro({ mood: 'triste' }), 190, 610, 160),
  // Kosta aparece
  kosta_chega: (p, d) => fundoNoite() +
    fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 6, glow: 1 + Math.sin(p * 4) * .1 }), 215 - (1 - ease(p / .8)) * 300, 330 - (1 - ease(p / .8)) * 120, 220, `opacity:${clamp(p / .3)}`) +
    fig(barbeiro({ mood: 'surpreso' }), 30, 520, 180) +
    bolha('Quem é você?', 40, 470, 200, p, .9) + bolha('Eu sou o Kosta!', 300, 280, 220, p, 1.6, '#2DD4BF', '#042F2E'),
  // Kosta entrega conteúdo: notificações
  conteudo_chegando: (p, d) => fundoNoite() +
    fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 5 }), 20, 560, 170) + fig(barbeiro({ mood: 'feliz' }), 350, 520, 170) +
    notificacao('Post de hoje pronto: corte degradê', 90, p, .2) +
    notificacao('Reels: antes e depois', 190, p, .9) +
    notificacao('Stories: horários livres', 290, p, 1.6) +
    notificacao('Legenda + hashtags prontas', 390, p, 2.3),
  // Calendário enchendo
  calendario_cheio: (p, d) => fundoEscuro() + titulo('30 dias\nde conteúdo', '#6EE7B7', 70, 56) +
    abs('left:50px;top:260px', calendario(p / (d * .75))) +
    fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 5 }), 330, 600, 180) + fig(barbeiro({ mood: 'feliz' }), 40, 580, 190),
  // Perfil aquecendo: posts e seguidores subindo
  perfil_cheio: (p, d) => fundoNoite() +
    celular(130, 160, 280, perfilInsta('@barbearia_leo', Math.floor(clamp(p / (d * .7)) * 9), Math.round(83 + ease(p / d) * 1840), 190), 2) +
    abs(`left:0;right:0;top:760px;text-align:center;font:400 54px Anton;color:#FDE68A;${pop(p, .5)}`, '+1.840 seguidores') +
    fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 5 }), 6, 620, 130),
  // Barbearia lotada
  barbearia_cheia: (p, d) => fundoBarbearia() + cadeira(60, 520, 1.2) + cadeira(330, 520, 1.2) +
    cliente(80, 450, '#2563EB', 1.3 * ease(p / .4)) + cliente(350, 450, '#F59E0B', 1.3 * ease((p - .4) / .4)) +
    cliente(190, 640, '#10B981', 1.1 * ease((p - .8) / .4)) + cliente(300, 640, '#EC4899', 1.1 * ease((p - 1.2) / .4)) +
    fig(barbeiro({ mood: 'feliz', acao: Math.sin(p * 6) * 14 }), 170, 380, 200) + titulo('Agenda lotada!', '#86EFAC', 90, 56),
  // Chamada final
  cta: (p, d) => fundoNoite() + titulo('Quer um Kosta\npara o seu negócio?', '#fff', 150, 52) +
    fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 6 }), 150, 400, 240) +
    abs(`left:60px;right:60px;top:800px;text-align:center;background:#2DD4BF;color:#042F2E;border-radius:22px;padding:18px;font:400 34px Anton;${pop(p, .6)}`, 'COMENTA "KOSTA"'),
};
if (typeof module !== 'undefined') module.exports = { CENAS, clamp, ease };
