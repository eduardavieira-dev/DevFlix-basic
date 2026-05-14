import { MagnifyingGlassIcon } from '@phosphor-icons/react'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div>
      <MagnifyingGlassIcon size={20} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar filmes ou séries..."
        className=""
      />
    </div>
  )
}
