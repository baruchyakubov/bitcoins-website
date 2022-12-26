import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'

export class ContactPage extends Component {

    state = {
        contacts: null,
        filterBy: {
            txt: ''
        }
    }

    componentDidMount() {
        this.loadContacts()
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        } catch (err) {
            console.log('err:', err)
        }
    }

    onChangeFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, this.loadContacts)
    }

    render() {
        const { contacts , filterBy } = this.state
        if (!contacts) return <div>Loading...</div>
        return (
            <section className='contact-page container'>
                <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy} />
                <ContactList onSelectContactId={this.onSelectContactId} contacts={contacts} />
            </section>
        )
    }
}