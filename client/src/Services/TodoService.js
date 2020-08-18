export default {
    getTodos : () => {
        return fetch('/user/todos')
                .then(response => {
                    if(response.status !== 401) {
                        return response.json().then(data => data);
                    } else {
                        return {message: {msgBody: "UnAuthorised"}, msgError: true}
                    }
                });
    },
    removeTodo: todo => {
        return fetch('user/todos', {
            method: "delete",
            body: JSON.stringify(todo.name),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => {
            if(response.status !==401) {
                return {message: {msgBody: "Todo successfully removed"}, msgError: false}
            } else {
            return {message: {msgBody: "Todo could not be removed at this time"}, msgError: true}
            }
        });
    },
    postTodo: todo => {
        return fetch('/user/todo', {
            method: "post",
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return {message: {msgBody: "UnAuthorised"}, msgError: true}
            }
        });
    }
}