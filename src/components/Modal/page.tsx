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
            "
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/1200x700/202020/FFFFFF?text=Sem+Banner'
            }}
          />

          {/* overlay */}
          <div className="" />

          {/* degradê */}
          <div className="" />

          {/* fechar */}
          <button
            onClick={fecharModal}
            className="

            "
          >
            <XIcon size={22} weight="bold" />
          </button>

          {/* conteúdo */}
          <div
            className="

            "
          >
            {/* poster */}
            <div
              className="
              "
            >
              <img
                src={filme.imageUrl}
                alt={filme.title}
                className="
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
                "
              >
                {filme.title}
              </h2>

              {/* infos */}
              <div
                className="
                "
              >
                <span className="">
                  <StarIcon weight="fill" className="" />

                  {filme.rating.toFixed(1)}
                </span>

                <span>{filme.year}</span>

                <span>{filme.duration}</span>
              </div>

              {/* descrição */}
              <p
                className="
                "
              >
                {filme.description}
              </p>

              {/* gêneros */}
              <div
                className="
                "
              >
                {filme.genres.split(/[,•]/).map((genre) => (
                  <span
                    key={genre}
                    className="
                      "
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* botões */}
              <div
                className="
                "
              >
                <a
                  href={filme.watchUrl}
                  className="
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
