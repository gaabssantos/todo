import { useEffect, useState } from 'react';
import { Container, FormControl, ItensContainer, Todo } from './app.styles';
import { FaCheck, FaTrash } from 'react-icons/fa6';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from './api/api';
import { TodoType } from './api/api-types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

function App() {
  const [todo, setTodo] = useState('');

  const [todos, setTodos] = useState<TodoType[]>();

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllTodos();

      setTodos(data);
    };

    fetchTodos();
  }, [todos]);

  const handleAddTodo = async (todoName: string) => {
    if (todo !== '') {
      try {
        await createTodo(todoName);
        setTodo('');
        toast.success('Tarefa criada com sucesso.');
      } catch (err) {
        const e = err as AxiosError;

        if (e.response?.status === 409) {
          toast.error('Esta tarefa já existe.');
        }
      }
    }
  };

  const handleDeleteTodo = async (todoName: string) => {
    try {
      await deleteTodo(todoName);
      toast.success('Tarefa deletada com sucesso.');
    } catch (err) {
      toast.error('Algum erro ocorreu...');
    }
  };

  const handleDoneTodo = async (todo: string, finished: boolean) => {
    try {
      await updateTodo(todo);
      if (!finished) {
        toast.success('Tarefa marcada como concluída.');
      } else {
        toast.success('Tarefa marcada como não concluída.');
      }
    } catch (err) {
      toast.error('Algum erro ocorreu...');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Container>
        <FormControl>
          <input
            type="text"
            placeholder="O que tenho que fazer..."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button onClick={() => handleAddTodo(todo)}>Adicionar</button>
        </FormControl>
        <ItensContainer>
          {todos && todos.length > 0 ? (
            todos.map((item) => (
              <Todo key={item._id}>
                <FaCheck
                  id="done"
                  onClick={() => handleDoneTodo(item.todo, item.finished)}
                />
                <span className={item.finished ? 'done' : ''}>{item.todo}</span>
                <FaTrash
                  id="delete"
                  onClick={() => handleDeleteTodo(item.todo)}
                />
              </Todo>
            ))
          ) : (
            <p>Não há itens na lista.</p>
          )}
        </ItensContainer>
      </Container>
    </div>
  );
}

export default App;
