import React, {useState} from 'react';
import styled from 'styled-components';
import { theme } from '../theme';
import TodoService from '../Services/TodoService';
import Message from '../Components/Message';


const TodoItem = props => {
    const [message, setMessage] = useState(null);

    const onSubmit = e => {
        e.preventDefault();
        TodoService.removeTodo(props.todo.name)
        .then((data) => {
            const { message } = data;
            if (!message.msg) {
                setMessage(message);
          } else if(message.msgBody === "Todo could not be removed at this time") {
              setMessage(message);
          } else {
              setMessage(message)
          }
        });
    };

    return (
        <>
            <Todo>{props.todo.name}</Todo>
            {/* <form onSubmit={onSubmit}>
                <button type="submit">Remove</button>
            </form> */}
        </>
    )
}

export default TodoItem;

const Todo = styled.h3`

`