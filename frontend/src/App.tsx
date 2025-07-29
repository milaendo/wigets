import { useEffect, useState } from 'react';
import { WidgetManager } from './components/WidgetManager';

export type Widget = {
  _id: string;
  type: string;
  content: string;
};
function App() {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const fetchWidgets = async () => {
    const res = await fetch('/api/widgets');
    const data = await res.json();
    setWidgets(data);
  };

  const createWidget = async (widget: { type: string; content: string }) => {
    await fetch('/api/widgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(widget),
    });
    fetchWidgets();
  };

  const deleteWidget = async (id: string) => {
    await fetch(`/api/widgets/${id}`, {
      method: 'DELETE',
    });
    fetchWidgets();
  };

  useEffect(() => {
    fetchWidgets();
  }, []);
  return <WidgetManager widgets={widgets} createWidget={createWidget} deleteWidget={deleteWidget} />;

}

export default App;

