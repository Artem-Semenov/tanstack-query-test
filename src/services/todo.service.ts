import axios from "axios";
import { ITodo } from "../app.interface";

class TodoService {
  private baseUrl = "https://jsonplaceholder.typicode.com/todos";
  constructor() {}

  getAll = () => {
    return axios.get<ITodo[]>(`${this.baseUrl}`);
  };

  getById = async (id: number | string) => {
    return axios.get<ITodo>(`${this.baseUrl}/${id}`);
  };
}

export default new TodoService();
