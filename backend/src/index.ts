import express from 'express';
import mongoose from 'mongoose';
import { createWidget } from './Widgets/createWidget';
import { getWidgets } from './Widgets/getWidgets';
import { deleteWidgetById } from './Widgets/deleteWidgetById';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/widgets-db')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(4000, () => {
      console.log('🚀 Backend listening on http://localhost:4000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

app.post('/api/widgets', async (req, res) => {
  try {
    const widget = await createWidget(req.body);
    res.status(201).json(widget);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/widgets', async (_req, res) => {
  try {
    const widgets = await getWidgets();
    res.json(widgets);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/widgets/:id', async (req, res) => {
  try {
    const deleted = await deleteWidgetById(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Widget not found' });
    res.json({ message: 'Widget deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete widget' });
  }
});
