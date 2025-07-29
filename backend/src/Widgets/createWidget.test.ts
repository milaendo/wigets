import test from 'node:test';
import assert from 'node:assert/strict';
import { WidgetType } from '../models/widgets';

class MockWidget {
  input: any;
  constructor(input: any) {
    this.input = input;
  }
  async save() {
    return this.input;
  }
}

export function createWidgetFactory(WidgetModel: any) {
  return async function createWidget(input: { type: WidgetType, content: string }) {
    if (!Object.values(WidgetType).includes(input.type)) {
      throw new Error('Invalid widget type');
    }
    const widget = new WidgetModel(input);
    return widget.save();
  }
}
const createWidget = createWidgetFactory(MockWidget);

test('createWidget with valid input', async () => {
  const input = { type: WidgetType.TEXT, content: 'Hello' };
  const result = await createWidget(input);
  assert.deepEqual(result, input);
});

test('createWidget with invalid type throws', async () => {
  const input = { type: 'INVALID', content: 'Oops' };
  await assert.rejects(
    () => createWidget(input as any),
    {
      message: 'Invalid widget type',
    }
  );
});

test('createWidget handles long text input (1200 characters)', async () => {
  const longText = 'a'.repeat(1200);
  const input = { type: WidgetType.TEXT, content: longText };
  const result = await createWidget(input);
  assert.strictEqual(result.content.length, 1200);
  assert.strictEqual(result.content, longText);
});