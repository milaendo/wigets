import mongoose from 'mongoose';

export enum WidgetType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

const widgetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(WidgetType),
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Widget = mongoose.model('Widget', widgetSchema);
