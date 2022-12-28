import { Link } from "react-router-dom"
import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { TransferFund } from "../cmps/TransferFund"
import { MoveList } from "../cmps/MoveList"
import { connect } from 'react-redux'
import { updateUser } from '../store/actions/user.actions'


class _ContactDetails extends Component {
    state = {
        contact: null,
        moves: null
    }

    componentDidMount() {
        console.log(this.props);
        this.loadContact()
    }

    getUser = () => {
        const moves = this.props.user.moves.filter(move => this.state.contact._id === move.toId)
        this.setState({ moves })
    }

    updateUser = (amount) => {
        var user = { ...this.props.user }
        user.coins -= amount
        // userService.addMove(this.state.contact, amount, user)
        this.props.updateUser(this.state.contact, amount, user)
        this.setState({ user }, () => {
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
        const { contact, moves } = this.state
        if (!contact) return <div>Loading...</div>
        return (
            <section className='contact-details container'>
                <div className="details">
                    <nav>
                        <Link to='/contact'><img src={require(`../assets/imgs/back.png`)} alt="" /></Link>
                        <Link to={`/contact/edit/${contact._id}`}><img src={require(`../assets/imgs/edit.png`)} alt="" /></Link>
                    </nav>
                    <section>
                        <img src={require(`../assets/imgs/avatar.png`)} alt="" />
                        <div>
                            <p>Name: {contact.name}</p>
                            <p>Phone: {contact.phone}</p>
                            <p>Email: {contact.email}</p>
                        </div>

                    </section>
                </div>

                <TransferFund contact={contact} updateUser={this.updateUser}></TransferFund>
                <h1>Your moves:</h1>
                {(moves?.length) && <MoveList moves={moves} contact={contact}></MoveList>}
            </section>
        )
    }
}


const mapStateToProps = state => ({
    user: state.userModule.user,
})

const mapDispatchToProps = {
    updateUser
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
