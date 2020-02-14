import amqp from "amqplib";
import Socket from "./Socket.class";

class Cyborg {
  amqp = amqp;

  constructor(Url) {
    this.Url = Url;
  }

  async getConnection() {
    return await this.amqp.connect(this.Url);
  }

  async getChannel() {
    const connection = await this.getConnection();
    return await connection.createChannel();
  }

  async sendToQueue(queueName, data) {
    const bufferData = Buffer.from(data);
    const channel = await this.getChannel();
    await channel.assertQueue(queueName, { durable: true });
    await channel.sendToQueue(queueName, bufferData);
  }

  async consumeQueue(queueName) {
    const channel = await this.getChannel();
    await channel.consume(queueName, msg => {
      const content = msg.content.toString();

      
        console.log(`[Worker][Queue-${queueName}] Message processed: `, content);
        
      
      
      channel.ack(msg);
    });
    console.info(`[Worker][Queue-${queueName}] Listening...`);
  }
}

export default Cyborg;
