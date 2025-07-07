import actionTypes from "./actionTypes";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiResetPassword,
} from "../../services/auth";
export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    // console.log(response);
    if (response?.data.err === 0 || response?.data.err === undefined) {
      dispatch({
        type: actionTypes.SIGNUP_SUCCESS,
        mes: response.data.mes,
        success: response.data.success,
      });
    } else {
      dispatch({
        type: actionTypes.SIGNUP_FAIL,
        data: response.data.msg,
        token: "",
      });
    }
  } catch (error) {
    // console.log(error);
    dispatch({
      type: actionTypes.SIGNUP_FAIL,
      data: null,
      msg: error.response.data.mes,
    });
  }
};
export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0 || response?.data.err === undefined) {
      dispatch({
        type: actionTypes.SIGNIN_SUCCESS,
        data: response.data.data,
        token: response.data.accessToken,
        role: response.data.role,
      });
    } else {
      dispatch({
        type: actionTypes.SIGNIN_FAIL,
        data: response.data.data.mes,
      });
    }
  } catch (error) {
    // const err = await apiLogin(payload);
    // console.log(error.response.data);
    dispatch({
      type: actionTypes.SIGNIN_FAIL,
      msg: error.response.data.mes,
      // data : err.response.data,
    });
  }
};
// export const logout = () => async (dispatch) => {
//     try {
//         const response = await apiLogout();
//         console.log(response);
//         if(response?.data.err === 0 || response?.data.err === undefined){
//             dispatch({
//                 type: actionTypes.SIGNOUT_SUCCESS,
//                 data : response.data.data,
//                 token : response.data.accessToken,
//             })
//         }else{

//             dispatch({
//                 type: actionTypes.SIGNOUT_FAIL,
//                 data : response.data.data.mes,

//             })
//         }
//     } catch (error) {
//         // const response = await apiLogout();
//         console.log(error);
//         dispatch({
//             type: actionTypes.SIGNOUT_FAIL,
//             msg : error.response.data.mes,
//             // data : err.response.data,
//         })

//     }
// }
export const forgotPassword = (data) => async (dispatch) => {
  try {
    const response = await apiForgotPassword(data);
    if (response?.data.err === 0 || response?.data.err === undefined) {
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_SUCCESS,
        mes: response.data.mes,
        success: response.data.success,
      });
    } else {
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_FAIL,
        data: null,
        success: response.data.success,
      });
    }
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_FAIL,
      data: null,
      msg: error.response.data.mes,
      success: error.response.data.success,
    });
  }
};
export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await apiResetPassword(data);
    if (response?.data.err === 0 || response?.data.err === undefined) {
      dispatch({
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        mes: response.data.mes,
        success: response.data.success,
      });
    } else {
      dispatch({
        type: actionTypes.RESET_PASSWORD_FAIL,
        data: null,
        success: response.data.success,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.RESET_PASSWORD_FAIL,
      data: null,
      msg: error.response.data.mes,
      success: error.response.data.success,
    });
  }
};
export const logout = () => ({
  type: actionTypes.SIGNOUT,
});

export const clearState = () => ({
  type: actionTypes.CLEAR_STATE,
});
export const clearMsg = () => ({
  type: actionTypes.CLEAR_MSG,
});


