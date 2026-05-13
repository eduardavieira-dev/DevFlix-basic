'use client'
import './App.css'
import { useState } from 'react'
import { FilmSlateIcon } from '@phosphor-icons/react'
import { SearchInput } from './components/SearchInput/page'
import { Banner } from './components/Banner/pages'
import { Modal } from './components/Modal/page'
import type { Filme } from './types/filme'

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
    description: 'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
    watchUrl: '#',
    cast: [
      { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
      { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
    ],
    mediaType: 'movie',
  },
  {
    id: 2,
    title: 'O drama',
    year: 2026,
    rating: 7.0,
    imageUrl: './banner.png',
    bannerUrl: './background.png',
    duration: '2h 15m',
    genres: 'Drama, Ficção Científica',
    description: 'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
    watchUrl: '#',
    cast: [
      { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
      { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
    ],
    mediaType: 'movie',
  },
  {
    id: 3,
    title: 'O drama',
    year: 2026,
    rating: 7.0,
    imageUrl: './banner.png',
    bannerUrl: './background.png',
    duration: '2h 15m',
    genres: 'Drama, Ficção Científica',
    description: 'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
    watchUrl: '#',
    cast: [
      { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
      { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
    ],
    mediaType: 'movie',
  },
  {
    id: 4,
    title: 'O drama',
    year: 2026,
    rating: 7.0,
    imageUrl: './banner.png',
    bannerUrl: './background.png',
    duration: '2h 15m',
    genres: 'Drama, Ficção Científica',
    description: 'Uma história épica de drama e ficção científica que vai te deixar preso na tela.',
    watchUrl: '#',
    cast: [
      { name: 'Ator 1', image: './banner.png', character: 'Personagem Principal' },
      { name: 'Ator 2', image: './banner.png', character: 'Coadjuvante' },
    ],
    mediaType: 'movie',
  },
]

function App() {
  const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null)

  const [searchTerm, setSearchTerm] = useState('')

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const semResultados = searchTerm.trim().length > 0 && filmesFiltrados.length === 0

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="max-w-7xl flex flex-col mx-auto p-4">
        <h1 className="text-2xl font-bold flex gap-1 items-center mt-3 mb-5 md:mb-10 text-center justify-center">
          <FilmSlateIcon className="text-cyan-400" />
          Dev<span className="text-cyan-400">Flix</span>
        </h1>
        <section>
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <div className="max-w-5xl grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 sm:gap-4 mx-auto p-3 sm:p-5">
            {filmesFiltrados.map((filme) => (
              <div key={filme.id} onClick={() => setSelectedFilme(filme)}>
                <Banner
                  imageUrl={filme.imageUrl}
                  title={filme.title}
                  year={filme.year}
                  rating={filme.rating}
                />
              </div>
            ))}
            {semResultados && (
              <span className="col-span-full text-center text-md text-neutral-400">
                Filme não encontrado
              </span>
            )}
          </div>
        </section>
      </main>

      {selectedFilme && <Modal filme={selectedFilme} fecharModal={() => setSelectedFilme(null)} />}
    </div>
  )
}

export default App
