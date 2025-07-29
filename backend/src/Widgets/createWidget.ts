import z from "zod";
import { Widget, WidgetType } from "../models/widgets";

const createWidgetSchema = z.object({
  type: z.enum(Object.values(WidgetType) as [string, ...string[]]),
  content: z.string().min(1, "Content can't be empty"),
});

export async function createWidget(input: unknown) {
  const result = createWidgetSchema.safeParse(input);

  if (!result.success) {
    throw new Error('Invalid input')
  }
  const widget = new Widget(result.data);
  return widget.save();
}
