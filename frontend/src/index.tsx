import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import Router from 'router'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<Router />)
