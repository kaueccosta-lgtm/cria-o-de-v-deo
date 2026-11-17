# Kit de vídeo 2D narrado (barbearia do Léo + Kosta)

Estilo: ilustração flat vertical 9:16, legenda palavra por palavra, selo de capítulo e barra de progresso.
Tudo é código: HTML/SVG → quadros (Playwright, 1080x1920, 30fps) → ffmpeg + voz neural pt-BR (edge-tts).

| Pasta/arquivo | O que é |
|---|---|
| `personagens/personagens.js` | `barbeiro()` (Léo) e `kosta()` (assistente de IA), com humores |
| `cenas/cenas.js` | cenários, props (celular, perfil, gráfico, calendário, notificações) e 9 cenas prontas |
| `motor.html` | palco 540x960, legenda, selo, barra de progresso |
| `fontes/` | Anton, Montserrat 800/900, Baloo 2 |
| `voz.py` | roteiro.json → audio/*.mp3 + tempo de cada palavra |
| `render.js` | timeline → MP4 |
| `galeria.js` | contact sheet de todas as cenas |

## Rodar
```bash
cd projeto
export SSL_CERT_FILE=/root/.ccr/ca-bundle.crt   # só no sandbox da nuvem (usa o proxy)
python3 voz.py roteiro.json && node render.js saida/video.mp4
```
Requer: `pip install edge-tts`, Node + `playwright` (Chromium), ffmpeg. Na nuvem, o host `speech.platform.bing.com` precisa estar liberado.

`roteiro.json`: `{"voz","rate","etapas","cenas":[{"cena","fala","selo":{"n","txt"},"pausa"}]}`.
Vozes: `pt-BR-AntonioNeural`, `pt-BR-FranciscaNeural`, `pt-BR-ThalitaMultilingualNeural`.
Cenas: barbearia_vazia, perfil_vazio, grafico_caindo, kosta_chega, conteudo_chegando, calendario_cheio, perfil_cheio, barbearia_cheia, cta.
