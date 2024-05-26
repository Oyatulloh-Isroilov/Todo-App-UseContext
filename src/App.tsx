import { TodoProvider } from './components/TodoContext';
import Todo from './components/Todo';

function App() {
    return (
        <TodoProvider>
            <Todo />
        </TodoProvider>
    );
}

export default App;
