import { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { removeContact, updateContact } from '../store/actions/contact.actions'
import { contactService } from '../services/contact.service'

export class _EditContact extends Component {
    state = {
        contact: contactService.getEmptyContact()
    }

    async componentDidMount() {
        const contactId = this.props.match.params.id
        if (contactId) {
            const contact = await contactService.getContactById(contactId)
            this.setState({ contact })
        }
    }

    onAddContact = async (ev) => {
        ev.preventDefault()
        try {
            this.props.updateContact({...this.state.contact})
            this.props.history.push('/contact')
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }

        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }), () => { console.log(this.state.contact); })
    }

    deleteContact = async () => {
        this.props.removeContact(this.state.contact._id)
        this.props.history.push(`/contact`)
    }

    render() {
        const { contact } = this.state
        if (!contact) return

        const { name, phone, email } = contact
        return (
            <section className='edit-page container'>
                <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
                <form onSubmit={this.onAddContact}>
                    <label htmlFor="name">Name:</label>
                    <input onChange={this.handleChange} value={name} type="text" name="name" id="name" />

                    <label htmlFor="phone">Phone:</label>
                    <input onChange={this.handleChange} value={phone} type="text" name="phone" id="phone" />

                    <label htmlFor="email">Email:</label>
                    <input onChange={this.handleChange} value={email} type="text" name="email" id="email" />

                    <section className='edit-btn'>
                        <button >{contact._id ? 'Save' : 'Add'}</button>
                        {contact._id && <button onClick={this.deleteContact}>Delete</button>}
                        <Link to={contact._id ? `/contact/${this.state.contact._id}` : '/contact'}><button>Back</button></Link>
                    </section>

                </form>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
})

const mapDispatchToProps = {
    removeContact,
    updateContact
}

export const EditContact = connect(mapStateToProps, mapDispatchToProps)(_EditContact)