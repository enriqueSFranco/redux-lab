import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { worker } from './api/server.ts'
import { fetchUsers } from './features/users/usersSlice.ts'


if (process.env.NODE_ENV === 'development') {
  worker.start()
  store.dispatch(fetchUsers())
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
