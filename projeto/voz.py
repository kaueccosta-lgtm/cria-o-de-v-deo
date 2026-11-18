#!/usr/bin/env python3
"""Gera a narração (edge-tts, voz neural pt-BR) + tempo de cada palavra.
Uso: python3 voz.py roteiro.json   ->  audio/NN.mp3 + audio/timeline.json
Usa o proxy do ambiente automaticamente (HTTPS_PROXY), se existir."""
import asyncio, json, os, subprocess, sys, edge_tts

def dur(f):
    return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).decode())

async def fala(texto, voz, rate, arq, pitch='+0Hz'):
    c = edge_tts.Communicate(texto, voz, rate=rate, pitch=pitch, boundary='WordBoundary', proxy=os.environ.get('HTTPS_PROXY') or None)
    palavras = []
    with open(arq, 'wb') as f:
        async for e in c.stream():
            if e['type'] == 'audio': f.write(e['data'])
            elif e['type'] == 'WordBoundary':
                s = e['offset'] / 1e7; palavras.append({'w': e['text'], 's': s, 'e': s + e['duration'] / 1e7})
    return palavras

async def main(rot_path):
    rot = json.load(open(rot_path)); os.makedirs('audio', exist_ok=True)
    voz, rate = rot.get('voz', 'pt-BR-AntonioNeural'), rot.get('rate', '+5%')
    cur, out = 0.2, []
    for i, c in enumerate(rot['cenas']):
        arq = f'audio/{i:02d}.mp3'
        ws = await fala(c['fala'], voz, c.get('rate', rate), arq, c.get('pitch', '+0Hz')); d = dur(arq)
        ini = float(c.get('ini', rot.get('ini', 0.12)))   # respiro antes da fala
        for w in ws: w['s'] += cur + ini; w['e'] += cur + ini
        total = max(ini + (ws[-1]['e'] - cur - ini) + 0.4 + float(c.get('pausa', rot.get('pausa', 0.1))), float(c.get('min', 0)))
        out.append({'cena': c['cena'], 'start': round(cur, 3), 'dur': round(total, 3), 'selo': c.get('selo'),
                    'audio': arq, 'audio_start': round(cur + ini, 3), 'palavras': ws})
        cur += total
        print(f'[{i+1}/{len(rot["cenas"])}] {c["cena"]:18s} {total:5.1f}s  {c["fala"][:50]}')
    json.dump({'total': round(cur, 3), 'etapas': rot.get('etapas', 0), 'cenas': out}, open('audio/timeline.json', 'w'), ensure_ascii=False, indent=1)
    print('total', round(cur, 1), 's')

asyncio.run(main(sys.argv[1]))
