import { StarIcon } from '@phosphor-icons/react'

type BannerProps = {
  imageUrl: string
  title: string
  year: number
  rating: number
}

export function Banner({ imageUrl, title, year, rating }: BannerProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
          }
        }}
        className="w-full flex flex-col gap-2 text-left cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        <div className="relative w-full">
          <div className="aspect-[2/3] w-full overflow-hidden rounded-md">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          </div>
        </div>
        <h3 className="text-md font-medium line-clamp-1">{title}</h3>
        <div className="text-xs flex items-center gap-2 justify-between text-neutral-300">
          <span>{year}</span>
          <span className="flex items-center gap-1">
            <StarIcon weight="fill" className="text-amber-400" /> {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </>
  )
}
