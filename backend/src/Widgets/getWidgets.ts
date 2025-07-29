import { Widget } from "../models/widgets";


export async function getWidgets() {
  return Widget.find().sort({ createdAt: -1 });
}
