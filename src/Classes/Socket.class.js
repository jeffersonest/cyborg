import websocket from 'socket.io'

class Socket {
    constructor(http){
        this.io = websocket(http)
        this.onConnection()
    }

    onConnection(){
        this.io.on('connection', (socket) => {
            console.log("Connected on server!", socket.id)
            socket.emit('connected', `Client connected with success! ${socket.id}`)
        })
    }
}

export default Socket