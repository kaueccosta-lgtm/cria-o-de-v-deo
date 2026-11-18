// Rig 2D com braços articulados, pernas que andam, piscar e olhar. Todos recebem parâmetros animáveis por quadro.
// pessoa({mood,bob,olhar,pisca,e:[a1,a2],d:[a1,a2],extE,extD,perna,...})   ângulos em graus.
const tesouraSvg = ab => `<g transform="translate(0 56)"><rect x="-3" y="0" width="6" height="44" rx="3" fill="#E5E7EB" stroke="#6B7280" stroke-width="1.5" transform="rotate(${-ab})"/>
  <rect x="-3" y="0" width="6" height="44" rx="3" fill="#D1D5DB" stroke="#6B7280" stroke-width="1.5" transform="rotate(${ab})"/>
  <circle cx="-7" cy="-4" r="7" fill="none" stroke="#DC2626" stroke-width="4"/><circle cx="7" cy="-4" r="7" fill="none" stroke="#DC2626" stroke-width="4"/></g>`;
const celularMao = `<g transform="translate(0 52)"><rect x="-16" y="-8" width="32" height="56" rx="7" fill="#0B0F1A" stroke="#E5E7EB" stroke-width="3"/><rect x="-12" y="-2" width="24" height="40" rx="3" fill="#60A5FA"/></g>`;
const bracoSvg = (px, py, a1, a2, cor, pele, ext = '') =>
  `<g transform="translate(${px} ${py}) rotate(${a1})"><rect x="-13" y="-8" width="26" height="60" rx="13" fill="${cor}"/>
   <g transform="translate(0 48) rotate(${a2})"><rect x="-12" y="-6" width="24" height="54" rx="12" fill="${cor}"/>${ext}<circle cx="0" cy="52" r="13" fill="${pele}"/></g></g>`;

function pessoa(o = {}) {
  const { mood = 'normal', bob = 0, olhar = 0, pisca = 0, perna = 0, e = [6, 0], d = [-6, 0], extE = '', extD = '',
    pele = '#E2A878', cabelo = '#2A1F1C', barba = true, oculos = false, camisa = '#F3F4F6', avental = '#1E3A8A', terno = false, calca = '#27324A', gravata = '#7a9bc3' } = o;
  const skin2 = '#C98F5E';
  const brows = mood === 'triste' ? `<path d="M82 74 L100 68 M138 74 L120 68" stroke="${cabelo}" stroke-width="6" stroke-linecap="round"/>`
    : mood === 'surpreso' ? `<path d="M82 62 Q92 54 102 62 M118 62 Q128 54 138 62" stroke="${cabelo}" stroke-width="6" fill="none" stroke-linecap="round"/>`
    : `<path d="M82 68 L100 66 M120 66 L138 68" stroke="${cabelo}" stroke-width="6" stroke-linecap="round"/>`;
  const boca = mood === 'triste' ? `<path d="M92 118 Q110 106 128 118" stroke="#5B2B22" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : mood === 'feliz' ? `<path d="M88 108 Q110 134 132 108 Z" fill="#fff" stroke="#5B2B22" stroke-width="4" stroke-linejoin="round"/>`
    : mood === 'surpreso' ? `<ellipse cx="110" cy="116" rx="9" ry="12" fill="#5B2B22"/>`
    : mood === 'falando' ? `<ellipse cx="110" cy="114" rx="10" ry="${5 + 5 * Math.abs(Math.sin((o.t || 0) * 14))}" fill="#5B2B22"/>`
    : `<path d="M96 112 Q110 120 124 112" stroke="#5B2B22" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const ey = 5.5 * (1 - pisca) + .6;
  const corpo = terno
    ? `<rect x="60" y="150" width="100" height="130" rx="34" fill="${camisa}"/><path d="M60 180 Q60 150 90 150 L110 200 L130 150 Q160 150 160 180 L160 270 Q160 282 148 282 H72 Q60 282 60 270Z" fill="${calca}"/><path d="M98 150 L110 200 L122 150Z" fill="#F9FAFB"/><path d="M107 160 L113 160 L116 215 L110 226 L104 215Z" fill="${gravata}"/>`
    : `<rect x="60" y="150" width="100" height="130" rx="34" fill="${camisa}"/>${avental ? `<path d="M74 168 H146 V268 Q146 282 132 282 H88 Q74 282 74 268 Z" fill="${avental}"/><rect x="96" y="196" width="28" height="22" rx="6" fill="#1D4ED8"/>` : ''}`;
  const manga = terno ? calca : camisa;
  return `<svg viewBox="0 0 220 400" xmlns="http://www.w3.org/2000/svg" overflow="visible"><g transform="translate(0 ${bob})">
  <g transform="rotate(${perna} 91 272)"><rect x="78" y="272" width="26" height="92" rx="10" fill="${calca}"/><ellipse cx="88" cy="368" rx="22" ry="11" fill="#111827"/></g>
  <g transform="rotate(${-perna} 129 272)"><rect x="116" y="272" width="26" height="92" rx="10" fill="${calca}"/><ellipse cx="130" cy="368" rx="22" ry="11" fill="#111827"/></g>
  ${bracoSvg(70, 172, e[0], e[1], manga, pele, extE)}${corpo}${bracoSvg(150, 172, d[0], d[1], manga, pele, extD)}
  <rect x="96" y="128" width="28" height="30" rx="10" fill="${skin2}"/>
  <circle cx="62" cy="92" r="9" fill="${pele}"/><circle cx="158" cy="92" r="9" fill="${pele}"/><circle cx="110" cy="88" r="52" fill="${pele}"/>
  <path d="M60 86 Q58 36 110 34 Q162 36 160 86 Q150 60 110 58 Q70 60 60 86 Z" fill="${cabelo}"/>
  ${barba ? `<path d="M66 100 Q70 146 110 148 Q150 146 154 100 Q148 126 110 126 Q72 126 66 100 Z" fill="${cabelo}"/>` : ''}
  <ellipse cx="${92 + olhar}" cy="88" rx="5.5" ry="${ey}" fill="#1F1512"/><ellipse cx="${128 + olhar}" cy="88" rx="5.5" ry="${ey}" fill="#1F1512"/>
  ${oculos ? `<circle cx="92" cy="88" r="14" fill="#ffffff22" stroke="#141414" stroke-width="4"/><circle cx="128" cy="88" r="14" fill="#ffffff22" stroke="#141414" stroke-width="4"/><path d="M106 88 H114" stroke="#141414" stroke-width="4"/>` : ''}
  ${brows}${boca}</g></svg>`;
}
const piscar = t => { const k = (t % 3.2); return k > 3.05 ? Math.sin((k - 3.05) / .15 * Math.PI) : 0; };
// Léo (barbeiro) e o dono da Kosta (terno escuro, óculos)
const leo = (o = {}) => pessoa({ t: 0, ...o });
const dono = (o = {}) => pessoa({ pele: '#B77A53', cabelo: '#141414', barba: false, oculos: true, terno: true, camisa: '#F9FAFB', calca: '#1B1B1F', avental: null, ...o });

// Cliente sentado com capa, de frente. corte 0..1 = quanto do cabelo já foi cortado.
function clienteCapa({ oculos = false, cor = '#64748B', pele = '#D9A06F', cabelo = '#3B2A22', corte = 0, mood = 'normal', bob = 0, giro = 0 } = {}) {
  const alt = 20 - corte * 10;
  return `<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" overflow="visible"><g transform="translate(0 ${bob})">
  <path d="M30 100 Q80 86 130 100 L150 196 H10Z" fill="${cor}"/><path d="M30 100 Q80 86 130 100 L124 120 Q80 108 36 120Z" fill="#fff" opacity=".18"/>
  <g transform="rotate(${giro} 80 70)"><circle cx="80" cy="62" r="40" fill="${pele}"/><circle cx="40" cy="64" r="8" fill="${pele}"/><circle cx="120" cy="64" r="8" fill="${pele}"/>
  <path d="M40 58 Q40 ${14 - 0} 80 ${14 + (1 - corte) * 0} Q120 ${14} 120 58 Q112 ${34 + corte * 6} 80 ${32 + corte * 6} Q48 ${34 + corte * 6} 40 58Z" fill="${cabelo}" transform="translate(0 ${corte * 6}) scale(1 ${1 - corte * .35})" transform-origin="80 58"/>
  <ellipse cx="66" cy="66" rx="4" ry="4" fill="#1F1512"/><ellipse cx="94" cy="66" rx="4" ry="4" fill="#1F1512"/>
  ${oculos ? '<circle cx="66" cy="66" r="11" fill="#ffffff22" stroke="#141414" stroke-width="3"/><circle cx="94" cy="66" r="11" fill="#ffffff22" stroke="#141414" stroke-width="3"/><path d="M77 66H83" stroke="#141414" stroke-width="3"/>' : ''}<path d="${mood === 'feliz' ? 'M66 82 Q80 94 94 82' : 'M68 84 Q80 88 92 84'}" stroke="#5B2B22" stroke-width="4" fill="none" stroke-linecap="round"/></g></g></svg>`;
}
// Cliente de corpo inteiro andando
function clienteAndando({ cor = '#2563EB', calca = '#1F2937', pele = '#D9A06F', cabelo = '#3B2A22', perna = 0, bob = 0, mood = 'normal' } = {}) {
  return `<svg viewBox="0 0 90 190" xmlns="http://www.w3.org/2000/svg" overflow="visible"><g transform="translate(0 ${bob})">
  <g transform="rotate(${perna} 36 110)"><rect x="26" y="108" width="17" height="64" rx="8" fill="${calca}"/><ellipse cx="34" cy="176" rx="15" ry="7" fill="#111827"/></g>
  <g transform="rotate(${-perna} 56 110)"><rect x="47" y="108" width="17" height="64" rx="8" fill="${calca}"/><ellipse cx="56" cy="176" rx="15" ry="7" fill="#111827"/></g>
  <g transform="rotate(${-perna * .8} 20 62)"><rect x="8" y="58" width="15" height="52" rx="7" fill="${cor}"/></g><g transform="rotate(${perna * .8} 70 62)"><rect x="67" y="58" width="15" height="52" rx="7" fill="${cor}"/></g>
  <rect x="20" y="54" width="50" height="62" rx="20" fill="${cor}"/>
  <circle cx="45" cy="32" r="24" fill="${pele}"/><path d="M21 30 Q22 6 45 6 Q68 6 69 30 Q60 18 45 18 Q30 18 21 30Z" fill="${cabelo}"/>
  <circle cx="37" cy="34" r="2.6" fill="#1F1512"/><circle cx="53" cy="34" r="2.6" fill="#1F1512"/>
  <path d="${mood === 'triste' ? 'M36 46 Q45 40 54 46' : mood === 'feliz' ? 'M36 42 Q45 52 54 42' : 'M37 44 Q45 48 53 44'}" stroke="#5B2B22" stroke-width="3" fill="none" stroke-linecap="round"/></g></svg>`;
}
if (typeof module !== 'undefined') module.exports = { pessoa, leo, dono, clienteCapa, clienteAndando, tesouraSvg, celularMao, piscar };
