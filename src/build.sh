#!/bin/bash
# Собирает index.html из модулей в этой папке. Запускать из корня репозитория:
#   bash src/build.sh
set -e
cd "$(dirname "$0")/.."
S=src
{
cat <<'HEAD'
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Интерактивная методичка по английской грамматике: как строится предложение, все 12 времён и условные предложения. Роадмапы, живые схемы, конструктор предложения и 324 задания с объяснением каждого ответа.">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#0A1213" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ECF0EE" media="(prefers-color-scheme: light)">

<meta property="og:type" content="website">
<meta property="og:locale" content="ru_RU">
<meta property="og:title" content="Карта английской грамматики">
<meta property="og:description" content="Глагол в английском есть всегда. Времён не двенадцать — их 3 × 4. Условие всегда отстаёт на шаг. Интерактивная методичка с заданиями и разбором каждого ответа.">
<meta name="twitter:card" content="summary">

<title>Карта английской грамматики</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Golos+Text:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap">

<style>
  body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
<style>
HEAD
  cat $S/01-style.css
  cat $S/02-style-new.css
  echo '</style>'
  echo '</head>'
  echo '<body>'
  cat $S/02-body.html
  echo
  for f in 00-helpers 10-graphics 20-data-tenses 22-data-misc 25-drills-a 26-drills-b 27-quiz-tenses 30-data-cond 35-drills-cond 50-data-sentence 55-drills-sentence 90-app; do
    echo "<script>"; cat "$S/$f.js"; echo "</script>"
  done
  printf '</body>\n</html>\n'
} > index.html
echo "index.html собран: $(wc -c < index.html) байт"
