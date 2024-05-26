import React, { createContext, useState, ReactNode } from 'react';

// Todo turi
interface TodoContextType {
    todos: string[];
    addTodo: (todo: string) => void;
}

// Context yaratish
const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
    children: ReactNode;
}

// Provider komponentini yaratish
const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<string[]>([]);

    const addTodo = (todo: string) => {
        setTodos([...todos, todo]);
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoProvider };
