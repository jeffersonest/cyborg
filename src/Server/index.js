import express from "express";
import mainRoutes from "../Routes/main.routes"
import Cyborg from "../Classes/Cyborg.class"
import http from "http"
import Socket from '../Classes/Socket.class'

class Server {
  app = express();
  http = http.createServer(this.app)
  cyborg = new Cyborg("amqp://localhost")
  socket = new Socket(this.http)

  constructor() {
    this.routes()
    this.workers()
  }

  async workers() {
    await this.cyborg.sendToQueue("queue01", "Queue created, status: Online")
    let x = 0  
    setInterval(() => {
      x++
      this.cyborg.sendToQueue("queue01", `[Queue Processed!][${x}]`);
      x++
      this.cyborg.sendToQueue("queue01", `[Queue Processed!][${x}][Twice]`);
    }, 300);

    await this.cyborg.consumeQueue("queue01")
  }


  routes() {
    this.app.use(mainRoutes)
  }

  listen(PORT) {
    this.http.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`)
    });
  }
}

export default new Server()
