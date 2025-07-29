import test from 'node:test';
import assert from 'node:assert/strict';

const deletedIds: string[] = [];
const existingIds = new Set(['12345']);

class MockWidgetModel {
  static async findByIdAndDelete(id: string) {
    if (!existingIds.has(id)) {
      return null;
    }
    deletedIds.push(id);

    existingIds.delete(id);

    return { _id: id, content: 'Deleted widget' };
  }
}

export function deleteWidgetByIdFactory(WidgetModel: any) {
  return async function deleteWidgetById(id: string) {
    return WidgetModel.findByIdAndDelete(id);
  };
}

const deleteWidgetById = deleteWidgetByIdFactory(MockWidgetModel);

test('deleteWidgetById deletes the correct widget', async () => {
  const id = '12345';
  const result = await deleteWidgetById(id);

  assert.equal(deletedIds.includes(id), true);
  assert.deepEqual(result, { _id: id, content: 'Deleted widget' });
});

test('deleteWidgetById returns null for unknown ID', async () => {
  const unknownId = 'unknown-id';
  const result = await deleteWidgetById(unknownId);

  assert.strictEqual(result, null);
  assert.ok(!deletedIds.includes(unknownId), 'Should not record deletion for unknown ID');
});
