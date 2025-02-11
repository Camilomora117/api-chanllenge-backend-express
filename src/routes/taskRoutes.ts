import { Router } from 'express';
import taskController from '../controllers/taskController';
import OpenApiValidatorProvider from "../middlewares/oasValidator";
import multer from 'multer';
import { authenticateToken } from '../middlewares/authValidator';

const routerTask = Router();
const upload = multer({ storage: multer.memoryStorage() });
const validator = OpenApiValidatorProvider.getValidator();

routerTask.get('/status/:taskId', validator.validate('get','/status/{taskId}'), authenticateToken, taskController.getTaskStatus);
routerTask.post('/upload/:format', authenticateToken, upload.single('file'), taskController.postUploadTask);

export default routerTask;