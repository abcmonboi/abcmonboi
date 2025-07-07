import actionTypes from "../actions/actionTypes";
const initState = {
  msg: "",
  currentUser: {},
  // update: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        success: action.success,
        currentUser: action.data,
      };

    case actionTypes.SIGNOUT:
      // console.log(action);
      return {
        ...state,
        msg: "",
        currentUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
