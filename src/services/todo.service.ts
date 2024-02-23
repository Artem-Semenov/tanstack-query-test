import axios from "axios";
import { ICreateTodo, ITodo } from "../app.interface";

class TodoService {
  private baseUrl = "https://jsonplaceholder.typicode.com/todos";
  constructor() {}

  getAll = () => {
    return axios.get<ITodo[]>(`${this.baseUrl}?_start=0&_limit=5`);
  };

  getById = async (id: number | string) => {
    return axios.get<ITodo>(`${this.baseUrl}/${id}`);
  };

  create = async (title: string) => {
    return axios.post<any, any, ICreateTodo>(this.baseUrl, {
      title,
      userId: 1,
      completed: false,
    });
  };
}

export default new TodoService();
