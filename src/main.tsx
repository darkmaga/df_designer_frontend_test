import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { worker } from './mocks/browser.js'

// this condition doesn`t model real server, because it runs asynchronous and first response is always 404
// if (process.env.NODE_ENV === 'development') {
//   import('./mocks/browser.js').then(({ worker }) => worker.start())
// }
worker.start()

const domNode = document.getElementById('root')
const root = createRoot(domNode!)

root.render(<App />)
