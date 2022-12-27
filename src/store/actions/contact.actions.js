import { contactService } from "../../services/contact.service"

export function loadContacts() {

    return async (dispatch, getState) => {
        try {
            const filterBy = getState().contactModule.filterBy
            const contacts = await contactService.getContacts(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeContact(contactId) {

    return async (dispatch) => {
        try {
            await contactService.deleteContact(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function updateContact(updatedContact) {

    return async (dispatch) => {
        try {
            const contact = await contactService.saveContact(updatedContact)
                (updatedContact._id) ? dispatch({ type: 'UPDATE_CONTACT', contact }) : dispatch({ type: 'ADD_CONTACT', contact })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}