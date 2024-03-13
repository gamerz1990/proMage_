import mongoose, { Document, Schema } from 'mongoose';

interface IWebhook extends Document {
  url: string;
  eventType: 'projectCreated' | 'projectUpdated' | 'taskCreated' | 'taskUpdated';
}

const webhookSchema: Schema = new Schema({
  url: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['projectCreated', 'projectUpdated', 'taskCreated', 'taskUpdated'],
  },
});

const Webhook = mongoose.model<IWebhook>('Webhook', webhookSchema);
export default Webhook;
