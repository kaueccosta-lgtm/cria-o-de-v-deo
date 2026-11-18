#!/usr/bin/env python3
"""Gera trilha suave (audio/music.wav) e efeitos (audio/sfx_*.wav) sem depender de arquivos externos."""
import math, os, random, struct, wave
os.makedirs('audio', exist_ok=True); SR = 22050
def save(name, xs):
    with wave.open(f'audio/{name}.wav', 'w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b''.join(struct.pack('<h', int(max(-1, min(1, x)) * 32000)) for x in xs))
def env(i, n, a, r): t = i / SR; d = n / SR; return min(1, t / a) * min(1, max(0, (d - t) / r))
# trilha: Am - F - C - G, pad suave + baixo, 4 s por acorde, 16 s em loop
prog = [([220.0, 261.63, 329.63], 110.0), ([174.61, 220.0, 261.63], 87.31), ([261.63, 329.63, 392.0], 130.81), ([196.0, 246.94, 293.66], 98.0)]
mus = []
for notes, bass in prog:
    n = 4 * SR
    for i in range(n):
        t = i / SR; e = env(i, n, .8, 1.2)
        v = sum(math.sin(2 * math.pi * f * t) + .4 * math.sin(2 * math.pi * f * 2.005 * t) for f in notes) * .05
        v += math.sin(2 * math.pi * bass * t) * .10 * (.6 + .4 * math.sin(2 * math.pi * 2 * t))
        mus.append(v * e * (.85 + .15 * math.sin(2 * math.pi * .25 * t)))
save('music', mus)
rnd = random.Random(7)
# whoosh: ruído filtrado com varredura
n = int(.38 * SR); y = 0; out = []
for i in range(n):
    k = i / n; a = .12 + .6 * k; y += a * (rnd.uniform(-1, 1) - y); out.append(y * math.sin(math.pi * k) ** 1.5 * 1.3)
save('sfx_whoosh', out)
# thud: seno grave caindo
out = [math.sin(2 * math.pi * (140 * math.exp(-i / SR * 12) + 45) * i / SR) * math.exp(-i / SR * 9) * .95 for i in range(int(.45 * SR))]; save('sfx_thud', out)
# pop: seno curto subindo
out = [math.sin(2 * math.pi * (500 + 900 * (i / SR) * 6) * i / SR) * math.exp(-i / SR * 28) * .6 for i in range(int(.16 * SR))]; save('sfx_pop', out)
# ding: sino
out = [(math.sin(2 * math.pi * 1318 * i / SR) + .5 * math.sin(2 * math.pi * 1976 * i / SR)) * math.exp(-i / SR * 6) * .35 for i in range(int(.7 * SR))]; save('sfx_ding', out)
print('ok')
