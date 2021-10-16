
const usersReducer = (state = [], action) => 
{
    switch(action.type) 
    {
        case "INIT": {
            return [
                ...action.payload
            ]
        }
    }
    return state;
}

export default usersReducer;