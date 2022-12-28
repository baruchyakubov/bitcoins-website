import { Component } from 'react'
import { bitcoinService } from '../services/bitcion.service'
import { MoveList } from '../cmps/MoveList'
import { connect } from 'react-redux'

class _Home extends Component {
    state = {
        bitcoin: null
    }

    componentDidMount() {
        if (!this.props.user)  this.props.history.push('/signup')
        console.log(this.props.user);
        this.getBitcoin(this.props.user)
    }

    async getBitcoin(user) {
        const bitcoin = await bitcoinService.getRate(user.coins)
        this.setState({ bitcoin: bitcoin.data })
    }

    render() {
        const { bitcoin } = this.state
        const { user } = this.props
        if (!user) return <div>Loading...</div>
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
                {(user && user.moves.length) && <MoveList moves={user.moves.slice(0,3)}></MoveList>}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userModule.user,
})


export const Home = connect(mapStateToProps, null)(_Home)