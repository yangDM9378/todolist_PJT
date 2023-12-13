import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
	return (
		<div>
			<div>TODO</div>
			<DndProvider backend={HTML5Backend}>
				<TodoList />
			</DndProvider>
		</div>
	);
}

export default App;
