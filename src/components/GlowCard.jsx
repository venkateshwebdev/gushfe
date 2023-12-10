import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const style = {
  cursor: "move",
};

const ItemTypes = {
  CARD: "card",
};

const GlowCard = (props) => {
  const {
    index,
    id,
    title,
    description,
    onEdit,
    onDelete,
    isEditing,
    moveCard,
  } = props;

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      data-handler-id={handlerId}
      className="relative group cursor-pointer w-[400px] "
    >
      {/* <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 via-white to-sky-600 rounded-lg opacity-30 group-hover:opacity-80 group-hover:blur transition duration-1000 group-hover:duration-200"></div> */}
      <div className="relative h-full px-7 py-6 bg-gray-800 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-1">
              <span className="bg-purple-100 font-bold text-purple-800 text-xs me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                {"Step " + (index + 1)}
              </span>
            </div>
            {isEditing && (
              <div className="flex">
                <span
                  onClick={onEdit}
                  className="cursor-pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >
                  Edit
                </span>
                <span
                  onClick={onDelete}
                  className="cursor-pointer bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                >
                  Delete
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold text-lg">{title}</p>
            <p className="text-white text-xs">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlowCard;
