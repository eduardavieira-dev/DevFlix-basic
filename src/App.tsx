'use client'
import './App.css'
import { useState, useEffect } from 'react'
import { FilmSlateIcon } from '@phosphor-icons/react'
import { SearchInput } from './components/SearchInput/page'
import { Banner } from './components/Banner/pages'
import { Modal } from './components/Modal/page'
import { searchMulti, getPopular, formatResultToFilme, getFilmeDetails } from './services/tmdbApi'
import type { Filme } from './types/filme'
import { Footer } from './components/Footer/pages'

function App() {
  const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filmes, setFilmes] = useState<Filme[]>([])
  const [loading, setLoading] = useState(false)

  // Carrega filmes populares quando a página abre
  useEffect(() => {
    loadPopularFilmes()
  }, [])

  // Busca filmes populares ao iniciar
  async function loadPopularFilmes() {
    setLoading(true)
    const results = await getPopular()
    // Pega apenas os primeiros 12 resultados
    const filmesFomatados = results.slice(0, 12).map(formatResultToFilme)
    setFilmes(filmesFomatados)
    setLoading(false)
  }

  // Busca filmes conforme o usuário digita
  async function handleSearch(term: string) {
    setSearchTerm(term)
    setLoading(true)

    if (term.trim().length === 0) {
      // Se limpou o campo, mostra populares de novo
      await loadPopularFilmes()
    } else {
      // Busca por termo
      const results = await searchMulti(term)
      // Pega apenas os primeiros 12 resultados
      const filmesFomatados = results.slice(0, 12).map(formatResultToFilme)
      setFilmes(filmesFomatados)
    }

    setLoading(false)
  }

  const semResultados = searchTerm.trim().length > 0 && filmes.length === 0

  // Função para carregar detalhes completos do filme (com elenco)
  async function handleFilmeClick(filme: Filme) {
    const detalhes = await getFilmeDetails(filme.id, filme.mediaType)
    // Atualiza o filme com elenco, gêneros, duração e URL do trailer completos
    const filmeComDetalhes: Filme = {
      ...filme,
      cast: detalhes.cast,
      genres: detalhes.genres,
      duration: detalhes.duration,
      watchUrl: detalhes.trailerUrl,
    }
    setSelectedFilme(filmeComDetalhes)
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="max-w-7xl flex flex-col mx-auto p-4">
        <h1 className="text-2xl font-bold flex gap-1 items-center mt-3 text-center justify-center">
          <FilmSlateIcon className="text-cyan-400" />
          Dev<span className="text-cyan-400">Flix</span>
        </h1>
        <p className='text-neutral-400 text-sm text-center justify-center mb-5 md:mb-8'>Consumindo a API do The Movie Database (TMDB) com React e TypeScript</p>
        <section>
          <SearchInput value={searchTerm} onChange={handleSearch} />
          <div className="max-w-5xl grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 sm:gap-4 mx-auto p-3 sm:p-5">
            {loading && (
              <span className="col-span-full text-center text-sm text-neutral-400">
                Carregando...
              </span>
            )}
            {!loading &&
              filmes.map((filme) => (
                <div key={filme.id} onClick={() => handleFilmeClick(filme)}>
                  <Banner
                    imageUrl={filme.imageUrl}
                    title={filme.title}
                    year={filme.year}
                    rating={filme.rating}
                  />
                </div>
              ))}
            {!loading && semResultados && (
              <span className="col-span-full text-center text-md text-neutral-400">
                Filme não encontrado
              </span>
            )}
          </div>
        </section>
      </main>

      {selectedFilme && <Modal filme={selectedFilme} fecharModal={() => setSelectedFilme(null)} />}
        <Footer/>
    </div>
  )
}

export default App
