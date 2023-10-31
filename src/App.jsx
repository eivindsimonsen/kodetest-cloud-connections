import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  // Hent innhold
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();

        // En filter metode
        let filteredTodos = data.filter((item) => {
          return item.completed === false;
        });

        setTodos(filteredTodos);
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, []);

  // Send oppdatert innhold
  const postTodos = async () => {
    const bodyData = todos;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bodyData }),
      // returnerer feilmelding, men data blir sendt.
      mode: "no-cors",
    };

    const response = await fetch("https://kodetest.requestcatcher.com/", options);

    // data sendes til server, men cors hindrer meg i å se det lokalt?
    const data = await response.json();

    // console.log(response.status);
    console.log(data);
  };

  // console.log(filteredTodos);
  // console.log(todos);

  return (
    <main>
      <div className="todo-container">
        {todos.map((todo, index) => {
          /* Andre filter metode */
          if (todo.completed === false) {
            return (
              <div
                className="todo-container-items"
                key={index}>
                <p>{todo.title}</p>
                <p>{todo.completed ? "Completed" : "Not Completed"}</p>
              </div>
            );
          }
        })}
      </div>
      <button onClick={postTodos}>Post todos</button>
    </main>
  );
}

export default App;
