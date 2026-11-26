#!/usr/bin/env python3
"""Monta um corte vertical (TikTok) a partir de trechos de um vídeo falado.
Áudio = voz do vídeo original (sem mostrar o original). Imagem = vídeos do Pixabay num cartão arredondado (safe zone).
Uso: python3 montar.py spec.json --fonte video.mp4 --transcricao transcricao.json --chave arquivo_chave [--saida out.mp4]
"""
import argparse, json, os, re, subprocess, sys, unicodedata, requests
from PIL import Image, ImageDraw
ap = argparse.ArgumentParser(); ap.add_argument('spec'); ap.add_argument('--fonte', required=True); ap.add_argument('--transcricao', required=True)
ap.add_argument('--chave', required=True); ap.add_argument('--saida'); ap.add_argument('--trabalho', default='/tmp/cortes_work'); a = ap.parse_args()
spec = json.load(open(a.spec)); nome = spec['nome']; W = os.path.join(a.trabalho, nome); os.makedirs(W, exist_ok=True)
KEY = open(a.chave).read().strip(); CACHE = '/tmp/pixabay_cache'; os.makedirs(CACHE, exist_ok=True)
CW, CH, CX, CY = 800, 720, 140, 440                      # cartão dentro da safe zone (1080x1920)
sh = lambda cmd: subprocess.run(cmd, check=True, capture_output=True)
def norm(s): return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode())
CORRIGE = {'lassaro': 'Lázaro', 'principe': 'Princípio', 'ouracao': 'Oração', 'oure': 'Ore', 'intersecao': 'intercessão', 'intersecoes': 'intercessões', 'brego': 'grego', 'sermoens': 'sermões', 'ascendimento': 'chamado', 'desuse': 'Deus se'}
OURO = {'deus', 'oracao', 'oracoes', 'orar', 'ore', 'fe', 'especifica', 'especifico', 'especificas', 'especificos', 'especificidade', 'wesley', 'senhor', 'pai', 'amor', 'diario', 'lista', 'flecha', 'confianca', 'rendicao', 'transformacao', 'comunhao', 'intimidade', 'fidelidade', 'caminho', 'destino', 'presentes'}
VERM = {'vazias', 'vazio', 'vaga', 'vago', 'fechado', 'ninguem', 'nada', 'seca', 'dor', 'abstrato', 'genericas', 'generica'}

# 1) palavras da transcrição
tr = json.load(open(a.transcricao)); words = []
for s in tr['segments']:
    for st, en, tx in s['words']: words.append((st, en, tx.strip()))
toks = [norm(w[2]) for w in words]
def find(phrase, ini, perto=None):
    p = [norm(x) for x in phrase.split()]; c = [i for i in range(ini, len(words) - len(p) + 1) if toks[i:i + len(p)] == p]
    if not c: sys.exit(f'frase não encontrada: {phrase!r}')
    return min(c, key=lambda i: abs(words[i][0] - perto)) if perto is not None else c[0]
exc = []; cursor = 0; cum = 0.0; todas = []
for e in spec['trechos']:
    i0 = find(e['de'], 0, e['dica']); j0 = find(e['ate'], i0, e.get('dica_fim')); j1 = j0 + len(e['ate'].split()) - 1
    t0 = max(words[i0 - 1][1] if i0 else 0, words[i0][0] - .12); t1 = words[j1][1] + .30
    ws = [(cum + (w[0] - t0), cum + (w[1] - t0), w[2]) for w in words[i0:j1 + 1]]
    exc.append((t0, t1, cum)); todas += ws; cum += (t1 - t0) + .15
    print(f'  trecho {t0:7.1f}-{t1:7.1f}s ({t1 - t0:4.1f}s): {" ".join(w[2] for w in words[i0:i0 + 6])} … {" ".join(w[2] for w in words[j1 - 3:j1 + 1])}')
T = cum + .45; print(f'duração total {T:.1f}s')

# 2) áudio
partes = []
for k, (t0, t1, off) in enumerate(exc):
    f = os.path.join(W, f'a{k}.wav'); d = t1 - t0
    sh(['ffmpeg', '-y', '-v', 'error', '-ss', f'{t0:.3f}', '-to', f'{t1:.3f}', '-i', a.fonte, '-vn', '-ac', '1', '-ar', '44100', '-af', f'afade=t=in:d=0.04,afade=t=out:st={d - .12:.3f}:d=0.12', f])
    g = os.path.join(W, f'g{k}.wav'); sh(['ffmpeg', '-y', '-v', 'error', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', '0.15', g]); partes += [f, g]
lst = os.path.join(W, 'audio.txt'); open(lst, 'w').write('\n'.join(f"file '{p}'" for p in partes) + '\n')
AUD = os.path.join(W, 'audio.m4a')
sh(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-af', f'loudnorm=I=-16:TP=-1.5:LRA=11,apad=pad_dur=1,afade=t=out:st={T - .4:.3f}:d=0.4', '-t', f'{T:.3f}', '-c:a', 'aac', '-b:a', '160k', AUD])

# 3) legenda em blocos de 1 a 4 palavras
def limpa(t):
    m = re.match(r'^(\W*)(.*?)(\W*)$', t, re.S); pre, core, pos = m.groups(); n = norm(core)
    return pre + CORRIGE.get(n, core) + pos, norm(CORRIGE.get(n, core)), pos
chunks = []; cur = []
def fecha():
    global cur
    if cur: chunks.append(cur); cur = []
for i, (st, en, tx) in enumerate(todas):
    t, n, pos = limpa(tx); cur.append((st, en, t, n))
    prox = todas[i + 1][0] - en if i + 1 < len(todas) else 9
    if len(cur) >= 4 or re.search(r'[.?!;:,]$', pos) or prox > .45 or sum(len(x[2]) for x in cur) > 20: fecha()
fecha(); out = []
for k, c in enumerate(chunks):
    ws = []; usou = False
    for st, en, t, n in c:
        cls = 'r' if n in VERM else ('g' if (n in OURO and not usou) else 'n'); usou = usou or cls == 'g'; ws.append({'t': t, 'cls': cls})
    ini = c[0][0]; fim = (chunks[k + 1][0][0] if k + 1 < len(chunks) and chunks[k + 1][0][0] - c[-1][1] < .6 else c[-1][1] + .2)
    out.append({'start': round(ini, 3), 'end': round(fim, 3), 'words': ws})
cj = os.path.join(W, 'chunks.json'); json.dump({'total': T, 'chunks': out}, open(cj, 'w'), ensure_ascii=False)
subprocess.run(['node', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'legenda.js'), cj, os.path.join(W, 'leg')], check=True)
SUB = os.path.join(W, 'legenda.mov'); sh(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', os.path.join(W, 'leg', 'list.txt'), '-vf', 'fps=30,format=rgba', '-c:v', 'png', SUB])

# 4) cenas do Pixabay
qs = spec['cenas']; n = len(qs); ini_chunks = [c['start'] for c in out]; cortes = []
for k in range(1, n):
    ideal = T * k / n; cortes.append(min(ini_chunks, key=lambda x: abs(x - ideal)))
b = [0.0] + cortes + [T]; durs = [max(2.5, b[k + 1] - b[k]) for k in range(n)]; durs[-1] = max(2.5, T - sum(durs[:-1]))
usados = set(); clipes = []
RUIM = {'money', 'dollar', 'dollars', 'cash', 'business', 'finance', 'laptop', 'computer', 'keyboard', 'office', 'bikini', 'sexy', 'party', 'advertising', 'logo', 'shopping', 'marketing', 'smartphone', 'phone', 'sale', 'bitcoin', 'casino', 'fashion', 'model', 'beauty'}
POUCO = {'close', 'slow', 'motion', 'dark', 'night', 'light', 'the', 'and', 'with', 'of', 'in', 'on', 'a'}
def baixa(q, d):
    r = requests.get('https://pixabay.com/api/videos/', params={'key': KEY, 'q': q, 'per_page': 40, 'min_width': 1280, 'safesearch': 'true'}, timeout=30).json()
    chave = [t for t in q.lower().split() if t not in POUCO]; cand = []
    for rank, h in enumerate(r.get('hits', [])):
        if h['id'] in usados or 'medium' not in h['videos']: continue
        tags = {t.strip() for t in h['tags'].lower().replace(' ', ',').split(',') if t.strip()}
        if tags & RUIM: continue
        sc = sum(1 for t in chave if t in tags); cand.append((-sc, h['duration'] < min(d, 5), rank, h))
    if not cand: sys.exit(f'sem resultado para {q!r}')
    cand.sort(key=lambda x: x[:3]); h = cand[0][3]; usados.add(h['id'])
    f = os.path.join(CACHE, f"{h['id']}.mp4")
    if not os.path.exists(f): open(f, 'wb').write(requests.get(h['videos']['medium']['url'], timeout=120).content)
    return f, h
FADE = .35
for k, q in enumerate(qs):
    d = durs[k] + (FADE if k < n - 1 else 0); f, h = baixa(q, d); w0, h0 = h['videos']['medium']['width'], h['videos']['medium']['height']
    s = max(CW / w0, CH / h0) * 1.04; sw, shh = int(w0 * s) // 2 * 2, int(h0 * s) // 2 * 2
    pan = f"(iw-{CW})*(0.2+0.6*t/{d:.2f})" if sw > CW + 4 else f"(iw-{CW})/2"; tilt = f"(ih-{CH})*(0.2+0.6*t/{d:.2f})" if shh > CH + 4 and sw <= CW + 4 else f"(ih-{CH})/2"
    o = os.path.join(W, f'c{k}.mp4')
    sh(['ffmpeg', '-y', '-v', 'error', '-stream_loop', '-1', '-i', f, '-t', f'{d:.3f}', '-vf', f"fps=30,scale={sw}:{shh},crop={CW}:{CH}:x='{pan}':y='{tilt}',hue=s=0,eq=contrast=1.1:brightness=-0.15,vignette=PI/4.2,format=yuv420p", '-an', '-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', o])
    clipes.append(o); print(f'  cena {k + 1}/{n} {durs[k]:4.1f}s  "{q}" -> {h["id"]} [{h["tags"][:48]}]')

# 5) emenda com transição suave + máscara arredondada + tela preta + legenda
mask = os.path.join(W, 'mask.png'); im = Image.new('L', (CW, CH), 0); ImageDraw.Draw(im).rounded_rectangle((0, 0, CW - 1, CH - 1), 40, fill=255); im.save(mask)
fc = []; ins = []
for k, c in enumerate(clipes): ins += ['-i', c]
prev = '[0:v]'; acc = 0.0
for k in range(1, n):
    acc += durs[k - 1]; fc.append(f"{prev}[{k}:v]xfade=transition=fade:duration={FADE}:offset={acc:.3f}[x{k}]"); prev = f'[x{k}]'
if n == 1: fc.append('[0:v]null[x1]'); prev = '[x1]'
im_i = n; sub_i = n + 1; aud_i = n + 2
fc.append(f"{prev}[{im_i}:v]alphamerge[card]"); fc.append(f"color=c=black:s=1080x1920:r=30:d={T:.3f}[bg]"); fc.append(f"[bg][card]overlay={CX}:{CY}:shortest=0[a1]"); fc.append(f"[a1][{sub_i}:v]overlay=0:0:format=auto[v]")
saida = a.saida or os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'saida', 'cortes', f'{nome}.mp4'); os.makedirs(os.path.dirname(saida), exist_ok=True)
sh(['ffmpeg', '-y', '-v', 'error', *ins, '-loop', '1', '-i', mask, '-i', SUB, '-i', AUD, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', f'{aud_i}:a', '-t', f'{T:.3f}', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '19', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', saida])
print('ok ->', os.path.abspath(saida))
