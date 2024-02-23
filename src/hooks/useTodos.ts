import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";
import { ITodo } from "../app.interface";
import { AxiosResponse } from "axios";

const initialData: AxiosResponse<ITodo[], any> = {
  data: [
    {
      id: 1,
      title: "3dad",
      completed: false,
      userId: 2,
    },
  ],
};

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await todoService.getAll();
    },
    select({ data }) {
      return data;
    },
    initialData: initialData,
    enabled: true,
    retry: 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    // refetchInterval: 2000,
  });
};

export const useTodo = (id: number | string) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      return await todoService.getById(id);
    },
    enabled: !!id,
    retry: 3,
  });
};
