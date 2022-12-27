import { Component } from 'react'

export class TransferFund extends Component {
    state = {
        coins:0
    }
    componentDidMount() { }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        this.setState({ [field]: value })
    }

    updateUser = (ev) =>{
        ev.preventDefault()
        this.props.updateUser(this.state.coins)
        this.setState({coins:0})
    }

    render() {
        const { coins } = this.state
        return (
            <section className='transfer-fund container'>
                <h1>Transfer coins to baruch</h1>
                <form onSubmit={this.updateUser}>
                    <label htmlFor="coins">Amount:</label>
                    <input onChange={this.handleChange} value={coins} type="text" name="coins" id="coins" />
                    <button>Transfer</button>
                </form>
            </section>
        )
    }
}