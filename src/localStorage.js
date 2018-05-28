export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (null === serializedState) {
            return {};
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return {};
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {

    }
};