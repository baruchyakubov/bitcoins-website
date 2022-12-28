import { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/user.actions'

export class _SignupPage extends Component {
    state = {
        name: ''
    }

    componentDidMount() { 
        if (this.props.user)  this.props.history.push('/')
    }

    signup = (ev) => {
        ev.preventDefault()
        this.props.signUp(this.state.name)
        this.props.history.push('/')
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        console.log(field);
        this.setState({ [field]: value })
    }

    render() {
        const { name } = this.state
        return (
            <form onSubmit={this.signup} className='signup-page container'>
                <img src={require(`../assets/imgs/bitcoin-icon.png`)} alt="" />
                <h1>Please enter your name:</h1>
                <label htmlFor="name">name</label>
                <input onChange={this.handleChange} value={name} type="text" placeholder='Name' name="name" id="name"/>
                <button>Signup</button>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userModule.user,
})

const mapDispatchToProps = {
    signUp
}

export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)