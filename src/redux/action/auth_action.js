import Axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { base_url, headerAuth } from '../../constant/connection';
import subDomain from '../../constant/requestSubPath';
import reduxString from '../reduxString';
import { removeEnterPriseLogo } from './enterprise_action';

const authRequest = () => {
  return {
    type: reduxString.AUTH_REQUEST,
  };
};
const authFailed = (error) => {
  return {
    type: reduxString.AUTH_FAILED,
    payload: error,
  };
};
const authSuccess = (data) => {
  return {
    type: reduxString.AUTH_SUCCESS,
    payload: data,
  };
};
const removeAuth = () => {
  return {
    type: reduxString.AUTH_LOGOUT,
  };
};
const authLogout = () => {
  return async (dispatch) => {
    dispatch(removeEnterPriseLogo());
    dispatch(removeAuth());
  };
};

const authLogin = (username, password) => {
  const formData = new FormData();

  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);

  return async (dispatch) => {
    dispatch(authRequest());
    try {
      const { data } = await Axios.post(
        `${base_url}${subDomain.fetchLogin}`,
        formData,
        {
          headers: {
            Authorization: headerAuth,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (data) {
        dispatch(authSuccess(data));
      }
    } catch (error) {
      dispatch(authFailed(error.response.data));
    }
  };
};

const setTitleVersion = (data) => ({
  type: reduxString.GET_TITLE_VERSION,
  payload: data,
});

const getTitleVersionFail = (error) => ({
  type: reduxString.GET_TITLE_VERSION_FAILED,
  payload: error,
});

const getTitleVersion = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`${base_url}/user/usr/getUserAppVersion`, {
        headers: {
          Authorization: headerAuth,
        },
      });

      if (data) {
        dispatch(
          setTitleVersion(data.result.appsTitle + ' ' + data.result.version),
        );
      }
    } catch (error) {
      dispatch(getTitleVersionFail(error.response.data));
    }
  };
};

export { authLogin, authLogout, getTitleVersion };
