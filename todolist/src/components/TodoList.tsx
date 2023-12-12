import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

interface IInitTodo {
	id: number;
	title: string;
}

export default function TodoList() {
	const [todoList, setTodoList] = useState<IInitTodo[]>([
		{ id: 0, title: '잠자기' },
		{ id: 1, title: '놀기' },
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
		const todoId = todoList.length;
		if (inputField instanceof HTMLInputElement) {
			const newTodo = { id: todoId, title: inputField.value };
			setTodoList([...todoList, newTodo]);
			addCloseModal();
		}
	};

	const delOpenSwal = (todoItem: IInitTodo) => {
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

	return (
		<div>
			<section>내가할일</section>
			<button onClick={addOpenModal}>add</button>
			{todoList.map((todoItem) => (
				<li key={todoItem.id}>
					{todoItem.id} {todoItem.title}
					<button onClick={() => delOpenSwal(todoItem)}>x</button>
				</li>
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
