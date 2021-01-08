import React, {useEffect} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import lod from 'lodash';
import {authLogout} from '../redux/action/auth_action';
import callEnterpriseLogo from '../redux/action/enterprise_action';
const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.auth_reducer);
  const {error, loading, statusCode} = useSelector(
    (state) => state.enterprise_reducer,
  );
  useEffect(() => {
    SplashScreen.hide();
    if (lod.isEmpty(data)) {
      dispatch(authLogout());
      navigation.replace('Login');
    }
    if (!lod.isEmpty(data)) {
      const {principal, access_token} = data || {};
      const {enterpriseId} = principal || {};
      dispatch(callEnterpriseLogo(enterpriseId, access_token));
    }
    if (statusCode === 0 && !lod.isEmpty(data)) {
      navigation.replace('Home');
    }
  }, [navigation, dispatch, data, statusCode]);
  useEffect(() => {
    if (error) {
      Alert.alert('Error', JSON.stringify(error, null, 2));
    }
  }, [error]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};
export default Auth;
