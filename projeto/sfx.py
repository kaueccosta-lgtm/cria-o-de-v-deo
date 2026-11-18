#!/usr/bin/env python3
"""Trilha emocional (arpejo de piano + pad, com eco) e efeitos, gerados sem arquivos externos."""
import math, os, random, struct, wave
os.makedirs('audio', exist_ok=True); SR = 22050
def save(name, xs):
    with wave.open(f'audio/{name}.wav', 'w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b''.join(struct.pack('<h', int(max(-1, min(1, x)) * 32000)) for x in xs))
bpm = 64; beat = 60 / bpm
chords = [[220.0, 261.63, 329.63, 440.0], [174.61, 220.0, 261.63, 349.23], [261.63, 329.63, 392.0, 523.25], [196.0, 246.94, 293.66, 392.0]]
n_per = int(4 * beat * SR); total = n_per * len(chords); mus = [0.0] * total
def add(start, f, dur, amp, decay):
    i0 = int(start * SR)
    for i in range(int(dur * SR)):
        j = i0 + i
        if j >= total: break
        t = i / SR; e = min(1, t / .008) * math.exp(-t * decay)
        mus[j] += amp * e * (math.sin(2 * math.pi * f * t) + .35 * math.sin(2 * math.pi * 2 * f * t) + .12 * math.sin(2 * math.pi * 3 * f * t))
for ci, ch in enumerate(chords):
    t0 = ci * 4 * beat
    add(t0, ch[0] / 2, 4 * beat, .16, .6)                              # baixo
    for k in range(8):                                                  # arpejo em colcheias
        add(t0 + k * beat / 2, ch[[0, 1, 2, 3, 2, 1, 2, 3][k]] * (2 if k % 4 == 3 else 1) / (1 if k else 2) * (1), 1.4, .07 if k else .09, 3.2)
    for f in ch[:3]:                                                    # pad
        for i in range(n_per):
            t = i / SR; e = min(1, t / 1.0) * min(1, (n_per / SR - t) / 1.0)
            mus[ci * n_per + i] += .018 * e * math.sin(2 * math.pi * f * t)
d = int(.42 * SR); out = mus[:]
for i in range(d, total): out[i] += .38 * mus[i - d]
for i in range(d * 2, total): out[i] += .18 * mus[i - d * 2]
pk = max(abs(x) for x in out) or 1; save('music', [x / pk * .8 for x in out])
rnd = random.Random(7)
n = int(.38 * SR); y = 0; o = []
for i in range(n):
    k = i / n; a = .12 + .6 * k; y += a * (rnd.uniform(-1, 1) - y); o.append(y * math.sin(math.pi * k) ** 1.5 * 1.3)
save('sfx_whoosh', o)
save('sfx_thud', [math.sin(2 * math.pi * (140 * math.exp(-i / SR * 12) + 45) * i / SR) * math.exp(-i / SR * 9) * .95 for i in range(int(.45 * SR))])
save('sfx_pop', [math.sin(2 * math.pi * (500 + 900 * (i / SR) * 6) * i / SR) * math.exp(-i / SR * 28) * .6 for i in range(int(.16 * SR))])
save('sfx_ding', [(math.sin(2 * math.pi * 1318 * i / SR) + .5 * math.sin(2 * math.pi * 1976 * i / SR)) * math.exp(-i / SR * 6) * .35 for i in range(int(.7 * SR))])
save('sfx_sino', [(math.sin(2 * math.pi * 880 * i / SR) + .6 * math.sin(2 * math.pi * 1320 * i / SR) + .3 * math.sin(2 * math.pi * 2200 * i / SR)) * math.exp(-i / SR * 3.2) * .3 for i in range(int(1.2 * SR))])
save('sfx_snip', [(rnd.uniform(-1, 1) * math.exp(-i / SR * 160) + .5 * rnd.uniform(-1, 1) * math.exp(-max(0, i / SR - .05) * 220) * (1 if i / SR > .05 else 0)) * .55 for i in range(int(.14 * SR))])
print('ok')
