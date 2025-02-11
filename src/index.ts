import express, { Application } from 'express';
import dotenv from 'dotenv';
import taskRouter from './routes/taskRoutes';
import connectDB from './config/config_db';
import oasValidator from './middlewares/oasValidator';

dotenv.config();

const app: Application = express();
app.use(express.json());

// Conect Database
connectDB();

// Validator OAS
oasValidator(app);

// Routes
app.use(taskRouter);

// Running Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

