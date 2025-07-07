import actionTypes from "../actions/actionTypes";
const initState = {
  isLoggedIn: false,
  token: null,
  dataUser: {},
  role: "",
  msg: "",
  update: false,
  success: false,
  resetPasswordSuccess: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      // console.log(action);
      return {
        ...state,
        isLoggedIn: false,
        success: action.success,
        dataUser: action.data,
        msgSignup: "Đăng ký thành công ! Kiểm tra email để kích hoạt tài khoản",
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        update: !state.update,
        msgSignup: action.msg,
        success: false,
        // success : false,
      };
    case actionTypes.SIGNIN_SUCCESS:
      // console.log(action);
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        dataUser: action.data,
        role: action.role,
      };
    case actionTypes.SIGNIN_FAIL:
      // console.log(action);
      return {
        ...state,
        isLoggedIn: false,
        dataUser: {},
        msgSignin: action.msg,
        update: !state.update,
      };
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        forgotPassWordSuccess: action.success,
        msgforgotPassWord: action.msg,
        dataUser: {},
        update: !state.update,
      };
    case actionTypes.FORGOT_PASSWORD_FAIL:
      // console.log(action);
      return {
        ...state,
        isLoggedIn: false,
        forgotPassWordSuccess: action.success,
        msgforgotPassWord: action.msg,
        dataUser: {},
        update: !state.update,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.success,
        update: !state.update,
      };
    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPasswordSuccess: action.success,
        update: !state.update,
      };
    case actionTypes.GET_CURRENT_USER_FAIL:
      return {
        ...state,
        isLoggedIn: action.success,
        token: action.data,
        dataUser: action.data,
        role: action.data,
        msg: "Phiên đăng nhập đã hết hạn ! Vui lòng đăng nhập lại !",
      };
    case actionTypes.SIGNOUT:
      // console.log(action);
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: "",
        role: "",
      };
    case actionTypes.CLEAR_STATE:
      return {
        ...state,
        msg: "",
        msgSignin: "",
        msgSignup: "",
        msgforgotPassWord: "",
        forgotPassWordSuccess: undefined,
      };
    case actionTypes.CLEAR_MSG :
      return {
        ...state,
        msg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
