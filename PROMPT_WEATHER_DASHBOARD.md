# 🌍 PROMPT — Weather Dashboard no GitHub com GitHub Actions

> Instrução completa para implementação de um repositório automatizado de clima global com SVGs animados, histórico em CSV, dashboard visual e deploy automático via GitHub Actions.

---

## 🎯 OBJETIVO GERAL

Criar um repositório GitHub chamado `weather-dashboard` no perfil **https://github.com/Pedroxious** que:

- Atualiza automaticamente **3 vezes por dia** (9h, 12h e 19h — horário de Brasília)
- Consome a API gratuita **Open-Meteo** (sem necessidade de API key)
- Gera **SVGs animados dinâmicos** para cada cidade, com tema claro/escuro por horário e paleta de cores quentes/frias por temperatura
- Exibe o clima de **São Paulo + uma cidade famosa por continente**
- Salva **histórico completo** de todos os registros em `data/history.csv`
- Atualiza o `README.md` como um **dashboard visual** completo
- Faz **commit e push automático** ao final de cada execução
- Cada cidade tem seu **card SVG independente** + referência para imagem estática local

---

## 🗂️ ESTRUTURA COMPLETA DO PROJETO

```
weather-dashboard/
├── .github/
│   └── workflows/
│       └── weather.yml              # Workflow do GitHub Actions
│
├── images/
│   ├── limpo.png                    # ← INSERIDA MANUALMENTE pelo usuário
│   ├── nublado.png                  # ← INSERIDA MANUALMENTE pelo usuário
│   ├── chuva.png                    # ← INSERIDA MANUALMENTE pelo usuário
│   └── tempestade.png               # ← INSERIDA MANUALMENTE pelo usuário
│
├── cards/
│   ├── sao_paulo.svg                # Gerado automaticamente pelo script
│   ├── new_york.svg
│   ├── london.svg
│   ├── paris.svg
│   ├── tokyo.svg
│   ├── dubai.svg
│   ├── sydney.svg
│   ├── cairo.svg
│   ├── mexico_city.svg
│   └── buenos_aires.svg
│
├── data/
│   └── history.csv                  # Histórico acumulado de todos os registros
│
├── update_weather.py                # Script principal Python
├── README.md                        # Dashboard visual — atualizado automaticamente
└── .gitignore
```

> ⚠️ As imagens na pasta `images/` **NÃO devem ser criadas pelo script**. Deixe apenas o espaço reservado referenciando os nomes exatos: `limpo.png`, `nublado.png`, `chuva.png`, `tempestade.png`. O usuário irá inserir essas imagens manualmente.

---

## 🌍 CIDADES DO DASHBOARD

| Cidade | País | Continente | Latitude | Longitude |
|--------|------|------------|----------|-----------|
| São Paulo | Brasil | América do Sul | -23.5505 | -46.6333 |
| Buenos Aires | Argentina | América do Sul | -34.6037 | -58.3816 |
| Mexico City | México | América Central | 19.4326 | -99.1332 |
| New York | EUA | América do Norte | 40.7128 | -74.0060 |
| London | Reino Unido | Europa | 51.5074 | -0.1278 |
| Paris | França | Europa | 48.8566 | 2.3522 |
| Tokyo | Japão | Ásia | 35.6762 | 139.6503 |
| Dubai | Emirados Árabes | Oriente Médio | 25.2048 | 55.2708 |
| Cairo | Egito | África | 30.0444 | 31.2357 |
| Sydney | Austrália | Oceania | -33.8688 | 151.2093 |

Cada cidade deve ter:
- Seu próprio card SVG animado gerado em `cards/<slug_cidade>.svg`
- Sua própria entrada no histórico CSV com coluna `city`
- Referência à imagem estática correta em `images/` (baseada na condição climática)

---

## 🎨 REGRAS DOS SVGs ANIMADOS — DETALHAMENTO COMPLETO

### 1. Tema Claro / Escuro por horário real de cada cidade

O script deve determinar se é **dia ou noite** com base no nascer e pôr do sol **de cada cidade individualmente** (fornecido pela Open-Meteo API):

- **Dia** (entre sunrise e sunset locais da cidade): fundo claro, texto escuro
- **Noite** (fora desse intervalo): fundo escuro/profundo, estrelas animadas, texto claro

### 2. Paleta de cores por temperatura real

Use a temperatura atual de cada cidade para definir a paleta do gradiente de fundo:

| Faixa de temperatura | Paleta |
|----------------------|--------|
| Abaixo de 5°C | Azul gelo profundo `#0D1B2A → #1B4F72` |
| 5°C a 14°C | Azul frio `#1A237E → #4FC3F7` |
| 15°C a 21°C | Verde ameno `#1B5E20 → #A5D6A7` |
| 22°C a 28°C | Amarelo/laranja suave `#F9A825 → #FFF9C4` |
| 29°C a 35°C | Laranja quente `#E65100 → #FFCC80` |
| Acima de 35°C | Vermelho intenso `#B71C1C → #FF8A65` |

### 3. Animações obrigatórias no SVG (via CSS embutido na tag `<style>`)

- **Chuva:** linhas diagonais caindo em loop com `stroke-dashoffset`
- **Tempestade:** relâmpago piscando com `opacity` alternando + chuva animada
- **Nublado:** nuvens deslizando horizontalmente com `translateX`
- **Limpo (dia):** sol girando lentamente com `rotate` + raios pulsando com `opacity`
- **Limpo (noite):** estrelas piscando com `opacity` em delays variados + lua crescente
- **Neblina:** camadas de opacidade ondulando suavemente

### 4. Informações dentro de cada card SVG

- Nome da cidade e país
- Temperatura atual em destaque (fonte grande)
- Emoji da condição climática
- Sensação térmica
- Umidade relativa
- Velocidade do vento (km/h)
- Horário local da cidade (calculado via pytz)
- Indicador `DIA 🌞` ou `NOITE 🌙`
- Temperatura mínima e máxima do dia
- Barra de progresso visual do dia (percentual entre sunrise e sunset)

### 5. Dimensões e estilo dos SVGs

- **Largura:** 500px | **Altura:** 280px | **Border radius:** 20px
- Gradiente de fundo com `linearGradient` usando as cores da paleta por temperatura
- Sombra simulada com retângulo deslocado semitransparente atrás do card
- Todas as animações embutidas dentro da tag `<style>` do próprio SVG (sem JS externo)

---

## 📄 LÓGICA DA IMAGEM ESTÁTICA POR CONDIÇÃO

O script altera dinamicamente a referência da imagem no README para cada cidade com base no `weather_code` retornado pela API:

```python
WEATHER_MAP = {
    0:  ("☀️", "Céu limpo",             "limpo"),
    1:  ("🌤️", "Principalmente limpo",  "limpo"),
    2:  ("⛅",  "Parcialmente nublado",  "nublado"),
    3:  ("☁️",  "Nublado",              "nublado"),
    45: ("🌫️", "Neblina",              "nublado"),
    48: ("🌫️", "Neblina com gelo",     "nublado"),
    51: ("🌦️", "Chuvisco leve",        "chuva"),
    53: ("🌦️", "Chuvisco moderado",    "chuva"),
    55: ("🌧️", "Chuvisco intenso",     "chuva"),
    61: ("🌧️", "Chuva leve",           "chuva"),
    63: ("🌧️", "Chuva moderada",       "chuva"),
    65: ("🌧️", "Chuva forte",          "chuva"),
    80: ("🌦️", "Pancadas leves",       "chuva"),
    81: ("⛈️", "Pancadas moderadas",   "tempestade"),
    82: ("⛈️", "Pancadas intensas",    "tempestade"),
    95: ("⛈️", "Tempestade",           "tempestade"),
    96: ("⛈️", "Tempestade c/ granizo","tempestade"),
}
```

A imagem referenciada no README será sempre: `images/{condicao}.png`

Exemplo: se em Paris `weather_code = 63` → `![Paris condição](images/chuva.png)`

---

## 🗃️ HISTÓRICO CSV — `data/history.csv`

O arquivo deve ser **append-only** (nunca sobrescrever, sempre acrescentar novas linhas).

### Colunas obrigatórias:

```
datetime, city, country, continent, temp_c, feels_like_c, temp_min_c,
temp_max_c, humidity_pct, wind_kmh, precipitation_mm, weather_code,
condition, image_key, is_day, sunrise, sunset
```

### Comportamento:
- Se o arquivo não existir, criá-lo com o cabeçalho na primeira linha
- A cada execução, **todas as 10 cidades** geram uma linha nova no CSV
- O CSV nunca é limpo — cresce indefinidamente como log histórico real
- Encoding: UTF-8

---

## 📋 README.md — DASHBOARD VISUAL

O README deve ser **completamente regravado** a cada execução como um dashboard organizado.

### Seções obrigatórias:

**1. Cabeçalho**
- Título com emoji e nome do projeto
- Subtítulo descrevendo o que o repositório faz
- Badge de última atualização (texto estático gerado pelo script com data/hora)
- Badge com total de registros no CSV

**2. Destaque — São Paulo (cidade principal)**
- Card SVG: `![São Paulo](cards/sao_paulo.svg)`
- Imagem estática da condição: `![Condição SP](images/{condicao}.png)`
- Tabela markdown com todos os dados detalhados

**3. Grid de cidades globais**
Para cada uma das outras 9 cidades, em sequência organizada por continente:
```markdown
### 🗼 Paris, França — Europa
![Paris](cards/paris.svg)
![Condição](images/{condicao_paris}.png)
| Dado | Valor |
...
```

**4. Seção de histórico**
- Link para `data/history.csv`
- Total de registros acumulados (lido do CSV)
- Data do primeiro e último registro
- Temperatura mais alta e mais baixa já registradas

**5. Rodapé técnico**
- Fonte dos dados: Open-Meteo (com link)
- Frequência de atualização: 3x ao dia (9h, 12h, 19h BRT)
- Resumo técnico de como funciona em 3 linhas
- Link para o workflow em `.github/workflows/weather.yml`

---

## ⚙️ WORKFLOW — `.github/workflows/weather.yml`

```yaml
name: 🌍 Weather Dashboard Update

on:
  schedule:
    - cron: '0 12 * * *'    # 9h horário de Brasília (UTC-3)
    - cron: '0 15 * * *'    # 12h horário de Brasília
    - cron: '0 22 * * *'    # 19h horário de Brasília
  workflow_dispatch:          # Permite rodar manualmente pelo painel do GitHub

jobs:
  update:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Python 3.12
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Instalar dependências
        run: pip install requests pytz

      - name: Executar script de atualização
        run: python update_weather.py

      - name: Commit e Push
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add README.md cards/ data/history.csv
          git diff --staged --quiet || git commit -m "🌍 weather update $(date -u '+%Y-%m-%d %H:%M UTC')"
          git push
```

> O `git diff --staged --quiet ||` garante que o commit só acontece se houver mudanças reais.

---

## 🐍 SCRIPT PYTHON — `update_weather.py`

### Dependências externas (instalar via pip):
- `requests` — chamadas HTTP para a API
- `pytz` — cálculo de horário local por timezone

### Módulos nativos do Python (não instalar):
- `datetime`, `csv`, `os`, `math`

### Lista de cidades com timezones:

```python
CIDADES = [
    {"nome": "São Paulo",    "pais": "Brasil",           "continente": "América do Sul",   "lat": -23.5505, "lon": -46.6333, "tz": "America/Sao_Paulo",                "slug": "sao_paulo"},
    {"nome": "Buenos Aires", "pais": "Argentina",        "continente": "América do Sul",   "lat": -34.6037, "lon": -58.3816, "tz": "America/Argentina/Buenos_Aires",   "slug": "buenos_aires"},
    {"nome": "Mexico City",  "pais": "México",           "continente": "América Central",  "lat":  19.4326, "lon": -99.1332, "tz": "America/Mexico_City",              "slug": "mexico_city"},
    {"nome": "New York",     "pais": "EUA",              "continente": "América do Norte", "lat":  40.7128, "lon": -74.0060, "tz": "America/New_York",                 "slug": "new_york"},
    {"nome": "London",       "pais": "Reino Unido",      "continente": "Europa",           "lat":  51.5074, "lon":  -0.1278, "tz": "Europe/London",                    "slug": "london"},
    {"nome": "Paris",        "pais": "França",           "continente": "Europa",           "lat":  48.8566, "lon":   2.3522, "tz": "Europe/Paris",                     "slug": "paris"},
    {"nome": "Tokyo",        "pais": "Japão",            "continente": "Ásia",             "lat":  35.6762, "lon": 139.6503, "tz": "Asia/Tokyo",                       "slug": "tokyo"},
    {"nome": "Dubai",        "pais": "Emirados Árabes",  "continente": "Oriente Médio",    "lat":  25.2048, "lon":  55.2708, "tz": "Asia/Dubai",                       "slug": "dubai"},
    {"nome": "Cairo",        "pais": "Egito",            "continente": "África",           "lat":  30.0444, "lon":  31.2357, "tz": "Africa/Cairo",                     "slug": "cairo"},
    {"nome": "Sydney",       "pais": "Austrália",        "continente": "Oceania",          "lat": -33.8688, "lon": 151.2093, "tz": "Australia/Sydney",                 "slug": "sydney"},
]
```

### Comportamento esperado do script:

- Iterar sobre todas as cidades em sequência
- Para cada cidade: chamar a API, gerar o SVG, salvar no CSV, montar o bloco do README
- Usar `try/except` por cidade: se uma falhar (timeout, erro de rede), logar o erro no terminal e continuar as demais
- Ao final, printar um resumo de todas as cidades com temperatura e condição
- Escrever o README completo apenas depois de processar todas as cidades

---

## 🚀 DEPLOY FINAL — PASSOS PARA PUBLICAR NO GITHUB

Após gerar todos os arquivos do projeto, execute os seguintes passos:

### 1. Criar o repositório no GitHub
Criar o repositório `weather-dashboard` no perfil https://github.com/Pedroxious via GitHub CLI com o nome `weather-dashboard`, público, sem README inicial.

### 2. Inicializar e conectar o repositório local
```bash
git init
git remote add origin https://github.com/Pedroxious/weather-dashboard.git
```

### 3. Criar estrutura de pastas
```bash
mkdir -p .github/workflows images cards data
```

### 4. Criar arquivo `.gitignore`
```
__pycache__/
*.pyc
.env
.DS_Store
```

### 5. Criar placeholder na pasta `images/`
Criar o arquivo `images/README.md` com o conteúdo:
```markdown
# Imagens de condição climática

Insira aqui os seguintes arquivos manualmente:
- `limpo.png`
- `nublado.png`
- `chuva.png`
- `tempestade.png`

Esses arquivos são referenciados automaticamente pelo script conforme a condição climática atual de cada cidade.
```

### 6. Criar CSV com cabeçalho inicial
```bash
echo "datetime,city,country,continent,temp_c,feels_like_c,temp_min_c,temp_max_c,humidity_pct,wind_kmh,precipitation_mm,weather_code,condition,image_key,is_day,sunrise,sunset" > data/history.csv
```

### 7. Primeiro commit e push
```bash
git add .
git commit -m "🚀 initial setup: weather dashboard with GitHub Actions"
git branch -M main
git push -u origin main
```

### 8. Configurar permissões do Actions (instruir o usuário)
Após o push, o usuário deve acessar:
`https://github.com/Pedroxious/weather-dashboard/settings/actions`

Em **"Workflow permissions"**, selecionar: **Read and write permissions** e salvar.

### 9. Testar o workflow manualmente
Acessar: `https://github.com/Pedroxious/weather-dashboard/actions`
Clicar em **"Weather Dashboard Update"** → **"Run workflow"** → **"Run workflow"**

Após ~1-2 minutos, o README e todos os SVGs já estarão atualizados com dados reais de todas as 10 cidades.

---

## ✅ CHECKLIST FINAL

- [ ] `update_weather.py` implementado com todas as 10 cidades
- [ ] SVGs animados gerados com tema claro/escuro por horário local de cada cidade
- [ ] Paleta de cores dinâmica por faixa de temperatura
- [ ] Pasta `images/` com placeholder `README.md` (imagens serão adicionadas manualmente)
- [ ] Pasta `cards/` populada automaticamente pelo script a cada execução
- [ ] `data/history.csv` com append-only e todas as colunas definidas
- [ ] `README.md` como dashboard completo com cards SVG + imagens estáticas por condição
- [ ] Workflow `.github/workflows/weather.yml` configurado para 9h, 12h e 19h BRT
- [ ] `.gitignore` criado
- [ ] Primeiro commit e push feito para `https://github.com/Pedroxious/weather-dashboard`
- [ ] Instruções de permissão do Actions fornecidas ao usuário

---

*Prompt gerado para implementação completa. Repositório destino: https://github.com/Pedroxious/weather-dashboard*
