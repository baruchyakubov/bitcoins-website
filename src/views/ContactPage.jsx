import { Component } from 'react'
import { connect } from 'react-redux'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { loadContacts , setFilterBy } from '../store/actions/contact.actions'

class _ContactPage extends Component {

    componentDidMount() {
        this.props.loadContacts()
    }

    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }

    render() {
        const { contacts, filterBy } = this.props
        if (!contacts) return <div>Loading...</div>
        return (
            <section className='contact-page container'>
                <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy} />
                <ContactList contacts={contacts} />
            </section>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,

})

const mapDispatchToProps = {
    loadContacts,
    setFilterBy
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)