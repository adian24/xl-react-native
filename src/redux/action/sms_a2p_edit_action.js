import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {callActiveEnterprise} from './user_administration_array_header_action';

const smsA2pEditTextInput = ({valueInput, formId}) => {
  return {
    type: reduxString.SMS_A2P_EDIT_TEXT_INPUT,
    valueInput,
    formId,
  };
};
const smsA2pEditLoading = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_LOADING,
  };
};
const smsA2pEditSuccess = (value) => {
  return {
    type: reduxString.SMS_A2P_EDIT_SUCCESS,
    ...value,
  };
};
const smsA2pEditFailed = ({errorText}) => {
  return {
    type: reduxString.SMS_A2P_EDIT_FAILED,
    errorText,
  };
};
const smsA2pEditReset = () => {
  return {
    type: reduxString.SMS_A2P_EDIT_RESET,
  };
};
const getA2pEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(smsA2pEditLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise({access_token})
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({customerNumber, enterpriseName}) => ({
              value: customerNumber,
              label: enterpriseName,
            }),
          );
          dispatch(
            smsA2pEditSuccess({
              dataEnterprise: changeArray,
            }),
          );
        } else {
          dispatch(
            smsA2pEditFailed({
              errorText: 'Error',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          smsA2pEditFailed({
            errorText: 'Error',
            ...error.response.data,
          }),
        );
      });
  };
};
const getA2pEditDetail = (localVariable) => {
  return async (dispatch, getState) => {
    dispatch(smsA2pEditLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    const {data_sms_generated} =
      (await getState().sms_a2p_get_all_sms_reducer) || {};
    const {indexSelected, configId} = localVariable || {};
    axios
      .get(
        `${base_url}/api/dcp/a2pConfiguration/getA2PConfigurationDetail?configId=${configId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          dispatch(
            smsA2pEditSuccess({
              dataEdit: {
                dataApi: result,
                dataArrayNavigate: data_sms_generated[indexSelected],
              },
            }),
          );
        } else {
          dispatch(
            smsA2pEditFailed({
              errorText: 'Failed, to get a2p detail',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          smsA2pEditFailed({
            errorText: 'Failed, to get a2p detail',
            ...error.response.data,
          }),
        );
      });
  };
};
const deleteSmsA2p = () => {};
const createSmsA2p = () => {};
export default getA2pEditDetail;
export {
  getA2pEnterprise,
  deleteSmsA2p,
  createSmsA2p,
  smsA2pEditTextInput,
  smsA2pEditReset,
};
