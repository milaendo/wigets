import { useState } from 'react';
import { TextWidget } from './TextWidget';
import type { Widget } from '../App';

type WidgetManagerProps = {
  widgets: Widget[];
  createWidget: (widget: { type: string; content: string }) => Promise<void>;
  deleteWidget: (id: string) => Promise<void>;
};

export function WidgetManager({ widgets, createWidget, deleteWidget }: WidgetManagerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createWidget({ type: 'TEXT', content: text });
    setText('');
    setModalOpen(false);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Widget
      </button>

      <h1 className="text-xl font-semibold text-gray-800 mb-4">Widgets</h1>

      <div className="space-y-4">
        {widgets.map((widget: any) => (
          <TextWidget content={widget.content} key={widget._id} onDelete={() => deleteWidget(widget._id)} />
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Add a New Widget</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows={4}
                placeholder="Enter your widget text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
