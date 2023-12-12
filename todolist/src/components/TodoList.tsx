/* eslint-disable array-callback-return */
import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

interface ITodo {
	id: string;
	title: string;
}

export default function TodoList() {
	const [todoList, setTodoList] = useState<ITodo[]>([
		{ id: '0', title: '잠자기' },
		{ id: '1', title: '놀기' },
	]);
	const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);

	const addOpenModal = () => {
		setAddModalIsOpen(true);
	};

	const addCloseModal = () => {
		setAddModalIsOpen(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputField = (e.currentTarget as HTMLFormElement).querySelector('input');
		if (inputField instanceof HTMLInputElement) {
			const newTodo = { id: uuidv4(), title: inputField.value };
			setTodoList([...todoList, newTodo]);
			addCloseModal();
		}
	};

	const delOpenSwal = (todoItem: ITodo) => {
		Swal.fire({
			title: '삭제',
			text: '[' + todoItem.title + '] 항목을 삭제하겠습니까?',
			showCancelButton: true,
			cancelButtonText: '취소',
			confirmButtonText: '찐삭제?',
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
			<section>내가할일</section>
			<button onClick={addOpenModal}>add</button>
			{todoList.map((todoItem) => (
				<div key={todoItem.id}>
					<TodoItem
						id={todoItem.id}
						title={todoItem.title}
						moveTodoItem={(id: string, atIndex: number) => moveTodoItem(id, atIndex)}
						findTodoItem={findTodoItem}
					/>
					<button onClick={() => delOpenSwal(todoItem)}>x</button>
				</div>
			))}
			<Modal isOpen={addModalIsOpen} onRequestClose={addCloseModal} ariaHideApp={false}>
				<h2>내용 추가 모달</h2>
				<button onClick={addCloseModal}>닫기</button>
				<form onSubmit={handleSubmit}>
					<input type="text" name="addTodoTitle" />
					<button type="submit">todo 추가</button>
				</form>
			</Modal>
		</div>
	);
}
