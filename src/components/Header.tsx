import style from './Header.module.css'

import logo from '../assets/todo-logo.svg'

export function Header() {
  return (
    <header className={style.header}>
      <img src={logo} alt="Logo Todo" />
    </header>
  )
}
