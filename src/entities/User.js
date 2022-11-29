export default class User{
    username
    token

    constructor(username, token=null) {
        this.username = username
        this.token = token
    }

    equals(otherUser){
        if (!(otherUser instanceof User)){
            return false
        }
        return (this.username === otherUser.username)
    }

    isLoggedIn(){
        return !!this.token
    }
}
