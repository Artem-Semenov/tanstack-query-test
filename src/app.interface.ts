export interface ITodo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface ICreateTodo extends Omit<ITodo, "id"> {
  title: string;
}
