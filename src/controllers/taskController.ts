import { Request, Response } from 'express';
import taskService from '../services/taskService';

const getTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.getTaskById(taskId);
    res.json({ task });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const postUploadTask = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { format } = req.params;
    const nameFile = file?.originalname || 'NameDefault'
    const idTask = await taskService.createTask(nameFile);
    taskService.uploadTask(idTask, file, format);
    res.status(200).json({ message: 'File uploaded successfully', idTask });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default { getTaskStatus, postUploadTask };