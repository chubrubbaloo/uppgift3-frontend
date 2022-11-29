export default class User{
    username

    constructor(username) {
        this.username = username
    }

    equals(otherUser){
        if (!(otherUser instanceof User)){
            return false
        }
        return (this.username === otherUser.username)
    }
}
