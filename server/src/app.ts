import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use(routes);

app.get("/", (req, res) => {
    res.json({
        response: "uzqurulish ai is currently running on 3000 port"
    })
})

app.use(notFoundHandler);
app.use(errorHandler);

export default app;