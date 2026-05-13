import { PlayIcon, StarIcon, XIcon } from '@phosphor-icons/react'
import type { Filme } from '../../types/filme'
import { Carousel } from './_components/Carousel/page'

export type CastMember = {
  name: string
  image: string
  character: string
}

type ModalProps = {
  filme: Filme
  fecharModal: () => void
}

export function Modal({ filme, fecharModal }: ModalProps) {
  return (
    <div
      onClick={fecharModal}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center

        overflow-y-auto
        bg-black/15
        backdrop-blur-sm
        p-2
        md:p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          mx-auto
          w-full
          max-w-5xl

          max-h-[95vh]
          overflow-y-auto
          rounded-3xl
          border
          border-white/10
          bg-black/95
          shadow-2xl
          shadow-black/50
        "
      >
        {/* banner */}
        <div
          className="
            relative

            min-h-115
            md:min-h-105
          "
        >
          <img
            src={filme.bannerUrl}
            alt={filme.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x700/202020/FFFFFF?text=Sem+Banner'
            }}
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/65" />

          {/* degradê */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent" />

          {/* fechar */}
          <button
            onClick={fecharModal}
            className="
              absolute
              right-4
              top-4
              sm:right-3
              sm:top-3
              z-50

              flex
              h-12
              w-12
              sm:h-10
              sm:w-10
              items-center
              justify-center

              rounded-full
              bg-black/60
              text-white

              transition
              hover:bg-black
            "
          >
            <XIcon size={22} weight="bold" />
          </button>

          {/* conteúdo */}
          <div
            className="
              relative
              z-20

              flex
              flex-col
              md:flex-row

              gap-5

              p-4
              md:p-8

              pt-16
              md:pt-24
            "
          >
            {/* poster */}
            <div
              className="
                mx-auto
                md:mx-0

                w-45
                sm:w-55
                md:w-47.5

                shrink-0
              "
            >
              <img
                src={filme.imageUrl}
                alt={filme.title}
                className="
                  aspect-2/3
                  w-full
                  rounded-2xl
                  object-cover
                  border
                  border-white/10
                  shadow-2xl
                "
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/300x450/404040/FFFFFF?text=Sem+Imagem'
                }}
              />
            </div>

            {/* infos */}
            <div className="flex-1">
              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-5xl

                  font-bold
                  mb-3
                  text-center
                  md:text-left
                "
              >
                {filme.title}
              </h2>

              {/* infos */}
              <div
                className="
                  mb-4

                  flex
                  flex-wrap

                  justify-center
                  md:justify-start

                  items-center
                  gap-3

                  text-sm
                  text-neutral-300
                "
              >
                <span className="flex items-center gap-1">
                  <StarIcon weight="fill" className="text-amber-400" />

                  {filme.rating.toFixed(1)}
                </span>

                <span>{filme.year}</span>

                <span>{filme.duration}</span>
              </div>

              {/* descrição */}
              <p
                className="
                  text-sm
                  md:text-base

                  leading-relaxed
                  text-neutral-200

                  mb-5
                "
              >
                {filme.description}
              </p>

              {/* gêneros */}
              <div
                className="
                  flex
                  flex-wrap
                  gap-2

                  mb-5
                "
              >
                {filme.genres.split(/[,•]/).map((genre) => (
                  <span
                    key={genre}
                    className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/5

                        px-3
                        py-1

                        text-xs
                        md:text-sm
                      "
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* botões */}
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row

                  gap-3
                "
              >
                <a
                  href={filme.watchUrl}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    rounded-full
                    bg-cyan-500

                    px-5
                    py-3

                    text-sm
                    font-semibold
                    text-white

                    transition
                    hover:bg-cyan-600
                  "
                >
                  <PlayIcon weight="fill" />
                  Assistir agora
                </a>
              </div>
            </div>
          </div>
        </div>
        <Carousel filme={filme} />
      </div>
    </div>
  )
}
