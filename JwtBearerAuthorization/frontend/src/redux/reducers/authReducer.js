const initialValues = {
    isAuth: false,
    username: '',
    loading: false,
    token: '',
    email: ''
}

const authReducer = (state = initialValues, action) => {
    switch(action.type) 
    {
        case "LOGIN": {
            return {
                isAuth: true,
                username: action.payload.name,
                token: action.payload.token,
                loading: false,
                email: action.payload.email
            }
        }
        case "LOGOUT": 
        {
            return {
                isAuth: false,
                username: '',
                token: '',
                loading: false
            }
        }
    } 
    return state;
}

export default authReducer;