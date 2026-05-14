# TMDB Basic

Projeto de exemplo que consome a API do The Movie Database (TMDB), criado durante um workshop de React promovido pela WebTech Network para o evento de 10 anos de Engenharia de Software na PUC Minas Lourdes.

![foto do projeto](./public/wireframe.png)
Link para os slides: https://www.canva.com/design/DAHJmWLpkMY/ITK0pIUZIxDW0XgAwFkxlg/edit

**Resumo:**
- **Objetivo:** Mostrar uma integração simples e prática com a API do TMDB para pesquisar filmes, séries e exibir detalhes (incluindo elenco e trailer).
- **Contexto:** Desenvolvido como parte de um workshop de React (WebTech Network) para a celebração dos 10 anos do curso de Engenharia de Software na PUC Minas Lourdes.

**Principais características:**
- Busca multi (rota `/search/multi`) — pesquisa por filmes, séries e resultados mistos.
- Paginação suportada (carregar mais páginas).
- Listagem inicial com itens populares.
- Modal com detalhes completos, elenco (carousel) e botão para abrir trailer no YouTube.

---

**Como usar (rápido):**
1. Copie sua chave TMDB para um arquivo `.env.local` na raiz (não comite sua chave):

```
VITE_TMDB_API_KEY=YOUR_KEY_HERE
VITE_TMDB_LANGUAGE=pt-BR
```

2. Instale dependências e rode em modo de desenvolvimento:

```bash
npm install
npm run dev
```

3. Abra `http://localhost:5173` (padrão do Vite).

---

**Estrutura do projeto (visão geral)**

- **/**: raiz do projeto.
	- **README.md**: este arquivo.
	- **API_TESTING.md**: exemplos de cURL e instruções de teste das rotas TMDB.

- **/public**: ativos públicos (imagens, favicon, etc.).

- **/src**: código-fonte principal.
	- **App.tsx**: ponto principal da aplicação; gerencia estado de busca, carregamento de populares e seleção de filme. Exibe a grade com banners e abre o modal com detalhes.
	- **main.tsx**: bootstrap do React (Vite).
	- **/components**: componentes React reutilizáveis.
		- **/Banner**: componente de exibição em grade (capa do filme).
		- **/Modal**: componente modal que mostra detalhes do filme; contém o carousel do elenco em `/components/Modal/_components/Carousel/page.tsx`.
		- **/SearchInput**: componente do input de busca controlado.
	- **/services/tmdbApi.ts**: cliente HTTP (axios) para o TMDB; funções principais:
		- `searchMulti(query, page)` — pesquisa usando `/search/multi` (retorna resultados e metadados).
		- `getPopular(page)` — busca itens populares para exibir inicialmente.
		- `getFilmeDetails(id, mediaType)` — busca detalhes e inclui `credits`/`aggregate_credits` e `videos` para extrair elenco e trailer.
		- `formatResultToFilme()` e `getImageUrl()` — helpers para mapear a resposta do TMDB ao formato usado pelos componentes.
	- **/types/filme.ts**: tipos TypeScript para `Filme` e `CastMember`.

---

**Como a integração com TMDB funciona (resumo técnico)**

- O arquivo principal de integração é [src/services/tmdbApi.ts](src/services/tmdbApi.ts).
- O client usa `axios` com a `api_key` e `language` enviadas automaticamente via `params`.
- Para pesquisar, chamamos `/search/multi` com `query` e `page`. Resultado inclui `results`, `total_pages` e `total_results` — use `page` para paginar.
- Para detalhes (quando usuário clica em um banner), chamamos `/{movie|tv}/{id}` com `append_to_response=credits,videos` (ou `aggregate_credits,videos` para TV). A função extrai:
	- elenco (mapeado para `CastMember[]`, com imagem de perfil completa)
	- gêneros, duração e `trailerUrl` (primeiro vídeo do tipo `Trailer` no YouTube, quando disponível)

---

**Paginação**

- A rota `/search/multi` aceita `page`. No front-end, mantenha `page` e `totalPages` no estado, e ao clicar em "Carregar mais" incremente `page` e concatene os resultados ao array existente.
- Ver `src/App.tsx` para exemplo de implementação de `handleSearch`, `loadMore` e concatenação de resultados.

---

**Como testar as rotas (cURL / Postman)**

- Veja [API_TESTING.md](API_TESTING.md) para exemplos completos de cURL para `/search/multi` e `/discover/movie` e instruções do Postman.

Exemplo rápido de cURL (buscar "Inception"):

```bash
curl -X GET "https://api.themoviedb.org/3/search/multi?api_key={API_KEY}&language=pt-BR&query=Inception&page=1&include_adult=false" -H "Accept: application/json"
```

Substitua `{API_KEY}` pela sua chave em `.env.local`.

---

**Dicas e notas**

- Guarde sua chave de API no `.env.local` e nunca comite chaves para repositórios públicos.
- A resposta do TMDB pode conter itens sem `poster_path`; o projeto filtra esses itens para evitar problemas de exibição.
- Para TV usamos `aggregate_credits` para obter elenco correto.
- Cuidado com rate-limits em desenvolvimento: evite chamadas em loop sem debounce no input de busca.

---

**Workshop / Créditos**

Projeto desenvolvido durante um workshop de React da **WebTech Network** para o evento de 10 anos do curso de **Engenharia de Software** na **PUC Minas Lourdes**.

Instrutor / Autor: Eduarda Vieira

---
