import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const style = {
	border: '1px solid blue',
	borderRadius: '0.1875em',
	margin: '0.5rem',
	width: '100px',
	padding: '0.5rem 1rem',
	backgroundColor: 'white',
	cursor: 'pointer',
	flexShrink: '0',
};

interface ITodo {
	id: string;
	title: string;
}

interface ITodoItemProps {
	id: string;
	title: string;
	moveTodoItem: (id: string, atIndex: number) => void;
	findTodoItem: (id: string) => { todoItem: ITodo; index: number } | undefined;
}

export default function TodoItem({ id, title, moveTodoItem, findTodoItem }: ITodoItemProps) {
	const originalIndex = findTodoItem(id)?.index;

	const [{ isDragging }, dragRef] = useDrag(
		() => ({
			type: 'TodoItem',
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[originalIndex],
	);
	const [, dropRef] = useDrop(
		() => ({
			accept: 'TodoItem',
			hover: (item: { id: string }) => {
				const draggedId = item.id;
				if (draggedId !== id) {
					const result = findTodoItem(id);
					const overIndex = result?.index;
					if (overIndex !== undefined) {
						moveTodoItem(draggedId, overIndex);
					}
				}
			},
		}),
		[findTodoItem, moveTodoItem],
	);

	return (
		<div ref={(node) => dragRef(dropRef(node))} style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
			{title}
		</div>
	);
}
