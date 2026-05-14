import { useState, useEffect } from 'react'
import axios from 'axios'

const usuariosIniciais: { id: number; name: string }[] = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
]

export default function App() {
  const [usuarios, setUsuarios] = useState<typeof usuariosIniciais>(usuariosIniciais)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setUsuarios(res.data)
        setCarregando(false)
      })
      .catch((err) => console.error(err))
  }, [])

  if (carregando) return <p>Carregando...</p>

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
