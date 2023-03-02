import Heading from "./components/Heading";
import Modal from "./components/Modal";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App font-Poppins h-full flex flex-col mx-auto">
      <Heading />
      <TodoList />
    </div>
  );
}

export default App;
