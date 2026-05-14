import { StarIcon } from '@phosphor-icons/react'

// adicione as props necessárias para o componente Banner, como imageUrl, title, year, rating, etc.

export function Banner() {
  return (
    <>
      <div role="button">
        <div>
          <div>
            <img src="./banner.png" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        <h3>Titulo</h3>
        <div>
          <span>2026</span>
          <span>
            <StarIcon weight="fill"/> 7.0
          </span>
        </div>
      </div>
    </>
  )
}
