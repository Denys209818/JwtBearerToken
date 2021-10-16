var initialValues = {
    drag: 'out'
};

const dragReducer = (state = initialValues, action) => {
    switch(action.type) 
    {
        case "IN": {
            return {
                drag: "in"
            }
        }
        case "OUT": {
            return {
                drag: "out"
            }
        }
    }

    return state;
}

export default dragReducer;