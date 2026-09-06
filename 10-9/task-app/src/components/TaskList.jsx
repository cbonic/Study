import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p>タスクがありません</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;