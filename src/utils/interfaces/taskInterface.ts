import { Document, Types } from 'mongoose';

interface IError {
    row: number;
    column: string;
}

interface IData {
    name: string;
    age: number;
    nums: number;
}

interface ITask extends Document {
    _id: Types.ObjectId
    nameFile: string;
    status: string;
    errorList: IError[];
    data: IData[];
}

export default ITask;