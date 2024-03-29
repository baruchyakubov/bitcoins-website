import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

export function _Header({ user }) {
  if (!user) return <div></div>
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

const mapStateToProps = state => ({
  user: state.userModule.user,
})

export const Header = connect(mapStateToProps, null)(_Header)