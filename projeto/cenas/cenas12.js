// "Os 40 anos do Seu Aurélio": história fictícia, emocional, com personagens de personalidade.
const aurelio = (o = {}) => pessoa({ pele: '#C28A5C', cabelo: '#D8D8DC', barba: true, oculos: true, camisa: '#F3F4F6', avental: '#7C2D12', calca: '#3B3B44', ...o });
const marta = (o = {}) => pessoa({ pele: '#D9A06F', cabelo: '#E9E9EE', barba: false, oculos: true, camisa: '#7C3AED', avental: null, calca: '#5B2A9E', coque: true, ...o });
const nomeTag = (txt, x, y, p, t0) => abs(`left:${x}px;top:${y}px;${pop(p, t0)}`, `<div style="background:#EFEBE0;color:#141414;font:500 12px GeistMono;border-radius:999px;padding:5px 11px;letter-spacing:.08em;box-shadow:0 6px 14px #0006">${txt}</div>`);
const notas = (x, y, p) => [0, 1, 2].map(i => { const ph = (p * 50 + i * 45) % 140; return abs(`left:${x + Math.sin(p * 3 + i) * 14 + i * 12}px;top:${y - ph}px;font-size:22px;color:#FDE68A;opacity:${clamp(1 - ph / 140)}`, '♪'); }).join('');
const aurCorta = (p, o = {}, x = 250, w = 200, ex = '') => figR(aurelio({ mood: 'normal', bob: Math.sin(p * 3) * 2, olhar: -3, pisca: piscar(p), ...cortaPose(p), d: [-6 + 3 * Math.sin(p * 2), 4], ...o }), x, 340, w, ex);
const escuro = (o = .55, cor = '#0A1030') => abs(`left:-700px;right:-700px;top:-300px;bottom:-300px;background:${cor};opacity:${o}`, '');
const janelaRua = (p, noite = false) => abs('left:300px;top:130px;width:220px;height:200px;border:8px solid #2B1B14;border-radius:8px;overflow:hidden;box-shadow:inset 0 0 30px #0006',
  `<div style="position:absolute;inset:0;background:${noite ? 'linear-gradient(#0B1030,#2A2F5E)' : 'linear-gradient(#9CC8F0,#F4E3C1)'}"></div>` +
  [0, 1, 2].map(i => { const x = ((p * 38 + i * 95) % 320) - 70; return abs(`left:${x}px;top:62px;width:58px`, clienteAndando({ cor: ['#2563EB', '#F59E0B', '#10B981'][i], perna: Math.sin(p * 8 + i) * 22, bob: Math.abs(Math.sin(p * 8 + i)) * -3, mood: 'normal' })); }).join('') +
  `<div style="position:absolute;inset:0;background:linear-gradient(115deg,#fff0 40%,#fff3 50%,#fff0 60%)"></div>`);
const placa = p => abs(`left:312px;top:98px;font:400 17px Anton;color:#FBBF24;letter-spacing:.08em;opacity:${.85 + .15 * Math.sin(p * 9)};text-shadow:0 0 10px #FBBF2488`, 'BARBEARIA AURÉLIO');
const BASE = (p, noite = false) => SET(p) + janelaRua(p, noite) + placa(p);

CENAS.st_gancho = (p, d) => camR(BASE(p) + cliSent(p, { mood: 'normal' }) + aurCorta(p) + notas(390, 430, p), planos(p, [[1.8, 2.0, 180, 20], [Infinity, 1.0, 0, 0]])) + vinheta + abs('left:0;right:0;top:0;height:340px;background:linear-gradient(#000b,#0000)', '') +
  abs('left:0;right:0;top:100px;text-align:center;font:400 104px/1 Anton;color:#FDE047;text-shadow:0 6px 0 #000', '40 ANOS.') +
  abs(`left:0;right:0;top:215px;text-align:center;font:400 44px/1.02 Anton;color:#fff;text-shadow:0 5px 0 #000;${pop(p, .5, .25)}`, 'NINGUÉM SABIA O<br>NOME DELE.');
META.st_gancho = { semLeg: true, cam: [1, 1, 0, 0, 0, 0] };

CENAS.st_aurelio = (p, d) => camR(BASE(p) + cliSent(p, { mood: 'normal' }) + aurCorta(p) + notas(390, 430, p) +
  celular(262, 598, 48, '', 20) + abs('left:236px;top:560px;font:500 10px GeistMono;color:#9CA3AF;letter-spacing:.08em', 'mudo'), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
  nomeTag('SEU AURÉLIO', 250, 300, p, .3) + bolha('Celular é coisa de quem não tem o que fazer.', 20, 160, 270, p, 3.6);
META.st_aurelio = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.st_leo = (p, d) => camR(BASE(p) + cliSent(p, { mood: 'normal', cor: '#64748B' }) +
  figR(leo({ mood: 'falando', t: p, bob: Math.sin(p * 4) * 2, pisca: piscar(p), d: [-70, -70 + 6 * Math.sin(p * 6)], extD: celularMao, e: [30 + 25 * Math.sin(p * 4), -30] }), 215, 340, 200, sqS(sqz(p, .3, .1))) +
  figR(aurelio({ mood: 'normal', olhar: Math.sin(p * 1.5) * 4, pisca: piscar(p + 1), bob: Math.sin(p * 3) * 2 }), 400, 400, 130), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
  nomeTag('LÉO', 290, 300, p, .3) + chip('✦ me dá uma ideia', 20, 230, 200, p, 1.6, '#7C3AED') + chip('✦ resumo disso aqui', 300, 200, 210, p, 2.5, '#2563EB') + chip('✦ e se eu…', 20, 300, 160, p, 3.3, '#DB2777');
META.st_leo = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.st_noticia = (p, d) => camR(BASE(p) + cliSent(p, { mood: 'normal' }) + escuro(.18) +
  figR(leo({ mood: 'triste', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 3 }), 215, 400, 170) + figR(aurelio({ mood: 'triste', olhar: 4, pisca: piscar(p + 1), bob: Math.sin(p * 2) * 2, e: [4, 0], d: [-4, 0] }), 380, 400, 150), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
  abs(`left:100px;top:130px;width:340px;transform:rotate(${-3 + Math.sin(p * 2) * 1}deg);${pop(p, .8, .35)}`, `<div style="background:#F5F0E1;border-radius:6px;padding:20px 18px;box-shadow:0 18px 40px #000b;font-family:Montserrat"><div style="font:900 13px GeistMono;color:#B91C1C;letter-spacing:.14em">AVISO</div><div style="font:900 26px/1.05 Archivo;font-stretch:112%;color:#141414;margin:6px 0">Reajuste de aluguel</div><div style="font:800 40px Anton;color:#B91C1C">+100%</div><div style="font:500 12px GeistMono;color:#555;margin-top:6px">a partir do próximo mês</div></div>`);
META.st_noticia = { cam: [1, 1.04, 0, 0, 0, 0] };

CENAS.st_marta = (p, d) => { const x = Math.max(370, 600 - p * 160), anda = x > 370;
  return camR(BASE(p) + cliSent(p, { mood: 'normal' }) +
    figR(aurelio({ mood: 'normal', olhar: 4, pisca: piscar(p), bob: Math.sin(p * 3) * 2, e: [40 * (p > 3 ? Math.min(1, (p - 3) / .3) : 0) + 6, -20 * (p > 3 ? 1 : 0)], d: [-40 * (p > 3 ? Math.min(1, (p - 3) / .3) : 0) - 6, -20 * (p > 3 ? 1 : 0)] }), 205, 340, 180, sqS(sqz(p, 3.0, .08))) +
    figR(marta({ mood: p > 1.9 ? 'falando' : 'normal', t: p, perna: anda ? Math.sin(p * 11) * 22 : 0, bob: anda ? Math.abs(Math.sin(p * 11)) * -3 : Math.sin(p * 3) * 2, pisca: piscar(p + 2), d: [-6 - (p > 1.9 ? 30 * Math.abs(Math.sin(p * 5)) : 0), 0] }), x, 360, 150), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    (p > 1.9 ? nomeTag('DONA MARTA', 330, 290, p, 1.9) : '') + (p > 2.1 ? bolha('O bairro precisa saber!', 280, 200, 230, p, 2.1, '#F5D0FE', '#3B0764') : '') + (p > 3.1 ? bolha('…', 130, 250, 80, p, 3.1) : ''); };
META.st_marta = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.st_ia_noite = (p, d) => camR(BASE(p, true) + escuro(.62) + cliSent(p, { mood: 'normal' }) + figR(leo({ mood: p > 3.4 ? 'triste' : 'normal', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: 3 }), 20, 560, 170), planos(p, [[Infinity, 1.0, 0, 0]])) +
  celular(150, 110, 250, `<div style="padding:12px;color:#fff;font-family:Montserrat"><div style="display:flex;gap:6px;align-items:center;margin-bottom:10px;font:800 13px Montserrat"><span style="color:#A78BFA;font-size:18px">✦</span> Assistente de IA</div>
    <div style="background:#2563EB;border-radius:12px;padding:8px 10px;font:700 12px/1.3 Montserrat;margin:0 0 8px 40px;${pop(p, .5)}">Escreve uma despedida pra barbearia do Seu Aurélio</div>
    ${p > 1.6 ? `<div style="background:#374151;border-radius:12px;padding:10px;font:700 12px/1.35 Montserrat;${pop(p, 1.6)}">Com imensa gratidão, celebramos 40 anos de tradição, qualidade e excelência. Obrigado por fazer parte da nossa história. ✨</div>` : ''}</div>`, 0) +
  vinheta + (p > 3.4 ? chip('bonito. e vazio.', 150, 640, 240, p, 3.4, '#DC2626') : '');
META.st_ia_noite = { cam: [1, 1.03, 0, 0, 0, 0] };

CENAS.st_rejeita = (p, d) => camR(BASE(p) + cliSent(p, { mood: 'normal' }) +
  figR(aurelio({ mood: 'normal', olhar: Math.sin(p * 6) * 5, pisca: piscar(p), bob: Math.sin(p * 3) * 2, d: [-100, -10], extD: celularMao }), 235, 340, 200) +
  figR(leo({ mood: 'triste', bob: Math.sin(p * 3) * 2, pisca: piscar(p + 1), olhar: 3 }), 20, 400, 150), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
  bolha('Isso podia ser de qualquer barbearia.', 20, 170, 250, p, 1.2) + (p > 3.3 ? bolha('Essa não é a minha.', 280, 250, 220, p, 3.3, '#FDE68A', '#451A03') : '');
META.st_rejeita = { cam: [1, 1.03, 0, 0, 0, 0] };

const polaroid = (txt, icon, x, y, rot, p, t0) => abs(`left:${x}px;top:${y}px;width:150px;${pop(p, t0, .4)};transform-origin:center`, `<div style="background:#FBF7EC;padding:8px 8px 12px;box-shadow:0 12px 24px #0008;transform:rotate(${rot}deg)"><div style="height:104px;background:linear-gradient(135deg,#C9A96E,#8C6B3A);display:flex;align-items:center;justify-content:center;font-size:54px;color:#FBF7EC">${icon}</div><div style="font:italic 400 17px/1.1 InstrumentSerif;color:#3B2A1C;text-align:center;margin-top:8px">${txt}</div></div>`);
CENAS.st_escuta = (p, d) => abs('left:0;top:0;width:540px;height:960px;filter:sepia(.9) saturate(1.15) contrast(1.05)', camR(BASE(p) + cliSent(p, { mood: 'normal' }) +
  figR(aurelio({ mood: 'falando', t: p, bob: Math.sin(p * 3) * 2, pisca: piscar(p), e: [40 + 25 * Math.sin(p * 3), -40], d: [-30 - 20 * Math.sin(p * 3 + 1), -40] }), 270, 360, 190) +
  figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p + 1), olhar: 4, d: [-70, -60], extD: celularMao }), 80, 380, 170), planos(p, [[Infinity, 1.0, 0, 0]]))) + vinheta +
  polaroid('o primeiro cliente', '✂', 20, 130, -6, p, 1.3) + polaroid('o casamento da Lúcia', '♥', 195, 110, 4, p, 3.9) + polaroid('a cadeira vermelha', '▆', 365, 140, -3, p, 6.5) +
  abs(`left:150px;top:600px;font:800 12px Montserrat;color:#EF4444;letter-spacing:.08em;opacity:${.6 + .4 * Math.abs(Math.sin(p * 3))}`, '● REC');
META.st_escuta = { cam: [1, 1, 0, 0, 0, 0] };

function posterAurelio(o = {}) { const { gen = 1 } = o;
  return `<div style="position:relative;width:300px;height:375px;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px #000b;background:radial-gradient(circle at 50% 42%,#E9D9B8,#9C7A4E 70%,#3A2A1A);filter:blur(${(1 - gen) * 22}px);opacity:${.35 + .65 * gen};transform:scale(${1.08 - .08 * gen})">
    <div style="position:absolute;left:0;right:0;top:20px;text-align:center;font:500 11px GeistMono;color:#2B1B10;letter-spacing:.16em">BARBEARIA AURÉLIO · DESDE 1984</div>
    <svg style="position:absolute;left:78px;top:112px" width="144" height="170" viewBox="0 0 120 130"><rect x="20" y="0" width="80" height="60" rx="20" fill="url(#gCouro)"/><rect x="8" y="52" width="104" height="34" rx="14" fill="url(#gCouro)"/><rect x="54" y="86" width="12" height="30" fill="url(#gCromo)"/><ellipse cx="60" cy="122" rx="36" ry="8" fill="url(#gCromo)"/></svg>
    <div style="position:absolute;left:0;right:0;bottom:62px;text-align:center;font:italic 400 34px/1 InstrumentSerif;color:#2B1B10">quarenta anos,<br>um bairro, um nome.</div>
    <div style="position:absolute;left:0;right:0;bottom:22px;text-align:center;font:900 12px Archivo;font-stretch:115%;color:#2B1B10;letter-spacing:.06em">Obrigado por cada história.</div></div>`; }
CENAS.st_direcao = (p, d) => { const txt = 'Seu Aurélio. 40 anos. Assobia samba. Comprou a cadeira vermelha fiado. Chamava o bairro pelo nome.', n = Math.floor(clamp(p / (d * .45)) * txt.length), gen = ease((p - d * .55) / (d * .35));
  return camR(BASE(p) + escuro(.55, '#1A0F08') + cliSent(p, { mood: 'normal' }), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    abs('left:24px;right:24px;top:120px', `<div style="background:#1E1812ee;border:1px solid #EFEBE033;border-radius:14px;padding:12px 14px"><div style="font:500 10px GeistMono;color:#D9B77A;letter-spacing:.1em;margin-bottom:5px">O QUE O LÉO ESCUTOU → PROMPT</div><div style="font:500 14px/1.35 GeistMono;color:#EFEBE0;min-height:60px">${txt.slice(0, n)}<span style="opacity:${Math.sin(p * 9) > 0 ? 1 : 0}">▍</span></div></div>`) +
    (p > d * .5 ? abs('left:120px;top:300px', posterAurelio({ gen })) : abs('left:120px;top:300px;width:300px;height:375px;border:1px dashed #EFEBE055;border-radius:14px', '')) +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 4) * 2, pisca: piscar(p), olhar: 4, d: [-70, -50] }), 10, 620, 120) + figR(aurelio({ mood: p > d * .7 ? 'surpreso' : 'normal', olhar: -4, pisca: piscar(p + 1), bob: Math.sin(p * 3) * 2 }), 410, 620, 120); };
META.st_direcao = { cam: [1, 1.02, 0, 0, 0, 0] };

CENAS.st_noite_post = (p, d) => { const ns = [['♥ 128', 60, 360, 1.0], ['“eu cresci nessa cadeira!”', 270, 300, 1.8], ['♥ 540', 40, 270, 2.6], ['“meu avô cortava aqui”', 250, 400, 3.3]];
  return camR(BASE(p, true) + escuro(.66) + abs('left:-40px;top:555px;width:600px;height:20px;background:linear-gradient(#5E3F27,#2B1B10);box-shadow:0 8px 14px #000a', '') +
    celular(60 + ((p % .6) < .2 ? Math.sin(p * 120) * 3 : 0), 460, 100, `<div style="height:100%;background:linear-gradient(#10B981,#0EA5A4);display:flex;align-items:center;justify-content:center;font:900 26px Archivo;color:#fff">♥ ${Math.round(clamp((p - .6) / 3.4) * 540)}</div>`, 4) +
    figR(aurelio({ mood: 'normal', olhar: -4, pisca: piscar(p), bob: Math.sin(p * 2) * 2, e: [0, 0], d: [-100 * Math.min(1, p / 1.2), -10] }), 340, 360, 170), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    ns.map(([t, x, y, t0]) => nota(t, x, y, 200, p, t0, '#F5F0E1', '#141414')).join(''); };
META.st_noite_post = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.st_fila = (p, d) => { const cores = ['#2563EB', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#EF4444', '#0EA5A4', '#F97316'];
  const fila = cores.map((c, i) => { const alvo = 200 + i * 40 - (i > 3 ? 0 : 0), x = Math.max(alvo, 600 + i * 70 - p * 120), anda = x > alvo, grande = i % 3 !== 1, w = grande ? 78 : 56;
    return figR(clienteAndando({ cor: c, perna: anda ? Math.sin(p * 11 + i) * 24 : 0, bob: anda ? Math.abs(Math.sin(p * 11 + i)) * -4 : Math.sin(p * 2 + i) * 1.5, mood: 'feliz' }), x, 700 - (grande ? 0 : -26) - w * .1, w); }).join('');
  return abs('inset:0;background:linear-gradient(#FDE68A,#BFE3FF 60%)', '') + abs('left:20px;top:260px;width:500px;height:480px;background:#7C5A3C;border-radius:10px 10px 0 0', '') +
    abs('left:60px;top:430px;width:170px;height:170px;background:#FDE68A;border:8px solid #2B1B10;border-radius:8px', '') + abs('left:300px;top:440px;width:130px;height:300px;background:#8B5E3C;border:8px solid #2B1B10;border-radius:65px 65px 0 0', '') +
    abs('left:10px;top:380px;width:520px;height:50px;background:repeating-linear-gradient(90deg,#DC2626 0 40px,#fff 40px 80px)', '') +
    abs('left:110px;top:300px;width:320px;background:#141414;border:5px solid #FBBF24;border-radius:8px;text-align:center;font:400 34px/1.1 Anton;color:#FBBF24;padding:8px', 'BARBEARIA AURÉLIO') +
    abs(`left:40px;top:${190 + Math.sin(p * 2) * 3}px;width:460px;transform:rotate(${Math.sin(p * 1.5) * 1.5}deg);background:#F5F0E1;border-radius:8px;text-align:center;font:italic 400 36px/1.2 InstrumentSerif;color:#7C2D12;padding:10px;box-shadow:0 10px 20px #0005;${pop(p, 1.2, .4)}`, 'Obrigado, Aurélio') +
    abs('left:0;right:0;top:740px;bottom:0;background:#8E8A82', '') + fila +
    figR(marta({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), d: [-60, -80] }), 340, 560, 130) +
    abs(`left:350px;top:560px;width:60px;${pop(p, 2.4, .3)}`, `<div style="height:34px;border-radius:6px;background:linear-gradient(#FCE7F3,#F9A8D4)"></div><div style="width:6px;height:16px;background:#FBBF24;margin:-48px auto 0;border-radius:3px;box-shadow:0 -6px 8px #FDE04788"></div>`) + vinheta; };
META.st_fila = { cam: [1, 1.05, 0, 0, 0, 0] };

CENAS.st_emocao = (p, d) => { const sh = planos(p, [[3.0, 1.9, 0, 114], [Infinity, 1.0, 0, 0]]), lag = [0, 1].map(i => { const ph = ((p * .9) + i * .5) % 1; return abs(`left:${252 + i * 34}px;top:${430 + ph * 46}px;width:7px;height:11px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#7DD3FC;opacity:${clamp(1 - ph) * .9}`, ''); }).join('');
  const cori = ['AU-RÉ-LIO!', 'AU-RÉ-LIO!', 'AU-RÉ-LIO!'].map((t, i) => chip(t, 20 + i * 150, 140 + (i % 2) * 70, 150, p, 3.4 + i * .4, ['#F59E0B', '#EC4899', '#10B981'][i])).join('');
  return camR(BASE(p) + escuro(.12, '#FDE68A') + figR(aurelio({ mood: 'feliz', bob: Math.sin(p * 2) * 2, olhar: 0, pisca: p > 1.2 ? .0 : piscar(p), e: [6, 0], d: [-6, 0] }), 170, 340, 200) + lag +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 5) * 2, e: [30, -60 - 15 * Math.sin(p * 9)], d: [-30, -60 - 15 * Math.sin(p * 9 + 1)] }), 10, 420, 130) + figR(marta({ mood: 'feliz', bob: Math.sin(p * 5 + 1) * 2, e: [30, -60 - 15 * Math.sin(p * 9 + 2)], d: [-30, -60 - 15 * Math.sin(p * 9 + 3)] }), 400, 420, 130), sh) + vinheta + cori +
    [...Array(9)].map((_, i) => { const ph = (p * 70 + i * 55) % 420; return abs(`left:${30 + (i * 57) % 470}px;top:${760 - ph}px;font-size:${20 + i % 3 * 8}px;color:#F43F5E;opacity:${clamp(1 - ph / 420) * (p > 3 ? 1 : 0)}`, '♥'); }).join(''); };
META.st_emocao = { cam: [1, 1, 0, 0, 0, 0] };

CENAS.st_fecho = (p, d) => { const sofa = abs('left:335px;top:705px;width:195px;height:62px;border-radius:14px 14px 6px 6px;background:linear-gradient(#9A3B22,#5A1F10);box-shadow:0 10px 16px #0007', '');
  return camR(BASE(p) + cliSent(p, { mood: 'feliz' }) + aurCorta(p, { mood: 'feliz' }, 215, 190) +
    [0, 1, 2].map(i => figR(clienteAndando({ cor: ['#2563EB', '#F59E0B', '#EC4899'][i], mood: 'feliz', bob: Math.sin(p * 2 + i) * 1.5 }), 348 + i * 52, 600, 66)).join('') + sofa +
    figR(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, pisca: piscar(p), olhar: -3 }), 395, 470, 100), planos(p, [[Infinity, 1.0, 0, 0]])) + vinheta +
    abs('left:0;right:0;top:0;height:360px;background:linear-gradient(#000c,#0000)', '') + abs(`left:20px;right:20px;top:110px;text-align:center;font:italic 400 34px/1.1 InstrumentSerif;color:#fff;text-shadow:0 3px 12px #000c;${pop(p, 1.0, .5)}`, 'A IA escreveu o post<br>em dois minutos.') +
    (p > 3.3 ? abs(`left:20px;right:20px;top:230px;text-align:center;font:900 36px/1.05 Archivo;font-stretch:115%;color:#FDE047;text-shadow:0 4px 12px #000d;${pop(p, 3.3, .5)}`, 'A história levou<br>quarenta anos.') : '') +
    (p > 6.0 ? abs(`left:0;right:0;top:700px;text-align:center;font:500 13px GeistMono;color:#EFEBE0;letter-spacing:.1em;opacity:${ease((p - 6) / .8)}`, '@kostaai · história fictícia') : ''); };
META.st_fecho = { cam: [1, 1.05, 0, 0, 0, 0] };
