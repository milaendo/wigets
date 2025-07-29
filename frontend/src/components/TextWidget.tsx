type TextWidgetProps = {
  content: string;
  onDelete: () => void;
};

export const TextWidget = (({ content, onDelete }: TextWidgetProps) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md border border-gray-200 flex justify-between">
      <p className="text-gray-800 text-base">{content}</p>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
        aria-label="Delete widget"
      >
        X
      </button>
    </div>
  )
})