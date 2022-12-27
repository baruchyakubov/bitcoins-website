import { storageService } from "./storage.service"

export const userService = {
    getUser,
    signUp,
    addMove
}


var gUser

function getUser() {
    var user = storageService.load('user')
    gUser = user
    return gUser
}

function signUp(name) {
    gUser = {
        name,
        coins: 100,
        moves: []
    }
    storageService.store('user', gUser)
}



function addMove(contact, amount , updatedUser) {
    gUser = updatedUser
    gUser.moves.unshift({
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    )
    storageService.store('user', gUser)
    return gUser
}