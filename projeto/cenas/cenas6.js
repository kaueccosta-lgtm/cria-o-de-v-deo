// v5: cenas-chave do roteiro final (cliente indica a Kosta).
const chatIA = `<div style="padding:6px;font:700 9px/1.2 Montserrat;color:#fff"><div style="background:#2563EB;border-radius:6px;padding:4px;margin-bottom:4px">Cria um post pra loja</div><div style="background:#374151;border-radius:6px;padding:4px">✦ Pronto! Aqui está…</div></div>`;
CENAS.gancho2 = (p, d) => {
  const sh = p > .6 && p < 1.1 ? Math.sin(p * 90) * 5 : 0;
  return fundoBarbearia() +
    abs(`left:0;right:0;top:100px;text-align:center;font:400 58px/1 Anton;color:#FDE047;text-shadow:0 6px 0 #000`, 'TODO MUNDO JÁ USA IA.') +
    abs(`left:0;right:0;top:170px;text-align:center;font:400 120px/1 Anton;color:#F87171;text-shadow:0 7px 0 #000;${pop(p, .5, .3)}`, `<div style="transform:translateX(${sh}px)">E VOCÊ?</div>`) +
    cadeira(40, 575, 1.55) + fig(clienteCapa({ corte: .3, bob: Math.sin(p * 2) * 1.5, giro: Math.sin(p * 2.2) * 4, oculos: true, cor: '#141414', pele: '#B77A53' }), 55, 430, 170) +
    celular(170, 590, 100, chatIA, -6) +
    fig(leo({ mood: 'surpreso', bob: Math.sin(p * 5) * 2, pisca: piscar(p), olhar: -4, e: [20, -30], d: [-20, -30] }), 250, 340, 200) + suor(p, 396, 360) +
    bolha('é… eu…', 330, 300, 120, p, 1.1);
};
META.gancho2 = { semLeg: true, cam: [1.03, 1.1, 0, 0, 0, 0] };

CENAS.site_resultados = (p, d) => {
  const R = [['BARBEARIA', 83, 1800], ['RESTAURANTE', 120, 2400], ['PET SHOP', 60, 1500]];
  const card = ([n, a, b], i) => { const k = ease((p - .6 - i * .7) / .9), v = Math.round(a + (b - a) * k);
    return `<div style="background:#fff;border-radius:14px;padding:10px 12px;margin-bottom:10px;opacity:${clamp((p - .4 - i * .7) / .3)}"><div style="font:500 10px GeistMono;color:#264466;letter-spacing:.08em">${n} · ANTES → DEPOIS</div>
      <div style="display:flex;align-items:baseline;gap:8px"><span style="font:900 34px Archivo;font-stretch:120%;color:#141414">${v.toLocaleString('pt-BR')}</span><span style="font:italic 400 18px InstrumentSerif;color:#264466">seguidores</span></div>
      <div style="height:6px;border-radius:3px;background:#14141414;margin-top:6px"><div style="width:${k * 100}%;height:100%;border-radius:3px;background:#264466"></div></div></div>`; };
  return luxClaro(p) + mono('[ resultados ]', 30, 112) + celular(100, 140, 340, `<div style="padding:14px;background:#EFEBE0;height:100%"><div style="font:900 30px/1 Archivo;font-stretch:125%;color:#141414;letter-spacing:-.03em;margin-bottom:12px">KOSTA</div>${R.map(card).join('')}</div>`, -2 + Math.sin(p * 1.5));
};
META.site_resultados = { tema: 'claro', wipe: INK, cam: [1, 1.05, 0, 0, 0, 0] };

CENAS.foto_base = (p, d) => {
  const s = 12 + ease((p - .6) / (d * .7)) * 76;
  const crua = `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#6B6B6B,#3A3A3A);overflow:hidden"><svg style="position:absolute;left:70px;top:150px;transform:rotate(8deg)" width="160" height="190" viewBox="0 0 120 130"><rect x="20" y="0" width="80" height="60" rx="20" fill="#7A2A22"/><rect x="8" y="52" width="104" height="34" rx="14" fill="#7A2A22"/><rect x="54" y="86" width="12" height="30" fill="#999"/><ellipse cx="60" cy="122" rx="36" ry="8" fill="#777"/></svg><div style="position:absolute;left:12px;bottom:12px;background:#000a;color:#fff;border-radius:999px;padding:5px 10px;font:500 11px GeistMono">FOTO BASE</div></div>`;
  return luxEscuro(p) + mono('[ foto base → post pronto ]', 30, 112, '#9DB8DB') +
    abs('left:90px;top:170px;width:300px;height:375px;transform:scale(1.2);transform-origin:top left;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px #000b', `<div style="position:absolute;inset:0">${posterBase({ frame: 1, logo: 1, head: 1, preco: 1, btn: 1 })}</div><div style="position:absolute;inset:0;clip-path:inset(0 ${100 - s}% 0 0)">${crua}</div><div style="position:absolute;left:${s}%;top:0;bottom:0;width:3px;background:#fff"></div><div style="position:absolute;right:12px;bottom:12px;background:#C9A227;color:#141414;border-radius:999px;padding:5px 10px;font:900 11px Archivo">POST PRONTO</div>`) +
    abs(`left:0;right:0;top:680px;text-align:center;${pop(p, 1)}`, serif('mesma identidade, em todas as peças.', 34, '#EFEBE0'));
};
META.foto_base = { tema: 'lux', wipe: CREME, cam: [1, 1.04, 0, 0, 0, 0] };

CENAS.perfil_cresce = (p, d) => {
  const steps = [[0, 83, 'SEMANA 1', ''], [1.2, 93, 'SEMANA 2', '+10'], [2.4, 123, 'SEMANA 3', '+30']];
  const cur = steps.filter(s => p >= s[0]).pop(), seg = Math.round(cur[1]);
  return fundoNoite() + celular(170, 130, 240, perfilInsta('@barbearia_leo', Math.min(9, 3 + Math.floor(p * 1.5)), seg, 170), Math.sin(p * 1.5)) +
    steps.map(([t0, , lab, plus], i) => abs(`left:20px;top:${180 + i * 90}px;${pop(p, t0, .3)}`, `<div style="background:#EFEBE0;color:#141414;border-radius:12px;padding:8px 12px;font:500 12px GeistMono;letter-spacing:.06em">${lab}<div style="font:900 24px Archivo;font-stretch:120%;color:#264466">${plus || '83'}</div></div>`)).join('') +
    [...Array(8)].map((_, i) => { const ph = (p * 90 + i * 60) % 400; return abs(`left:${180 + (i * 47) % 220}px;top:${720 - ph}px;font-size:${20 + i % 3 * 7}px;color:#F43F5E;opacity:${clamp(1 - ph / 400)}`, '♥'); }).join('') +
    nota('que corte!', 330, 450, 120, p, 1.6) + nota('onde fica?', 20, 520, 120, p, 2.6) +
    fig(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(4 + 18 * Math.abs(Math.sin(p * 15))), d: [-6, 4] }), 330, 600, 150);
};
META.perfil_cresce = { cam: [1, 1.05, 0, 0, 0, 0] };

CENAS.dono_volta = (p, d) => fundoBarbearia() + cadeira(40, 575, 1.55) +
  fig(clienteCapa({ corte: .2, bob: Math.sin(p * 2) * 1.5, mood: 'feliz', oculos: true, cor: '#141414', pele: '#B77A53' }), 55, 430, 170) +
  fig(leo({ mood: 'falando', t: p, bob: Math.sin(p * 4) * 2, pisca: piscar(p), olhar: -3, e: [40 + 25 * Math.sin(p * 4), -50], d: [-30 - 20 * Math.sin(p * 4 + 1), -50] }), 250, 340, 200) +
  [['+1.000 seguidores', 30, 250, .5], ['agenda cheia', 270, 215, 1.4], ['+ clientes', 290, 300, 2.3]].map(([t, x, y, t0]) => chip(t, x, y, 220, p, t0, '#10B981')).join('') +
  [0, 1, 2].map(i => abs(`left:${300 + i * 70}px;top:${700 + (i % 2) * 8}px;width:60px;opacity:.9`, clienteAndando({ cor: ['#2563EB', '#F59E0B', '#EC4899'][i], mood: 'feliz', bob: Math.sin(p * 2 + i) * 1.5 }))).join('') +
  abs('left:0;right:0;top:104px;text-align:center;font:400 46px Anton;color:#fff;text-shadow:0 5px 0 #000', '1 MÊS DEPOIS');
META.dono_volta = { cam: [1, 1.08, 0, 0, 0, 0] };

CENAS.cta2 = (p, d) => fundoBarbearia() + cadeira(40, 445, 1.2) + fig(clienteCapa({ corte: .8, mood: 'feliz', bob: Math.sin(p * 2) * 1.5 }), 55, 330, 140) +
  fig(leo({ mood: 'feliz', bob: Math.sin(p * 3) * 2, e: [96 + 7 * Math.sin(p * 5), 8 * Math.sin(p * 9)], extE: tesouraSvg(4 + 18 * Math.abs(Math.sin(p * 15))), d: [-6, 4] }), 240, 250, 170) +
  abs(`left:30px;right:30px;top:620px;${pop(p, .3, .5)}`, `<div style="background:#141414;border-radius:24px;padding:22px 18px;text-align:center;box-shadow:0 20px 50px #000a"><div style="font:900 78px/1 Archivo;font-stretch:125%;color:#EFEBE0;letter-spacing:-.03em">KOSTA</div>
    <div style="font:italic 400 28px InstrumentSerif;color:#9DB8DB;margin:6px 0 14px">conteúdo assim, e muito mais.</div><div style="background:#EFEBE0;color:#141414;border-radius:999px;padding:14px;font:900 24px Archivo;font-stretch:118%">COMENTA “KOSTA”</div></div>`);
META.cta2 = { semLeg: true, cam: [1, 1.05, 0, 0, 0, 0] };
