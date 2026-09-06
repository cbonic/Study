function TaskItem({ task, onToggle }) {
  const getPriorityLabel = (priority) => {
    if (priority === 'high') {
      return '高';
    }

    if (priority === 'medium') {
      return '中';
    }

    return '低';
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px',
        marginBottom: '4px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: task.status === 'done' ? '#f5f5f5' : 'white',
      }}
    >
      <input
        type="checkbox"
        checked={task.status === 'done'}
        onChange={() => onToggle(task.id)}
      />

      <span
        style={{
          flex: 1,
          textDecoration:
            task.status === 'done' ? 'line-through' : 'none',
        }}
      >
        {task.title}
      </span>

      <span
        style={{
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '0.8em',
          backgroundColor:
            task.priority === 'high'
              ? '#ffcccc'
              : task.priority === 'medium'
                ? '#fff3cc'
                : '#ccffcc',
        }}
      >
        {getPriorityLabel(task.priority)}
      </span>

      <span
        style={{
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '0.8em',
          backgroundColor:
            task.status === 'done'
              ? '#ccffcc'
              : task.status === 'active'
                ? '#cce5ff'
                : '#e2e3e5',
        }}
      >
        {task.status === 'done'
          ? '完了'
          : task.status === 'active'
            ? '進行中'
            : '未着手'}
      </span>
    </li>
  );
}

export default TaskItem;