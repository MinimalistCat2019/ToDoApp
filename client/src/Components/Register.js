import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import styled from 'styled-components';
import { theme } from '../theme';

const Register = (props)  => {
    const [user, setUser] = useState({username: "", password: "", role: ""});
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=> {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const resetForm = () => {
        setUser({username: "", password: "", role: ""});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000)
            }
        });
    }

    return (
        <Form>
            <form onSubmit={onSubmit}>
                <h3>Please fill in your details</h3>
                <br/>
                <label htmlFor="username" className="sr-only">
                    <Input  type="text" 
                            name="username" 
                            value={user.username}
                            onChange={onChange} 
                            className="form-control" 
                            placeholder="Enter Username"/>
                </label>
                <label htmlFor="password" className="sr-only"> 
                    <Input  type="password" 
                            name="password" 
                            value={user.password}
                            onChange={onChange} 
                            className="form-control" 
                            placeholder="Enter Password"/>
                </label>
                <label htmlFor="role" className="sr-only">
                    <Input  type="text" 
                            name="role" 
                            value={user.role}
                            onChange={onChange} 
                            className="form-control" 
                            placeholder="Enter role (admin/user)"/>
                </label>
                <Button
                        type="submit">Submit</Button>
            </form>
            {message ? <Message message={message}/> : null}
        </Form>
    )
}

export default Register

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