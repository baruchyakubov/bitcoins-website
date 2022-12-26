import { Link } from "react-router-dom"
import { Component } from 'react'
import { contactService } from '../services/contact.service'

export class ContactDetails extends Component {
    state = {
        contact: null
    }

    componentDidMount() {
        this.loadContact()
    }

    loadContact = async () => {
        try {
            const contact = await contactService.getContactById(this.props.match.params.id)
            this.setState({ contact })
        } catch (err) {
            console.log('error' + err)
        }
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>
        return (
            <section className='contact-details container'>
                <img src={require(`../assets/imgs/avatar.png`)} alt="" />
                <p>Name: {contact.name}</p>
                <p>Phone: {contact.phone}</p>
                <p>Email: {contact.email}</p>
                <nav>
                    <Link to='/contact'><button>Back</button></Link>
                    <Link to={`/contact/edit/${contact._id}`}><button>Edit</button></Link>
                </nav>

            </section>
        )
    }
}