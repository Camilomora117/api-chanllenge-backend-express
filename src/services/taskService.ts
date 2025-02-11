import { Types } from 'mongoose';

import ExcelParser from '../utils/data/excelToJson';
import Task from '../models/taskModel';
import TaskStatusEnum from '../utils/enums/taskEnums';
import ITask from '../utils/interfaces/taskInterface';
import getFormat from '../utils/data/formats';
import isValidRowFormat from '../utils/data/validators';


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
      const errors: {row: number, column: number}[] = [];
      const jsonData = ExcelParser.convertToJson(file.buffer);
      jsonData.forEach(async (row: any, index: number) => {
        const isValidRow: {valid: boolean, column: number} = isValidRowFormat(row, selectedFormat);
        if (isValidRow.valid) {
          data.push({
            name: row['Nombre'],
            age: row['Edad'],
            nums: row['Nums']
          });
          await this.updateTask(taskId, {
            data: data,
          });
        } else {
          errors.push({row: index, column: isValidRow.column});
          await this.updateTask(taskId, {
            errorList: errors,
          });
        }
      });

      // Update State Task
      await this.updateTask(taskId, {
        status: TaskStatusEnum.DONE,
      });
    }
}

export default new TaskService();