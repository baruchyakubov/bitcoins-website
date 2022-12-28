import { userService } from "../../services/user.service"

export function setUser() {
    return (dispatch) => {
        const user = userService.getUser()
        dispatch({ type: 'SET_USER', user })
        return user
    }
}

export function signUp(name) {
    return (dispatch) => {
        const user = userService.signUp(name)
        dispatch({ type: 'SET_USER', user })
        return user
    }
}

export function logout() {
    return (dispatch) => {
        const user = userService.logout()
        dispatch({ type: 'LOGOUT', user })
        return user
    }
}

export function updateUser(contact, amount, User) {
    return (dispatch) => {
        const user = userService.addMove(contact, amount, User)
        dispatch({ type: 'UPDATE_USER', user })
        return user
    }
}