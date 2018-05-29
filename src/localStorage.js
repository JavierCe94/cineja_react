export const loadState = () => {
    const stateDefault = {
        hasRedirect: false,
        token: ''
    };

    try {
        const serializedState = localStorage.getItem('state');
        if (null === serializedState) {
            return stateDefault;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return stateDefault;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {

    }
};
