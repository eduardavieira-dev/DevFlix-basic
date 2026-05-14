import axios from 'axios'
import type { Filme } from '../types/filme'

// Configuração base da API do TMDB
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const LANGUAGE = import.meta.env.VITE_TMDB_LANGUAGE || 'pt-BR'
const BASE_URL = 'https://api.themoviedb.org/3'

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
})

export interface SearchResult {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  vote_average: number
  release_date?: string
  first_air_date?: string
  media_type: 'movie' | 'tv' | 'person'
}


interface ApiResponse {
  results: SearchResult[]
  total_results: number
  total_pages: number
}


/**
 * Busca filmes, séries e pessoas usando a rota /search/multi do TMDB
 * @param query - Termo de busca (ex: "Batman", "Game of Thrones")
 * @param page - Número da página (padrão: 1)
 * @returns Array com resultados da busca
 * 
 * TODO: Implementar esta função com os seguintes passos:
 * 1. Validar se a query está vazia - se estiver, retornar array vazio []
 * 2. Fazer uma requisição GET para '/search/multi' usando tmdbClient
 * 3. Passar os parâmetros: query (trimmed), page, e include_adult: false
 * 4. Filtrar os resultados para remover:
 *    - Itens sem poster_path (null)
 *    - Itens com media_type === 'person' (apenas filmes e séries)
 * 5. Retornar o array filtrado
 * 6. Em caso de erro, logar no console e retornar array vazio []
 * 
 * Dica: Use try/catch para lidar com erros e console.error para logar
 */
export async function searchMulti(query: string, page: number = 1): Promise<SearchResult[]> {
  throw new Error('TODO: Implementar searchMulti()')
}

/**
 * Busca os filmes/séries mais populares do TMDB
 * @param page - Número da página (padrão: 1)
 * @returns Array com os itens mais populares
 * 
 * TODO: Implementar esta função:
 * 1. Fazer uma requisição GET para '/discover/movie' usando tmdbClient
 * 2. Passar os parâmetros: sort_by: 'popularity.desc' e page
 * 3. Mapear os resultados para adicionar media_type: 'movie'
 * 4. Filtrar itens que não têm poster_path
 * 5. Retornar o array filtrado
 * 6. Em caso de erro, logar no console e retornar array vazio []
 */
export async function getPopular(page: number = 1): Promise<SearchResult[]> {
  throw new Error('TODO: Implementar getPopular()')
}

/**
 * Busca os detalhes completos de um filme com elenco
 * @param filmeId - ID do filme no TMDB
 * @param mediaType - Tipo de mídia: 'movie' ou 'tv'
 * @returns Objeto com detalhes do filme incluindo elenco formatado
 * 
 * TODO: Implementar esta função:
 * 1. Construir o endpoint: `/${mediaType}/${filmeId}`
 * 2. Fazer uma requisição GET para esse endpoint usando tmdbClient
 * 3. Passar append_to_response com 'credits,videos' (ou 'aggregate_credits,videos' para TV)
 * 4. Extrair o elenco (credits.cast ou aggregate_credits.cast), pegar os 6 primeiros
 * 5. Mapear cada ator para { name, character, image } com imagem do TMDB
 * 6. Buscar o primeiro vídeo com type='Trailer' e site='YouTube' para obter trailerUrl
 * 7. Retornar objeto com { cast, genres, duration, trailerUrl }
 * 8. Em caso de erro, logar no console e retornar objeto vazio com valores padrão
 */
export async function getFilmeDetails(filmeId: number, mediaType: 'movie' | 'tv' = 'movie') {
  throw new Error('TODO: Implementar getFilmeDetails()')
}

/**
 * Converte URL relativa da imagem em URL completa para exibir no navegador
 * @param posterPath - Caminho relativo da imagem do TMDB
 * @returns URL completa da imagem ou caminho padrão
 * 
 * TODO: Implementar esta função:
 * 1. Validar se posterPath é null ou vazio
 * 2. Se for, retornar './banner.png' (caminho padrão)
 * 3. Caso contrário, retornar a URL completa: `https://image.tmdb.org/t/p/w500${posterPath}`
 */
export function getImageUrl(posterPath: string | null): string {
  throw new Error('TODO: Implementar getImageUrl()')
}

/**
 * Converte resultado da API para o formato esperado pelo componente
 * @param result - Resultado da busca do TMDB
 * @returns Objeto formatado para usar nos componentes
 * 
 * TODO: Implementar esta função:
 * 1. Extrair title de result.title || result.name || 'Sem título'
 * 2. Extrair year da data em release_date ou first_air_date, ou usar 2026 como padrão
 * 3. Validar mediaType: se for 'tv' manter como 'tv', senão usar 'movie'
 * 4. Retornar objeto Filme com:
 *    - id, title, year, rating (vote_average), mediaType
 *    - imageUrl e bannerUrl usando getImageUrl()
 *    - duration: '—' (preenchido depois pelo getFilmeDetails)
 *    - genres: 'Série' ou 'Filme' (preenchido depois pelo getFilmeDetails)
 *    - description: result.overview || 'Sem descrição disponível'
 *    - watchUrl: '#' (preenchido depois pelo getFilmeDetails)
 *    - cast: [] (preenchido depois pelo getFilmeDetails)
 */
export function formatResultToFilme(result: SearchResult) {
  throw new Error('TODO: Implementar formatResultToFilme()')
}
