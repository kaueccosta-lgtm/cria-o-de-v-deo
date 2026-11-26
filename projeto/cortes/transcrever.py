#!/usr/bin/env python3
"""Transcreve um vídeo com faster-whisper (palavra por palavra). Uso: python3 transcrever.py video.mp4 saida.json [modelo_dir]"""
import json, subprocess, sys, numpy as np
from faster_whisper import WhisperModel
video, out = sys.argv[1], sys.argv[2]; model = sys.argv[3] if len(sys.argv) > 3 else '/tmp/whisper-small'
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True, check=True).stdout
a = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
m = WhisperModel(model, device='cpu', compute_type='int8', cpu_threads=4)
segs, info = m.transcribe(a, word_timestamps=True, vad_filter=True, beam_size=1)
res = []
for s in segs:
    res.append({'start': round(s.start, 2), 'end': round(s.end, 2), 'text': s.text.strip(), 'words': [[round(w.start, 2), round(w.end, 2), w.word.strip()] for w in s.words]})
    print(f'{s.end:7.1f}s  {s.text.strip()[:90]}', flush=True)
json.dump({'language': info.language, 'duration': info.duration, 'segments': res}, open(out, 'w'), ensure_ascii=False)
print('FIM', len(res), 'segmentos', info.language)
