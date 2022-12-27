import { Link } from "react-router-dom"
import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { TransferFund } from "../cmps/TransferFund"
import { userService } from "../services/user.service"
import { MoveList } from "../cmps/MoveList"

export class ContactDetails extends Component {
    state = {
        contact: null,
        user: null,
        moves: null
    }

    componentDidMount() {
        this.loadContact()
    }

    getUser = () => {
        const user = userService.getUser()
        const moves = user.moves.filter(move => this.state.contact._id === move.toId)
        this.setState({ moves })
        this.setState({ user })
    }

    updateUser = (amount) => {
        var user = { ...this.state.user }
        user.coins -= amount
        userService.addMove(this.state.contact, amount, user)
        this.setState({ user } , () => {
            const moves = this.state.user.moves.filter(move => this.state.contact._id === move.toId)
            this.setState({ moves })
        })
    }

    loadContact = async () => {
        try {
            const contact = await contactService.getContactById(this.props.match.params.id)
            this.setState({ contact }, () => this.getUser())
        } catch (err) {
            console.log('error' + err)
        }
    }

    render() {
        const { contact, user , moves } = this.state
        if (!contact) return <div>Loading...</div>
        return (
            <section className='contact-details container'>
                <img src={require(`../assets/imgs/avatar.png`)} alt="" />
                <nav>
                    <Link to='/contact'><button>Back</button></Link>
                    <Link to={`/contact/edit/${contact._id}`}><button>Edit</button></Link>
                </nav>
                <p>Name: {contact.name}</p>
                <p>Phone: {contact.phone}</p>
                <p>Email: {contact.email}</p>
                <TransferFund updateUser={this.updateUser}></TransferFund>
                <h1>Your moves:</h1>
                {(user && moves.length) && <MoveList moves={moves} contact={contact}></MoveList>}
            </section>
        )
    }
}
