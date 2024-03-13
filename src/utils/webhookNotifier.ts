import axios from 'axios';
import Webhook from '../models/webhooks';

export const notifyWebhooks = async (eventType: string, data: any): Promise<void> => {
  try {
    const webhooks = await Webhook.find({ eventType });
    webhooks.forEach(webhook => {
      axios.post(webhook.url, data)
           .then(response => console.log(`Webhook sent to ${webhook.url} with status: ${response.status}`))
           .catch(error => console.error(`Error sending webhook to ${webhook.url}: ${error}`));
    });
  } catch (error) {
    console.error(`Error notifying webhooks for event ${eventType}: ${error}`);
  }
};
