import { useState, useRef, useCallback, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TodoItem from './TodoItem';

export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export default function TodoApp() {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const inputRef = useRef<HTMLInputElement>(null);

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos.filter((todo) => !todo.completed);
            case 'completed':
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    }, [todos, filter])

    const addTodo = useCallback(() => {
        if (!inputValue.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false,
        };

        setTodos((prev) => [...prev, newTodo]);

        setInputValue('')
        inputRef.current?.focus();
    }, [inputValue, setTodos]);

    const toggleTodo = useCallback((id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        )
    }, [setTodos])

    const deleteTodo = useCallback((id: number) => { setTodos(prev => prev.filter(todo => todo.id !== id)) }, [setTodos])

    const stats = {
        total: todos.length,
        active: todos.filter(t => !t.completed).length,
        completed: todos.filter(t => t.completed).length,
    };

    return (
        <div>
            <div>
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What needs to be done?"
                />
                <button onClick={addTodo}>
                    Add
                </button>
            </div>

            <div>
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                    >
                        {f}{filter === f ? ' ✓' : ''}
                    </button>
                ))}
            </div>

            <div>
                {filteredTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </div>

            <div>
                {stats.total} total • {stats.active} active • {stats.completed} completed
            </div>
        </div>
    );
}
