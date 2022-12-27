import { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcion.service'
import { MoveList } from '../cmps/MoveList'

export class Home extends Component {
    state = {
        user: null,
        bitcoin: null
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser() {
        const user = userService.getUser()
        this.setState({ user }, () => {
            if(this.state.user) this.getBitcoin()
            else this.props.history.push('/signup')
        })

    }

    async getBitcoin() {
        const bitcoin = await bitcoinService.getRate(this.state.user.coins)
        this.setState({ bitcoin: bitcoin.data })
    }

    render() {
        const { user, bitcoin } = this.state
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