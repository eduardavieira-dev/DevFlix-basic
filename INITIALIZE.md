## Como criar o projeto React (mini tutorial)

1) Criar o projeto com Vite

- Rode: 
```
npm create vite@latest
```


- Quando pedir: escolha um nome para o projeto, selecione Framework -> React e, em Variant, escolha "react-ts" para TypeScript ou "react" para JavaScript.
- Alternativa (criar já com template TypeScript):
```
	npm create vite@latest my-app -- --template react-ts
```
2) Instalar dependências

cd my-app
npm install

3) Instalar e configurar Tailwind (resumo)

- Instale: 
```
npm install tailwindcss @tailwindcss/vite
```
- Crie config: npx tailwindcss init -p
- Cole isso no seu vite.config.ts

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```
- Adicione esse import no seu App.css
```
@import "tailwindcss";
```

4) Instalar libs úteis
```
npm i @phosphor-icons/react axios
```
5) Rodar o projeto
```
npm run dev
```
6) Build e preview

npm run build
npm run preview

Pronto — agora você tem um projeto React criado com Vite (opção TypeScript se escolhida), Tailwind configurado e as libs básicas instaladas.