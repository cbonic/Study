import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    onAddTask(inputValue.trim());
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="新しいタスクを入力"
      />

      <button type="submit">追加</button>
    </form>
  );
}

export default TaskForm;