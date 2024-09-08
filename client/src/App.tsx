import { useState } from 'react';
import { Container, FormControl, ItensContainer, Todo } from './app.styles';
import { FaCheck, FaTrash } from 'react-icons/fa6';

type ItensProps = {
  _id: number;
  todo: string;
  finished: boolean;
};

function App() {
  const [itens, setItens] = useState<ItensProps[]>([]);
  const [todo, setTodo] = useState('');

  const handleAddTodo = (todo: string) => {
    if (todo !== '') {
      setItens((prevState) => [
        ...prevState,
        { _id: Math.random(), todo, finished: false },
      ]);
      setTodo('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    const todoDeleted = itens.filter((item) => item._id !== id);
    setItens(todoDeleted);
  };

  const handleDoneTodo = (id: number) => {
    const newTodo = itens.map((item) => {
      if (item._id === id) {
        return { ...item, finished: !item.finished };
      }

      return item;
    });

    setItens(newTodo);
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
          {itens.length > 0 ? (
            itens.map((item) => (
              <Todo key={item._id}>
                <FaCheck id="done" onClick={() => handleDoneTodo(item._id)} />
                <span className={item.finished ? 'done' : ''}>{item.todo}</span>
                <FaTrash
                  id="delete"
                  onClick={() => handleDeleteTodo(item._id)}
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
