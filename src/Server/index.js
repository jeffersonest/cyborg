import express from "express";
import mainRoutes from "../Routes/main.routes";
import Cyborg from "../Classes/Cyborg.class";

class Server {
  app = express();
  cyborg = new Cyborg("amqp://localhost");

  constructor() {
    this.routes();
    this.workers();
  }

  async workers() {
    await this.cyborg.sendToQueue("queue01", "Testing Queue...");
    let x = 0  
    setInterval(() => {
      x++
      this.cyborg.sendToQueue("queue01", `[Queue Processed!][${x}]`);
      x++
      this.cyborg.sendToQueue("queue01", `[Queue Processed!][${x}][Twice]`);
    }, 300);

    await this.cyborg.consumeQueue("queue01");
  }

  routes() {
    this.app.use(mainRoutes);
  }

  listen(PORT) {
    this.app.listen(PORT, (req, res, next) => {
      console.log(`Listening on port: ${PORT}`);
    });
  }
}

export default new Server();
