# 📡 TMDB API - Guia de Testes com cURL

Este arquivo documenta as rotas do The Movie Database (TMDB) que o projeto utiliza, com exemplos de como testá-las usando cURL no Postman.

---

## 🔑 Configuração Prévia

1. **Obtenha sua chave de API:**
   - Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Crie uma conta e gere uma chave de API
   - Copie a chave para o arquivo `.env.local`:
     ```
     VITE_TMDB_API_KEY=sua_chave_aqui
     VITE_TMDB_LANGUAGE=pt-BR
     ```

2. **Substitua `{API_KEY}`** nos exemplos abaixo pela sua chave real

---

## 🔍 Rota: `/search/multi`

### O que faz?
Busca filmes, séries de TV e pessoas em toda a base de dados do TMDB. Retorna resultados mistos ordenados por relevância.

### Para que serve?
- Permitir que usuários pesquisem qualquer tipo de conteúdo
- Implementar buscas genéricas (filmes, séries, atores)
- Criar funcionalidade de autocomplete/sugestões

### Exemplo de cURL - Buscar "Batman"

```bash
curl -X GET "https://api.themoviedb.org/3/search/multi?api_key={API_KEY}&language=pt-BR&query=Batman&page=1&include_adult=false" \
  -H "Accept: application/json"
```

**Parâmetros:**
- `api_key`: Sua chave de API do TMDB
- `query`: Termo de busca (ex: "Batman", "Game of Thrones")
- `language`: Idioma dos resultados (pt-BR para português)
- `page`: Número da página (padrão: 1)
- `include_adult`: Incluir conteúdo adulto (true/false)

**Resposta (exemplo):**
```json
{
  "results": [
    {
      "id": 278,
      "title": "Batman Begins",
      "poster_path": "/1P4ldxYX5vZkkJBRMDVAuKA9OMI.jpg",
      "backdrop_path": "/7f5b7vBRIyfU9MvDkxUuXEaQRDU.jpg",
      "overview": "Após testemunhar a morte dos pais...",
      "vote_average": 8.2,
      "release_date": "2005-06-15",
      "media_type": "movie"
    }
  ],
  "total_results": 45,
  "total_pages": 3
}
```

---

## 🎬 Rota: `/discover/movie`

### O que faz?
Descobre filmes com base em critérios de filtro (popularidade, avaliação, data de lançamento, etc).

### Para que serve?
- Exibir filmes mais populares/bem avaliados na página inicial
- Criar listagens curadas (top rated, trending)
- Permitir filtros avançados (gênero, ano, idioma)

### Exemplo de cURL - Filmes Populares

```bash
curl -X GET "https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&language=pt-BR&sort_by=popularity.desc&page=1" \
  -H "Accept: application/json"
```

**Parâmetros principais:**
- `sort_by`: Como ordenar resultados
  - `popularity.desc` - Mais populares
  - `vote_average.desc` - Melhor avaliados
  - `release_date.desc` - Lançamentos recentes
- `page`: Número da página

### Exemplo de cURL - Filmes Bem Avaliados

```bash
curl -X GET "https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=100&page=1" \
  -H "Accept: application/json"
```

---

## 🛠️ Como Testar no Postman

### Método 1: Usando cURL Raw

1. Abra o Postman
2. Clique em **+ New** → **HTTP**
3. Escolha a aba **"Code"** (lado direito, onde tem a seta)
4. Selecione **cURL** no dropdown
5. Cole o cURL de exemplo acima
6. Clique em **"Copy code"** 
7. Volte para a aba principal e clique em **"Generate Code"**
8. Cole o código

### Método 2: Configuração Manual

1. Abra o Postman
2. Selecione método **GET**
3. Cole a URL base: `https://api.themoviedb.org/3/search/multi`
4. Vá para a aba **Params** e adicione:
   - `api_key`: `{sua_chave}`
   - `query`: `Batman`
   - `language`: `pt-BR`
5. Clique em **Send**

---

## 📊 Estrutura da Resposta

Todos os endpoints retornam um objeto com:
```json
{
  "results": [ /* Array de filmes/séries/pessoas */ ],
  "page": 1,
  "total_results": 45,
  "total_pages": 3
}
```

Cada item em `results` contém:
```json
{
  "id": 278,                          // ID único do conteúdo
  "title": "Batman Begins",           // Título (filmes)
  "name": "Breaking Bad",             // Nome (séries)
  "poster_path": "/1P4ldxYX5vZkk...", // Caminho relativo da imagem (null se não existir)
  "backdrop_path": "/7f5b7vBRI...",   // Imagem de fundo
  "overview": "Sinopse...",           // Descrição do conteúdo
  "vote_average": 8.2,                // Avaliação (0-10)
  "release_date": "2005-06-15",       // Data de lançamento
  "media_type": "movie"               // Tipo: "movie", "tv" ou "person"
}
```

---

## 🖼️ URLs das Imagens

Para construir URLs de imagens completas, use:
```
https://image.tmdb.org/t/p/w500{poster_path}
```

Exemplos:
- **Pequeno**: `w185` - 185px de largura
- **Médio**: `w500` - 500px de largura (padrão usado no projeto)
- **Grande**: `w1280` - 1280px de largura

Se `poster_path` for `null`, a imagem não está disponível.

---

## ⚠️ Limitações da API Gratuita

- **Rate Limit**: ~40 requisições por 10 segundos
- **Dados em Cache**: Atualizações podem levar horas
- **Cobertura**: Melhor para filmes/séries populares
- **Sem Detalhes de Elenco**: Use endpoints específicos se precisar

---

## 🧪 Teste Rápido

```bash
# Substitua {API_KEY} pela sua chave
curl -X GET "https://api.themoviedb.org/3/search/multi?api_key={API_KEY}&language=pt-BR&query=Inception&page=1" \
  -H "Accept: application/json"
```

Você deve receber uma resposta JSON com informações sobre "Inception".

---

## 📚 Documentação Oficial

Para mais rotas e detalhes, consulte: https://developer.themoviedb.org/docs
