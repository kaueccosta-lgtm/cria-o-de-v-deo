// Cenas da história completa (estende CENAS de cenas.js).
const relogio = (p, s = 150) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="6"/>
  <line x1="50" y1="50" x2="50" y2="22" stroke="#111" stroke-width="6" stroke-linecap="round" transform="rotate(${p * 360} 50 50)"/>
  <line x1="50" y1="50" x2="50" y2="32" stroke="#EF4444" stroke-width="7" stroke-linecap="round" transform="rotate(${p * 30} 50 50)"/><circle cx="50" cy="50" r="5" fill="#111"/></svg>`;
const chip = (txt, x, y, w, p, t0, bg, fg = '#fff') => abs(`left:${x}px;top:${y}px;width:${w}px;${pop(p, t0)};transform-origin:center`,
  `<div style="background:${bg};color:${fg};border-radius:16px;padding:12px 14px;font:400 26px/1.05 Anton;text-transform:uppercase;text-align:center;box-shadow:0 8px 18px #0006">${txt}</div>`);
const nota = (txt, x, y, w, p, t0, bg = '#fff', fg = '#111') => abs(`left:${x}px;top:${y}px;width:${w}px;${pop(p, t0)}`,
  `<div style="background:${bg};color:${fg};border-radius:18px;padding:12px 14px;font:800 20px/1.15 Montserrat;box-shadow:0 8px 18px #0006">${txt}</div>`);
const mil = n => n >= 1000 ? (n / 1000).toFixed(1).replace('.', ',') + ' mil' : String(Math.round(n));

Object.assign(CENAS, {
  barbearia_ocupada: (p, d) => fundoBarbearia() + cadeira(60, 520, 1.2) + cliente(88, 478, '#2563EB', 1.25) + cadeira(330, 520, 1.2) +
    fig(barbeiro({ mood: 'normal', acao: Math.sin(p * 7) * 18 }), 170, 380, 200) + titulo('Cliente?\nO Léo tem', '#BAE6FD', 90, 52),
  horas_postando: (p, d) => fundoEscuro() + titulo('Só pra 1 post…', '#fff', 80, 50) +
    abs(`left:60px;top:230px;${pop(p, .1)}`, relogio(p / d * 2, 190)) +
    abs(`left:290px;top:250px;font:400 120px/1 Anton;color:#FBBF24;${pop(p, .5)}`, '2h') +
    celular(330, 420, 150, `<div style="height:100%;background:#1F2937"></div>`, 8) +
    fig(barbeiro({ mood: 'triste', bob: Math.sin(p * 2) * 2 }), 60, 470, 190) +
    bolha('Não sobra tempo…', 250, 700, 230, p, 1),
  leo_pensando: (p, d) => fundoNoite() +
    abs(`left:0;right:0;top:120px;text-align:center;font:400 260px/1 Anton;color:#FDE68A;transform:translateY(${Math.sin(p * 3) * 10}px)`, '?') +
    fig(barbeiro({ mood: 'surpreso', bob: Math.sin(p * 2) * 2 }), 160, 380, 220) + bolha('Como ele faz isso?', 150, 330, 250, p, .5),
  concorrente_perfil: (p, d) => fundoNoite() +
    celular(170, 150, 260, perfilInsta('@barbearia_rival', 9, Math.round(2000 + ease(p / d) * 340), 180), 3) +
    fig(barbeiro({ mood: 'surpreso' }), 10, 560, 180) + bolha('2.340 seguidores?!', 190, 700, 260, p, .6) + titulo('O concorrente', '#FCA5A5', 60, 44),
  concorrente_posts: (p, d) => fundoNoite() +
    celular(150, 200, 240, perfilInsta('@barbearia_rival', 9, 2340, 170), 0) +
    chip('Viralizou', 8, 280, 170, p, .4, '#F97316') + chip('Trouxe cliente', 360, 430, 170, p, 1.6, '#10B981') + chip('Aquece a conta', 8, 600, 170, p, 2.8, '#6366F1') +
    titulo('Todo dia tem post', '#fff', 60, 44) + fig(barbeiro({ mood: 'surpreso' }), 330, 640, 150),
  kosta_empresa: (p, d) => fundoNoite() +
    fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 6, glow: 1 + Math.sin(p * 4) * .1 }), 150, 60 - (1 - ease(p / .6)) * 80, 240, `opacity:${clamp(p / .3)}`) +
    abs(`left:0;right:0;top:500px;text-align:center;font:400 120px/1 Anton;color:#2DD4BF;${pop(p, .3)}`, '<span style="color:#FBBF24">K</span>OSTA') +
    chip('Pequenos e médios negócios', 40, 650, 460, p, 1.2, '#7C3AED') + chip('Conteúdo orgânico com IA', 40, 730, 460, p, 2.4, '#0EA5A4') + chip('Sem depender de agência', 40, 810, 460, p, 3.6, '#DB2777'),
  agencia_vs_kosta: (p, d) => {
    const k = ease(p / 1.2);
    return fundoEscuro() + titulo('Agência × <span style="color:#2DD4BF">Kosta</span>', '#fff', 70, 54) +
      abs('left:40px;top:200px;width:210px', `<div style="background:#7F1D1D;border-radius:22px;padding:18px;height:${180 + 120 * k}px;color:#fff;font:400 30px/1.1 Anton;text-align:center;overflow:hidden">AGÊNCIA<br><span style="font-size:80px;color:#FCA5A5">$$$</span><br><span style="font-size:24px;font:800 20px Montserrat">caro e demorado</span></div>`) +
      abs('left:290px;top:200px;width:210px', `<div style="background:#115E59;border-radius:22px;padding:18px;height:${180 + 20 * k}px;color:#fff;font:400 30px/1.1 Anton;text-align:center;overflow:hidden">KOSTA<br><span style="font-size:80px;color:#5EEAD4">$</span><br><span style="font:800 20px Montserrat">cabe no bolso</span></div>`) +
      fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 5 }), 310, 615, 140) + fig(barbeiro({ mood: 'feliz' }), 70, 605, 150) +
      chip('E ainda te ensina a fazer', 40, 535, 460, p, 2, '#FBBF24', '#111');
  },
  contratar: (p, d) => {
    const clic = p > 2.0;
    return fundoNoite() + celular(150, 130, 240, `<div style="padding:12px;color:#fff;font-family:Montserrat">
      <div style="font:400 30px Anton;color:#2DD4BF;text-align:center"><span style="color:#FBBF24">K</span>OSTA</div>
      <div style="background:#1F2937;border-radius:14px;padding:12px;margin-top:10px;font:800 15px/1.3 Montserrat">✓ Posts todo dia<br>✓ Reels e Stories<br>✓ Legenda pronta</div>
      <div style="margin-top:16px;background:${clic ? '#10B981' : '#2DD4BF'};color:#042F2E;border-radius:14px;padding:14px;text-align:center;font:400 24px Anton;transform:scale(${clic ? 1.06 : 1})">${clic ? '✓ CONTRATADO' : 'CONTRATAR'}</div></div>`, -2) +
      fig(barbeiro({ mood: clic ? 'feliz' : 'normal' }), 160, 620, 150);
  },
  pedido_chat: (p, d) => fundoNoite() + celular(130, 110, 280, `<div style="padding:12px;font-family:Montserrat">
      <div style="${pop(p, .3).replace('transform:scale', 'transform-origin:right;transform:scale')};background:#2563EB;color:#fff;border-radius:16px;padding:10px 12px;font:800 16px/1.2 Montserrat;margin:6px 0 10px 40px">Quero posts todo dia pra minha barbearia!</div>
      <div style="${pop(p, 1.6)};transform-origin:left;background:#0EA5A4;color:#fff;border-radius:16px;padding:10px 12px;font:800 16px/1.2 Montserrat;margin:0 40px 10px 0">Pode deixar! Começo hoje!</div>
      <div style="${pop(p, 2.8)};transform-origin:right;background:#2563EB;color:#fff;border-radius:16px;padding:10px 12px;font:800 16px/1.2 Montserrat;margin:6px 0 10px 80px">Fechado!</div></div>`, 0) +
      fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 5 }), 340, 640, 150) + fig(barbeiro({ mood: 'feliz' }), 30, 600, 160),
  posts_do_dia: (p, d) => {
    const it = [['Reels', '#EC4899'], ['Carrossel', '#6366F1'], ['Stories', '#F59E0B'], ['Foto', '#10B981']];
    return fundoNoite() + titulo('3 a 4 conteúdos\npor dia', '#FDE68A', 70, 52) +
      it.map(([t, c], i) => abs(`left:${40 + (i % 2) * 235}px;top:${250 + Math.floor(i / 2) * 230}px;width:225px;height:215px;${pop(p, .5 + i * .6)}`,
        `<div style="width:100%;height:100%;border-radius:22px;background:${c};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;box-shadow:0 10px 24px #0007"><div style="font-size:70px;line-height:1">✂</div><div style="font:400 38px Anton;text-transform:uppercase">${t}</div></div>`)).join('') +
      fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 5 }), 20, 700, 120) + fig(barbeiro({ mood: 'feliz' }), 380, 680, 120);
  },
  curtidas: (p, d) => {
    const n = Math.round(10 + ease(p / (d * .85)) * 22);
    return fundoNoite() + celular(150, 170, 240, `<div style="padding:10px"><div style="height:240px;border-radius:12px;background:linear-gradient(135deg,#60A5FA,#A78BFA);display:flex;align-items:center;justify-content:center;font-size:90px;color:#fff">✂</div>
      <div style="margin-top:10px;color:#fff;font:800 20px Montserrat"><span style="color:#F43F5E;font-size:28px;display:inline-block;transform:scale(${1 + .15 * Math.sin(p * 8)})">♥</span> ${n} curtidas</div></div>`, 0) +
      abs(`left:0;right:0;top:700px;text-align:center;font:400 130px/1 Anton;color:#F43F5E;text-shadow:0 5px 0 #000a`, '♥ ' + n) +
      titulo('Cada post, mais curtida', '#fff', 40, 36);
  },
  semanas: (p, d) => {
    const v = [83, 210, 540, 980, 1840], H = [40, 100, 190, 300, 420];
    return fundoEscuro() + titulo('Seguidores\npor semana', '#6EE7B7', 50, 50) +
      v.map((x, i) => { const k = ease((p - i * .7) / .8); return abs(`left:${36 + i * 98}px;top:${700 - H[i] * k}px;width:84px`,
        `<div style="text-align:center;font:400 22px Anton;color:#fff;opacity:${k}">${Math.round(x * k).toLocaleString('pt-BR')}</div><div style="height:${H[i] * k}px;border-radius:12px 12px 0 0;background:${CORES5[i]}"></div><div style="text-align:center;font:800 15px Montserrat;color:#fff;margin-top:6px">SEM ${i + 1}</div>`); }).join('');
  },
  viral: (p, d) => fundoNoite() + celular(150, 110, 240, `<div style="padding:10px"><div style="height:250px;border-radius:12px;background:linear-gradient(135deg,#F97316,#EC4899);display:flex;align-items:center;justify-content:center;font-size:90px;color:#fff">✂</div>
      <div style="margin-top:10px;color:#fff;font:400 42px Anton">${mil(2000 + ease(p / (d * .8)) * 46000)}</div><div style="color:#FDBA74;font:800 15px Montserrat">visualizações</div></div>`, 0) +
    chip('Viralizou!', 150, 70, 240, p, .3, '#F97316') +
    nota('Quanto custa o corte?', 10, 360, 170, p, 1.2) + nota('Tem horário sábado?', 360, 470, 170, p, 1.9) + nota('Quero agendar!', 10, 600, 160, p, 2.6),
  fila_clientes: (p, d) => fundoBarbearia() + fig(barbeiro({ mood: 'feliz', acao: Math.sin(p * 6) * 14 }), 170, 330, 200) +
    ['#2563EB', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#EF4444'].map((c, i) => cliente(14 + i * 86, 640, c, 1.1 * ease((p - i * .35) / .4))).join('') +
    titulo('Fila na porta', '#86EFAC', 80, 58) +
    abs(`left:60px;right:60px;top:560px;text-align:center;background:#10B981;color:#fff;border-radius:18px;padding:10px;font:400 30px Anton;${pop(p, 1)}`, 'AGENDA CHEIA'),
});
const CORES5 = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'];
// Final com a empresa (substitui o cta genérico)
CENAS.cta = (p, d) => fundoNoite() + titulo('Seu negócio também\nvive sem aparecer?', '#fff', 90, 48) +
  fig(kosta({ mood: 'feliz', bob: Math.sin(p * 3) * 6 }), 160, 220, 220) +
  abs(`left:0;right:0;top:600px;text-align:center;font:400 76px/1 Anton;color:#2DD4BF;${pop(p, .4)}`, 'CHAMA A <span style="color:#FBBF24">K</span>OSTA') +
  abs(`left:60px;right:60px;top:720px;text-align:center;background:#2DD4BF;color:#042F2E;border-radius:22px;padding:14px;font:400 32px Anton;${pop(p, 1)}`, 'COMENTA "KOSTA"');
