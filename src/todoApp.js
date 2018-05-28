const TodoApp = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            state = {
                hasRedirect: action.hasRedirect,
                token: action.token
            };
            return state;
        default:
            return state;
    }
}

export default TodoApp;
