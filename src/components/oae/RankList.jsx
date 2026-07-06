import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function RankList({ value, onChange, items, otherValue, onOtherChange }) {
  const list = value && value.length > 0 ? value : items;

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...list];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onChange(reordered);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">Drag to rank. Only rank what applies — leave the rest.</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ranklist">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
              {list.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(prov, snapshot) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className={`flex items-center gap-3 p-3 rounded border transition-colors ${
                        snapshot.isDragging ? 'border-[#6B1F2A] bg-[#6B1F2A]/5 shadow-md' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#6B1F2A] text-white text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm md:text-base text-gray-700 flex-1">{item}</span>
                      {item === 'Other' && (
                        <input
                          type="text"
                          value={otherValue || ''}
                          onChange={(e) => onOtherChange(e.target.value)}
                          placeholder="Specify..."
                          className="border border-gray-300 rounded px-3 py-1 text-sm focus:border-[#6B1F2A] focus:outline-none w-48"
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                      <span className="text-gray-300 text-xs">⋮⋮</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}