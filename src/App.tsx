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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPopularFilmes()
  }, [])

  async function loadPopularFilmes() {}

  async function handleSearch(term: string) {
    setSearchTerm(term)
  }

  async function handleFilmeClick(filme: Filme) {
    // Abre o modal com os detalhes do filme selecionado
    setSelectedFilme(filme)
  }

  const filmes: Filme[] = [
    {
      id: 1,
      title: 'O drama',
      year: 2026,
      rating: 7.0,
      imageUrl: './banner.png',
      bannerUrl: './background.png',
      duration: '2h 15m',
      genres: 'Drama, Ficção Científica',
      description:
        'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
      watchUrl: '#',
      cast: [
        { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
        { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
      ],
      mediaType: 'movie',
    },
    {
      id: 2,
      title: 'Gente Grande',
      year: 2026,
      rating: 7.0,
      imageUrl: './banner.png',
      bannerUrl: './background.png',
      duration: '2h 15m',
      genres: 'Drama, Ficção Científica',
      description:
        'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
      watchUrl: '#',
      cast: [
        { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
        { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
      ],
      mediaType: 'movie',
    },
    {
      id: 3,
      title: 'Stranger Things',
      year: 2026,
      rating: 7.0,
      imageUrl: './banner.png',
      bannerUrl: './background.png',
      duration: '2h 15m',
      genres: 'Drama, Ficção Científica',
      description:
        'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
      watchUrl: '#',
      cast: [
        { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
        { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
      ],
      mediaType: 'movie',
    },
    {
      id: 4,
      title: 'Sabrina',
      year: 2026,
      rating: 7.0,
      imageUrl: './banner.png',
      bannerUrl: './background.png',
      duration: '2h 15m',
      genres: 'Drama, Ficção Científica',
      description:
        'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
      watchUrl: '#',
      cast: [
        { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
        { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
      ],
      mediaType: 'movie',
    },
  ]

  return (
    <div>
      <main>
        <h1>
          <FilmSlateIcon/>
          Dev<span>Flix</span>
        </h1>
        <p>
          Consumindo a API do The Movie Database (TMDB) com React e TypeScript
        </p>
        <section>
          <SearchInput value={searchTerm} onChange={handleSearch} />
          <div>
            {loading && (
              <span className="col-span-full text-center text-sm text-neutral-400">
                Carregando...
              </span>
            )}
            {!loading &&
              filmes.map((filme) => (
                <div key={filme.id} onClick={() => handleFilmeClick(filme)}>
                  //adciocionar o componente Banner do filme
                </div>
              ))}
          </div>
        </section>
      </main>

      {/*{selectedFilme && <Modal filme={selectedFilme} fecharModal={() => setSelectedFilme(null)} />}*/}
    </div>
  )
}

export default App
