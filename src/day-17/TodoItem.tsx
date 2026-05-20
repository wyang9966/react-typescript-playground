import { memo } from 'react';
import type { Todo } from './TodoApp';

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = memo(({ todo, onToggle, onDelete }: Props) => {
  console.log(`TodoItem ${todo.id} rendered`);

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </div>
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
});

export default TodoItem;
