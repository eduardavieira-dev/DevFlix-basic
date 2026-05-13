import { useRef } from "react"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import type { Filme } from "../../../../types/filme"

export function Carousel({ filme }: { filme: Filme }) {
  const carouselRef = useRef<HTMLDivElement>(null)

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    })
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    })
  }
  return (
    <>
      {/* elenco */}
      <div className="border-t border-white/10 bg-black/95 px-4 pb-8 pt-6 md:px-8">
        {/* topo */}
        <div className="flex items-center mb-5">
          <h3 className="text-lg md:text-2xl font-semibold text-center justify-center flex-1">
            Elenco principal
          </h3>
        </div>

        {/* carrossel */}
        <div className="flex items-center gap-1">
          {/* botão esquerdo (fora do container rolável) */}
          <div className="flex-none">
            <button
              onClick={scrollLeft}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-cyan-500"
              aria-label="Scroll left"
            >
              <CaretLeftIcon size={18} />
            </button>
          </div>

          {/* container rolável (flex-1 para não ser coberto) */}
          <div
            ref={carouselRef}
            className="flex-1 flex gap-3 overflow-x-auto scroll-smooth hide-scrollbar px-3 pb-1 sm:px-6 sm:pl-2"
          >
            {filme.cast.map((actor) => (
              <div key={actor.name} className="w-30 shrink-0">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg transition-transform duration-200">
                  <img
                    src={actor.image}
                    alt={actor.name}
                    className="h-30 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://placehold.co/300x300/404040/FFFFFF?text=Sem+Foto'
                    }}
                  />
                </div>

                <div className="px-2 py-3 text-center">
                  <h4 className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                    {actor.name}
                  </h4>

                  <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-2">
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}

            {filme.cast.length === 0 && (
              <p className="px-2 py-4 text-sm text-neutral-400">
                Elenco indisponivel para este titulo.
              </p>
            )}
          </div>

          {/* botão direito (fora do container rolável) */}
          <div className="flex-none">
            <button
              onClick={scrollRight}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-cyan-500"
              aria-label="Scroll right"
            >
              <CaretRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
