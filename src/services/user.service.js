import { storageService } from "./storage.service"

export const userService = {
    getUser,
    signUp,
    addMove
}

var gUser = {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
}

function getUser() {
    return gUser
}

// var gUser

// function getUser() {
//     var user = storageService.load('user')
//     gUser = user
//     return gUser
// }

function signUp(name) {
    gUser = {
        name,
        coins: 100,
        moves: []
    }
}

function addMove(contact, amount) {
    gUser.moves.unshift({
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    )
}