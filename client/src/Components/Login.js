import React, {useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';
import styled from 'styled-components';
import { theme } from '../theme';

const Login = props => {
    const [user, setUser] = useState({username: "", password: ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const {isAuthenticated, user, message} = data;
            if(isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            }
            else {
                setMessage(message);
            }
        });
    }

    return (
        <Form>
            <form onSubmit={onSubmit}> 
                <h3>Please sign in</h3>
                <br/>
                <label htmlFor="username" className="sr-only">
                    <Input  type="text" 
                            name="username" 
                            onChange={onChange} 
                            className="form-control" 
                            placeholder="Enter Username"/>
                </label>
                <label htmlFor="password" className="sr-only">
                    <Input  type="password" 
                            name="password" 
                            onChange={onChange} 
                            className="form-control" 
                            placeholder="Enter Password"/>
                </label>
                <Button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Submit</Button>
            </form>
            {message ? <Message message={message}/> : null}
        </Form>
    )
}

export default Login;

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