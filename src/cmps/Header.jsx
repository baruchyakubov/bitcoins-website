import { NavLink } from 'react-router-dom'

export function Header({ ChangePage }) {
  return (
    <header className="Header container">
      <NavLink exact to="/">
        <button>
          <img src={require(`../assets/imgs/home.png`)} alt="" />
        </button>
      </NavLink>
      <NavLink to="/contact">
        <button>
          <img src={require(`../assets/imgs/contact.png`)} alt="" />
        </button>
      </NavLink>
      <NavLink to="/stats">
        <button>
          <img src={require(`../assets/imgs/stats.png`)} alt="" />
        </button>
      </NavLink>
    </header >
  )
}