import { SyntheticEvent, useEffect, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import todoService from "./services/todo.service";

function App() {
  const {
    isLoading,
    isFetching,
    data,
    isSuccess,
    error,
    refetch,
    status,
    fetchStatus,
  } = useTodos();
  // console.log(data);

  useEffect(() => {
    //onSuccess
    // isSuccess && data && alert(data[0].title);
  }, [data]);

  // console.log(fetchStatus);

  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>("");

  const { mutate } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: (title: string) => todoService.create(title),
    onSuccess: () => {
      alert("todo Added");
      setTitle("");
      refetch();
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    mutate(title);
  };

  const countFetching = useIsFetching(); //count of fetches at a time

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      <div>
        <h3>fetching count: {countFetching}</h3>
        <h2>create TODO</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="enter todo title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
            />
          </div>
          <br />
          <button type="submit">create</button>
        </form>
      </div>

      <div>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["todos"] })}
        >
          RefetchData
        </button>
        {error && <div>{error.message}</div>}
        {isFetching && "Fetching..."}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Todos: </h1>
            {data?.length && (
              <ul>
                {data.map((todo) => (
                  <li key={todo.id}>
                    <b>{todo.id}.&nbsp;</b>
                    {todo.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { App };
