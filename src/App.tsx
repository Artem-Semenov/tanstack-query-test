import { useQuery } from "@tanstack/react-query";

const todoId = 1;

function App() {
  const { isLoading, data, isSuccess, error } = useQuery({
    queryKey: ["todos", todoId],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return await res.json();
    },
  });
  console.log(data);
  return (
    <div>
      <h1>Todo: {data.title}</h1>
    </div>
  );
}

export default App;
