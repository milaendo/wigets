import { Widget } from '../models/widgets';

export async function deleteWidgetById(id: string) {
  return await Widget.findByIdAndDelete(id);
}
