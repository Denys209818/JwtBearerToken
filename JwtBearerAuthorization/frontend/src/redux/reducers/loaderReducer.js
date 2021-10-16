var initialValues ={
    isLoad: false
}

const LoaderReducer = (state = initialValues, action) => 
{
    switch(action.type) 
    {
        case "LOAD_OPEN": {
            return {
                isLoad: true
            };
        }
        case "LOAD_CLOSE": 
        {
            return {
                isLoad: false
            };
        }
    }
    return state;
}

export default LoaderReducer;