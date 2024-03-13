import { Request, Response } from 'express';
import Webhook from '../models/webhooks';

export const registerWebhook = async (req: Request, res: Response): Promise<void> => {
  const { url, eventType } = req.body;
  try {
    let webhook = new Webhook({ url, eventType });
    await webhook.save();
    res.status(201).json(webhook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const listWebhooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const webhooks = await Webhook.find();
    res.json(webhooks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
