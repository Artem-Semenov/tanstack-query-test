import { useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import { useQueryClient } from "@tanstack/react-query";

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

  return (
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
  );
}

export { App };
