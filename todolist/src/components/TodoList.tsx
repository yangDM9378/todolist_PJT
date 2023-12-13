/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

interface ITodo {
	id: string;
	title: string;
}

export default function TodoList() {
	const [todoList, setTodoList] = useState<ITodo[]>([]);

	const addOpenSwal = () => {
		Swal.fire({
			title: 'Todo 내용 추가',
			html: `
				<input type="text" id='addTodo' style='width: 250px; height: 2.625em; padding: 0 0.75em; border:1px solid #d9d9d9; border-radius:0.1875em; font-size: 1.125em'/>
			`,
			inputAttributes: {},
			showCancelButton: true,
			cancelButtonText: '취소',
			confirmButtonText: '추가하기',
		}).then((result) => {
			if (result.isConfirmed) {
				const inputField = document.getElementById('addTodo');
				if (inputField instanceof HTMLInputElement) {
					if (inputField.value.trim() !== '') {
						const newTodo = { id: uuidv4(), title: inputField.value };
						setTodoList([...todoList, newTodo]);
					} else {
						warmAddTodo();
					}
				}
			}
		});
	};

	const warmAddTodo = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Todo 내용을 입력해 주세요',
		});
	};

	const delOpenSwal = (todoItem: ITodo) => {
		Swal.fire({
			title: '삭제',
			text: '[' + todoItem.title + '] 항목을 삭제하겠습니까?',
			showCancelButton: true,
			cancelButtonText: '취소',
			confirmButtonText: '삭제하기',
		}).then((result) => {
			if (result.isConfirmed) {
				const delTodoList = todoList.filter((item) => item.id !== todoItem.id);
				setTodoList(delTodoList);
			}
		});
	};

	const findTodoItem = (id: string) => {
		if (todoList.length > 0) {
			const todoItem = todoList.filter((item) => item.id === id)[0];
			return {
				todoItem,
				index: todoList.indexOf(todoItem),
			};
		}
	};

	const moveTodoItem = (id: string, atIndex: number) => {
		const result = findTodoItem(id);
		if (result && typeof result.index !== 'undefined') {
			const { index } = result;
			const updatedList = [...todoList];
			const itemToMove = updatedList.splice(index, 1)[0];
			updatedList.splice(atIndex, 0, itemToMove);
			setTodoList(updatedList);
		}
	};

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<section>내가할일</section>
				<button
					onClick={addOpenSwal}
					style={{
						border: '1px solid',
						borderRadius: '100%',
						backgroundColor: 'white',
						cursor: 'pointer',
					}}
				>
					+
				</button>
			</div>
			{todoList.map((todoItem) => (
				<div key={todoItem.id} style={{ display: 'flex' }}>
					<TodoItem
						id={todoItem.id}
						title={todoItem.title}
						moveTodoItem={(id: string, atIndex: number) => moveTodoItem(id, atIndex)}
						findTodoItem={findTodoItem}
					/>
					<button
						onClick={() => delOpenSwal(todoItem)}
						style={{
							border: '1px solid',
							borderRadius: '100%',
							margin: '0.5rem',
							padding: '0.5rem 1rem',
							backgroundColor: 'white',
							cursor: 'pointer',
						}}
					>
						x
					</button>
				</div>
			))}
		</div>
	);
}
