import { Router } from 'express';
import taskController from '../controllers/taskController';
import multer from 'multer';

const routerTask = Router();
const upload = multer({ storage: multer.memoryStorage() });

routerTask.get('/status/:taskId', taskController.getTaskStatus);
routerTask.post('/upload/:format', upload.single('file'), taskController.postUploadTask);

export default routerTask;