import mongoose, { Schema } from 'mongoose';
import ITask from '../utils/interfaces/taskInterface';

const TaskSchema = new Schema<ITask>({
    nameFile: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'processing', 'done'] },
    errorList: [{ row: Number, column: String }],
    data: [{ name: String, age: Number, nums: Number }],
});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;