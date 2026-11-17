// Personagens flat 2D em SVG. Cada função devolve uma string SVG (viewBox 220x400).
// mood: 'normal' | 'triste' | 'feliz' | 'surpreso'   |  acao: ângulo do braço direito (acenar)
const PELE = '#E2A878', CABELO = '#2A1F1C';

function boca(mood) {
  if (mood === 'triste')   return `<path d="M92 116 Q110 104 128 116" stroke="#5B2B22" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (mood === 'feliz')    return `<path d="M88 108 Q110 134 132 108 Z" fill="#fff" stroke="#5B2B22" stroke-width="4" stroke-linejoin="round"/>`;
  if (mood === 'surpreso') return `<ellipse cx="110" cy="116" rx="9" ry="12" fill="#5B2B22"/>`;
  return `<path d="M96 112 Q110 120 124 112" stroke="#5B2B22" stroke-width="5" fill="none" stroke-linecap="round"/>`;
}
function sobrancelhas(mood) {
  if (mood === 'triste')   return `<path d="M82 74 L100 68 M138 74 L120 68" stroke="${CABELO}" stroke-width="6" stroke-linecap="round"/>`;
  if (mood === 'surpreso') return `<path d="M82 62 Q92 54 102 62 M118 62 Q128 54 138 62" stroke="${CABELO}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return `<path d="M82 68 L100 66 M120 66 L138 68" stroke="${CABELO}" stroke-width="6" stroke-linecap="round"/>`;
}

// Dono da barbearia (nome sugerido: Léo)
function barbeiro({ mood = 'normal', acao = 0, bob = 0 } = {}) {
  return `<svg viewBox="0 0 220 400" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 ${bob})">
  <rect x="78" y="272" width="26" height="92" rx="10" fill="#27324A"/><rect x="116" y="272" width="26" height="92" rx="10" fill="#27324A"/>
  <ellipse cx="88" cy="368" rx="22" ry="11" fill="#111827"/><ellipse cx="130" cy="368" rx="22" ry="11" fill="#111827"/>
  <rect x="60" y="150" width="100" height="130" rx="34" fill="#F3F4F6"/>
  <path d="M74 168 H146 V268 Q146 282 132 282 H88 Q74 282 74 268 Z" fill="#1E3A8A"/>
  <rect x="96" y="196" width="28" height="22" rx="6" fill="#1D4ED8"/>
  <rect x="38" y="156" width="26" height="92" rx="13" fill="#F3F4F6" transform="rotate(8 51 160)"/>
  <circle cx="44" cy="250" r="13" fill="${PELE}"/>
  <g transform="rotate(${acao} 150 168)"><rect x="150" y="156" width="26" height="92" rx="13" fill="#F3F4F6" transform="rotate(-8 163 160)"/><circle cx="170" cy="250" r="13" fill="${PELE}"/></g>
  <rect x="96" y="128" width="28" height="30" rx="10" fill="#C98F5E"/>
  <circle cx="62" cy="92" r="9" fill="${PELE}"/><circle cx="158" cy="92" r="9" fill="${PELE}"/>
  <circle cx="110" cy="88" r="52" fill="${PELE}"/>
  <path d="M60 86 Q58 36 110 34 Q162 36 160 86 Q150 60 110 58 Q70 60 60 86 Z" fill="${CABELO}"/>
  <path d="M66 100 Q70 146 110 148 Q150 146 154 100 Q148 126 110 126 Q72 126 66 100 Z" fill="${CABELO}"/>
  <circle cx="92" cy="88" r="5.5" fill="#1F1512"/><circle cx="128" cy="88" r="5.5" fill="#1F1512"/>
  ${sobrancelhas(mood)}${boca(mood)}</g></svg>`;
}

// Kosta: assistente de IA (robô arredondado, tela-rosto, K no peito, flutua)
function kosta({ mood = 'feliz', bob = 0, glow = 1 } = {}) {
  const olhos = mood === 'surpreso'
    ? `<circle cx="88" cy="86" r="11" fill="#22D3EE"/><circle cx="132" cy="86" r="11" fill="#22D3EE"/>`
    : `<rect x="78" y="78" width="20" height="16" rx="8" fill="#22D3EE"/><rect x="122" y="78" width="20" height="16" rx="8" fill="#22D3EE"/>`;
  return `<svg viewBox="0 0 220 340" xmlns="http://www.w3.org/2000/svg"><defs>
  <radialGradient id="kg"><stop offset="0" stop-color="#22D3EE" stop-opacity=".55"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0"/></radialGradient>
  <linearGradient id="kc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2DD4BF"/><stop offset="1" stop-color="#0EA5A4"/></linearGradient></defs>
  <ellipse cx="110" cy="318" rx="${46 + glow * 14}" ry="11" fill="url(#kg)"/>
  <g transform="translate(0 ${bob})">
  <circle cx="110" cy="190" r="${120 * glow}" fill="url(#kg)" opacity=".5"/>
  <line x1="110" y1="26" x2="110" y2="6" stroke="#0F766E" stroke-width="6"/><circle cx="110" cy="6" r="9" fill="#FBBF24"/>
  <rect x="38" y="164" width="22" height="70" rx="11" fill="#0EA5A4" transform="rotate(14 49 168)"/>
  <rect x="160" y="164" width="22" height="70" rx="11" fill="#0EA5A4" transform="rotate(-14 171 168)"/>
  <rect x="62" y="150" width="96" height="120" rx="40" fill="url(#kc)"/>
  <circle cx="110" cy="206" r="26" fill="#FBBF24"/>
  <text x="110" y="218" text-anchor="middle" font-family="Anton" font-size="34" fill="#7C2D12">K</text>
  <rect x="54" y="26" width="112" height="100" rx="38" fill="url(#kc)"/>
  <rect x="64" y="42" width="92" height="68" rx="26" fill="#0B1220"/>
  ${olhos}
  <path d="${mood === 'surpreso' ? 'M100 104 Q110 110 120 104' : 'M92 100 Q110 114 128 100'}" stroke="#22D3EE" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g></svg>`;
}
if (typeof module !== 'undefined') module.exports = { barbeiro, kosta };
