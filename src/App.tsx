import { Header } from './components/Header'
import { NewTask } from './components/NewTask'

import style from './App.module.css'

export function App() {
  return (
    <div className="App">
      <Header />

      <main className={style.main}>
        <NewTask />
      </main>
    </div>
  )
}
