import Heading from "./components/Heading";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App font-Poppins min-h-screen mx-auto flex flex-col">
      <Heading />
      <TodoList />
    </div>
  );
}

export default App;
