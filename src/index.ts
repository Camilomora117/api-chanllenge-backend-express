import express, { Application } from 'express';
import taskRouter from './routes/taskRoutes';
import connectDB from './config/config_db';
import { environments } from './config/config';

const app: Application = express();
app.use(express.json());

// Conect Database
connectDB();

// Routes
app.use(taskRouter);

// Running Server
app.listen(environments.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${environments.PORT}`);
});

