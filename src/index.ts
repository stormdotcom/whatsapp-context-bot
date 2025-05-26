import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router as webhookRouter } from './webhook.controller';

// Load environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/', webhookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}/webhook`);
}); 
