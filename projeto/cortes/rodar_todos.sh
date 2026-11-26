#!/bin/bash
# Gera todos os cortes dos specs. Uso: ./rodar_todos.sh video.mp4 transcricao.json arquivo_chave
export SSL_CERT_FILE=/root/.ccr/ca-bundle.crt REQUESTS_CA_BUNDLE=/root/.ccr/ca-bundle.crt
cd "$(dirname "$0")"
for s in specs/*.json; do echo "=== $s"; python3 montar.py "$s" --fonte "$1" --transcricao "$2" --chave "$3" 2>&1 | grep -vE "^legenda"; done
