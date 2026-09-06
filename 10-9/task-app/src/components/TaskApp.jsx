import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Reactのインストール',
      status: 'done',
      priority: 'high',
    },
    {
      id: 2,
      title: 'JSXの基礎を学ぶ',
      status: 'done',
      priority: 'high',
    },
    {
      id: 3,
      title: 'useStateを理解する',
      status: 'active',
      priority: 'high',
    },
    {
      id: 4,
      title: 'useEffectを学ぶ',
      status: 'active',
      priority: 'medium',
    },
    {
      id: 5,
      title: '演習問題を解く',
      status: 'pending',
      priority: 'low',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      status: 'pending',
      priority: 'medium',
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'done' ? 'pending' : 'done',
            }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter(
    (task) => filterStatus === 'all' || task.status === filterStatus
  );

  return (
    <div>
      <TaskForm onAddTask={addTask} />

      <div style={{ margin: '16px 0' }}>
        {[
          { value: 'all', label: 'すべて' },
          { value: 'pending', label: '未着手' },
          { value: 'active', label: '進行中' },
          { value: 'done', label: '完了' },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilterStatus(filter.value)}
            style={{
              marginRight: '8px',
              fontWeight:
                filterStatus === filter.value ? 'bold' : 'normal',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleTask} />

      <p style={{ marginTop: '16px', color: '#666' }}>
        表示中: {filteredTasks.length}件 / 全{tasks.length}件
        （完了: {tasks.filter((t) => t.status === 'done').length}件）
      </p>
    </div>
  );
}

export default TaskApp;