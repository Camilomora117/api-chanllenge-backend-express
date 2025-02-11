import { Types } from 'mongoose';

import ExcelParser from '../utils/data/excelToJson';
import Task from '../models/taskModel';
import TaskStatusEnum from '../utils/enums/taskEnums';
import ITask from '../utils/interfaces/taskInterface';
import getFormat from '../utils/data/formats';
import isValidRowFormat from '../utils/data/validators';
import { json } from 'stream/consumers';


class TaskService {
    
    async getTaskById(taskId: string): Promise<any> {
      const task = await Task.findById(taskId);
      if (!task) throw new Error('Task not found');
      return task;
    }

    async createTask(nameFile: string): Promise<string> {
      const newTask = new Task({
        nameFile: nameFile,
        status: TaskStatusEnum.PENDING,
        errors: [],
        data: [],
      });
      await newTask.save();
      return newTask._id.toString();
    }

    async updateTask(taskId: string, updates: any): Promise<ITask | null> {
      
      if (!Types.ObjectId.isValid(taskId)) {
        throw new Error('Invalid task ID');
      }
  
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: updates },
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) {
        throw new Error('Task not found');
      }
  
      return updatedTask;
    }
  
    async uploadTask(taskId: string, file: any, format: string) {
      //Update State
      const updates = {
        status: TaskStatusEnum.PROCESSING,
      };
      await this.updateTask(taskId, updates);

      // Get Format
      const selectedFormat = getFormat(format);

      // Processing Data
      const data: any[] = [];
      const errors: any[] = [];
      const jsonData = ExcelParser.convertToJson(file.buffer);
      jsonData.forEach((row: any) => {
        if (isValidRowFormat(row, selectedFormat)) {
          data.push(row);
        } else {
          errors.push(row);
        }
      });
      console.log("Data", data)
      console.log("Errores", errors);

      // Update Task
      await this.updateTask(taskId, {
        status: TaskStatusEnum.DONE,
        data: data,
        errorList: errors,
      });
    }
}

export default new TaskService();