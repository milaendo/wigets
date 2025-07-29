import { Widget, WidgetType } from "../models/widgets";


export async function createWidget(input: { type: WidgetType, content: string }) {
  if (!Object.values(WidgetType).includes(input.type)) {
    throw new Error('Invalid widget type');
  }

  const widget = new Widget(input);
  return widget.save();
}
