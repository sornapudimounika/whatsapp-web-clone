// export const initialState = {
//     user: null
// }

// export const actionTypes = {
//     SET_USER: "SET_USER"
// }

// const reducer = (state, action) => {
//     console.log(action);
//     switch (action.type) {
//         case actionTypes.SET_USER:
//             return{
//                 ...state,
//                 user: action.user,
//             }
//         default:
//             return state;
//     }
// }

// export default reducer


export const initialState = {
    user: null, // Store user data here
};

export const actionTypes = {
    SET_USER: "SET_USER"
}

export const reducer = (state = initialState.user, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user, // Update user data
            }
        default:
            return state;
    }
};
  