const TodoApp = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            state = {
                token: action.token,
                role: action.role,
                userName: action.userName
            };
            return state;
        default:
            return state;
    }
}

export default TodoApp;
