import { useEffect, useState } from 'react';

function App() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/widgets')
      .then(res => res.json())
      .then(setWidgets);
  }, []);
  const createWidget = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TEXT',
          content: 'This is a new widget'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create widget');
      }

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button onClick={createWidget} disabled={loading}>
        {loading ? 'Creating...' : 'Create Widget'}
      </button>
      <h1>Widgets</h1>
      {widgets.map((widget: any) => (
        <div key={widget.id}>{widget.content}</div>
      ))}
    </div>
  );
}

export default App;
