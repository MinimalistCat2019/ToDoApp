import React, {useState, useContext, useEffect} from 'react';
import TodoItem from './TodoItem';
import TodoService from '../Services/TodoService';
import { AuthContext } from '../Context/AuthContext';
import Message from '../Components/Message';
import styled from 'styled-components';
import { theme } from '../theme';

const Todos = props => {
    const [todo, setTodo] = useState({name: ""});
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext)

    useEffect(() => {
        TodoService.getTodos().then(data => {
            setTodos(data.todos);
        });
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        TodoService.postTodo(todo).then(data => {
            const { message } = data;
            resetForm();
            if(!message.msgError) {
                TodoService.getTodos().then(getData => {
                    setTodos(getData.todos);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorised") {
                setMessage(message);
                authContext.setUser({username: "", role: ""});
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });
    }

    const onChange = e => {
        setTodo({name: e.target.value});
    }

    const resetForm = () => {
        setTodo({name: ""});
    }

    return(
        <div>
            <ul className="list-group">
                {
                    todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo} />
                    })
                }
            </ul>
            <br/>
            <Form>
                <form onSubmit={onSubmit} >
                    <h3>Create a new Todo</h3>
                    <br/>
                    <label htmlFor="todo">
                        <Input  type="type" 
                                name="todo" 
                                value={todo.name} 
                                onChange={onChange} 
                                className="form-control" 
                                placeholder="Please Enter Todo" />
                    </label>
                    <Button className="btn btn-lg btn-primary btn-block" type="submit">Submit</Button>
                </form>
                {message ? <Message message={message}/> : null}
            </Form>
        </div>
    );
}

export default Todos;

const Form = styled.div`
    background: ${theme.primaryLight};
    color: ${theme.primaryDark};
    max-width: 120rem;
    border-radius: 15px;
    margin: 15px;
    padding: 2rem 2rem;
    text-transform: uppercase;
    *, *:before, *:after {
        box-sizing: border-box;
      }
`
const Input = styled.input.attrs(props => ({
    // we can define static props
  }))`
    color: ${ theme.primaryDark };
   
    font-size: 1em;
    border: 2px solid ${theme.primaryDark};
    border-radius: 10px;
  
    /* here we use the dynamically computed prop */
    margin: 0.5rem;
    padding: 0.5rem;
  `;
  

const Button = styled.button`
  background: ${theme.primaryDark};
  color: ${ theme.primaryLight };
  font-size: 1em;
  margin: .5em;
  padding: 0.5rem;
  border: 2px solid ${theme.primaryLight};
  border-radius: 10px;
  text-transform: uppercase;
  &:hover {
    text-decoration: none;
    color: ${theme.primaryHover};
    }
//   @media (max-width: 768px) {
//       font-size: .65em;
//       padding: .25em .2em;
//       margin: 0.2em;
//     }
`;