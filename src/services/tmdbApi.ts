import axios from 'axios'
import type { Filme } from '../types/filme'

// Configuração base da API do TMDB
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const LANGUAGE = import.meta.env.VITE_TMDB_LANGUAGE || 'pt-BR'
const BASE_URL = 'https://api.themoviedb.org/3'

// Criando instância do axios com configuração padrão
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
})

// Interface para tipagem dos resultados da busca
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

// Interface para a resposta da API
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
 */
export async function searchMulti(query: string, page: number = 1): Promise<SearchResult[]> {
  try {
    // Se a query estiver vazia, retorna array vazio
    if (!query.trim()) {
      return []
    }

    // Chamando a rota /search/multi do TMDB
    const response = await tmdbClient.get<ApiResponse>('/search/multi', {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
    })

    // Filtrando apenas filmes e séries (removendo pessoas) e que têm poster
    return response.data.results.filter(
      (item) => item.poster_path !== null && item.media_type !== 'person'
    )
  } catch (error) {
    console.error('Erro ao buscar no TMDB:', error)
    return []
  }
}

/**
 * Busca os filmes/séries mais populares do TMDB
 * @param page - Número da página (padrão: 1)
 * @returns Array com os itens mais populares
 */
export async function getPopular(page: number = 1, ): Promise<SearchResult[]> {
  try {
    // Buscando filmes populares
    const response = await tmdbClient.get<ApiResponse>('/discover/movie', {
      params: {
        sort_by: 'popularity.desc',
        page,
      },
    })

    // Mapeando para o mesmo formato de SearchResult
    return response.data.results
      .map((item: any) => ({
        ...item,
        media_type: 'movie' as const,
        title: item.title,
      }))
      .filter((item) => item.poster_path !== null)
  } catch (error) {
    console.error('Erro ao buscar populares:', error)
    return []
  }
}

/**
 * Busca os detalhes completos de um filme com elenco
 * @param filmeId - ID do filme no TMDB
 * @param mediaType - Tipo de mídia: 'movie' ou 'tv'
 * @returns Objeto com detalhes do filme incluindo elenco formatado
 */
export async function getFilmeDetails(filmeId: number, mediaType: 'movie' | 'tv' = 'movie') {
  try {
    // Construindo a URL correta baseado no tipo de mídia
    const endpoint = `/${mediaType}/${filmeId}`

    // Buscando detalhes com elenco e vídeos incluídos
    const response = await tmdbClient.get(endpoint, {
      params: {
        append_to_response: mediaType === 'tv' ? 'aggregate_credits,videos' : 'credits,videos',
      },
    })

    const data = response.data
    // Para filmes usa 'credits', para séries usa 'aggregate_credits'
    const credits = mediaType === 'tv' ? data.aggregate_credits : data.credits

    // Pegando apenas os 6 primeiros atores do elenco
    const castFormatado = (credits.cast || [])
      .map((actor: any) => ({
        name: actor.name,
        character: actor.character || 'Personagem desconhecido',
        image: actor.profile_path
          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
          : 'https://placehold.co/185x278/404040/FFFFFF?text=Sem+Foto',
      }))

    // Buscando trailer (prioriza Trailer em YouTube)
    let trailerUrl = '#'
    if (data.videos?.results) {
      const trailer = data.videos.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      )
      if (trailer) {
        trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`
      }
    }

    return {
      cast: castFormatado,
      genres: data.genres?.map((g: any) => g.name).join(', ') || 'Gênero desconhecido',
      duration:
        mediaType === 'movie'
          ? `${data.runtime}m`
          : `${data.number_of_seasons} ${data.number_of_seasons === 1 ? 'temporada' : 'temporadas'}`,
      trailerUrl,
    }
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error)
    return {
      cast: [],
      genres: 'Gênero desconhecido',
      duration: '—',
      trailerUrl: '#',
    }
  }
}

/**
 * Converte URL relativa da imagem em URL completa para exibir no navegador
 * @param posterPath - Caminho relativo da imagem do TMDB
 * @returns URL completa da imagem ou caminho padrão
 */
export function getImageUrl(posterPath: string | null): string {
  if (!posterPath) {
    return './banner.png' // Imagem padrão se não houver poster
  }
  return `https://image.tmdb.org/t/p/w500${posterPath}`
}

/**
 * Converte resultado da API para o formato esperado pelo componente
 * @param result - Resultado da busca do TMDB
 * @returns Objeto formatado para usar nos componentes
 */
export function formatResultToFilme(result: SearchResult) {
  const title = result.title || result.name || 'Sem título'
  const year = new Date(result.release_date || result.first_air_date || '').getFullYear() || 2026
  // Garante que mediaType é sempre 'movie' ou 'tv' (não 'person')
  const mediaType: 'movie' | 'tv' = result.media_type === 'tv' ? 'tv' : 'movie'

  return {
    id: result.id,
    title,
    year,
    rating: result.vote_average,
    imageUrl: getImageUrl(result.poster_path),
    bannerUrl: getImageUrl(result.backdrop_path),
    duration: '—',
    genres: mediaType === 'tv' ? 'Série' : 'Filme',
    description: result.overview || 'Sem descrição disponível',
    watchUrl: '#',
    cast: [],
    mediaType,
  } as Filme
}
