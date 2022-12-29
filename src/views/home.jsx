import { Component } from 'react'
import { bitcoinService } from '../services/bitcion.service'
import { MoveList } from '../cmps/MoveList'
import { connect } from 'react-redux'
import { logout } from '../store/actions/user.actions'

class _Home extends Component {
    state = {
        bitcoin: null
    }

    componentDidMount() {
        if (!this.props.user) this.props.history.push('/signup')
        console.log(this.props.user);
        this.getBitcoin(this.props.user)
    }

    async getBitcoin(user) {
        const bitcoin = await bitcoinService.getRate(user.coins)
        this.setState({ bitcoin: bitcoin.data })
    }

    logout = () => {
        this.props.logout()
        this.props.history.push('/signup')
    }

    render() {
        const { bitcoin } = this.state
        const { user } = this.props
        if (!user) return <div className="container">Loading...</div>
        return (
            <section className='home-page container'>
                <h1>hello {user.name}!</h1>
                <div>
                    <img src={require(`../assets/imgs/coins.png`)} alt="" />
                    <p>Coins: {user.coins}</p>
                </div>
                <div>
                    <img src={require(`../assets/imgs/bitcoins.png`)} alt="" />
                    <p>Bitcoin: {bitcoin}</p>
                </div>
                <h1>Your last moves:</h1>
                {(!user.moves.length) ? <div>No moves yet</div> :  <MoveList moves={user.moves.slice(0, 3)}></MoveList>}
                <button className='logout' onClick={this.logout}>Logout</button>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userModule.user,
})

const mapDispatchToProps = {
    logout
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)