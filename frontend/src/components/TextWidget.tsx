type TextWidgetProps = {
  content: string;
};

export const TextWidget = (({ content }: TextWidgetProps) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md border border-gray-200">
      <p className="text-gray-800 text-base">{content}</p>
    </div>
  )
})