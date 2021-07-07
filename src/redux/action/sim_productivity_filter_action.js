import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const simProductivityDynamicOnchangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const simProductivityDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const simProductivityDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const simProductivityDynamicLoading = ({formId}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_LOADING,
    formId,
  };
};
const simProductivityDynamicResetSelectedValue = ({formId}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_RESET_SELECTED_VALUE,
    formId,
  };
};
const simProductivityResetAllValue = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_RESET_ALL_VALUE,
  };
};
const simProductivityGenerateParams = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_GENERATE_PARAMS,
  };
};
const simProductivityResetGenerateParams = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_RESET_GENERATE_PARAMS,
  };
};
const simProductivitySetParamsNavigation = ({appliedFilterParams}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_SET_PARAMS_NAVIGATION,
    appliedFilterParams,
  };
};
const simProductivityResetParamsNavigation = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_RESET_PARAMS_NAVIGATION,
  };
};
const simProductivityChartLoading = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_CHART_LOADING,
  };
};
const simProductivityChartFailed = ({errorText}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_CHART_FAILED,
    errorText,
  };
};
const simProductivityChartSuccess = ({dataChart}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_CHART_SUCCESS,
    dataChart,
  };
};

const simGetEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(
      simProductivityDynamicLoading({
        formId: 'sim-productivity-enterprise-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise({access_token})
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({enterpriseId: thisEnterprise, enterpriseName}) => ({
              value: thisEnterprise,
              label: enterpriseName,
            }),
          );
          dispatch(
            simProductivityDynamicSuccess({
              formId: 'sim-productivity-enterprise-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            simProductivityDynamicFailed({
              formId: 'sim-productivity-enterprise-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          simProductivityDynamicFailed({
            formId: 'sim-productivity-enterprise-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
const simGetEnterprisePackage = ({enterpriseName}) => {
  return async (dispatch, getState) => {
    dispatch(
      simProductivityDynamicLoading({
        formId: 'sim-productivity-package-name-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get(
        `${base_url}/dcp/analytics/getListSubscriptionPackageName?enterpriseName=${enterpriseName}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(({packageId, packageDesc}) => ({
            value: packageId,
            label: packageDesc,
          }));
          dispatch(
            simProductivityDynamicSuccess({
              formId: 'sim-productivity-package-name-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            simProductivityDynamicFailed({
              formId: 'sim-productivity-package-name-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          simProductivityDynamicFailed({
            formId: 'sim-productivity-package-name-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
const simGetChart = () => {
  return async (dispatch, getState) => {
    dispatch(simProductivityChartLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get('', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((data) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          dispatch(
            simProductivityChartSuccess({
              dataChart: result,
            }),
          );
        } else {
          dispatch(
            simProductivityChartFailed({
              errorText: 'Failed, to fetch chart',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          simProductivityChartFailed({
            errorText: 'Failed, to fetch chart',
            ...error.response.data,
          }),
        );
      });
  };
};
export {
  simGetEnterprise,
  simGetEnterprisePackage,
  simGetChart,
  simProductivityDynamicOnchangeDropDown,
  simProductivityDynamicResetSelectedValue,
  simProductivityResetAllValue,
  simProductivityGenerateParams,
  simProductivityResetGenerateParams,
  simProductivitySetParamsNavigation,
  simProductivityResetParamsNavigation,
};
