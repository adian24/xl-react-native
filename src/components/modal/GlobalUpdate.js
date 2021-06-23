import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import {inputHybridStyle} from '../../style';
import React from 'react';
import PropTypes from 'prop-types';

const linkToStore = () => {
  Linking.openURL("market://details?id=com.dcp_mobile_v4");
}
const GlobalUpdate = (props) => {
  return props.isShow && 
    <Modal animationType="slide" transparent onRequestClose={true}>
      <View style={inputHybridStyle.modalBackdrop} />
      <KeyboardAvoidingView
        enabled={false}
        style={[
          inputHybridStyle.modalContainer,
          {
            padding: 0,
          },
        ]}>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            flex: 2,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Update your app
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
         For more features and a better user experience please update your app
        </Text>
        <View style={{alignItems: 'center', marginBottom: '5%', marginTop: '5%' ,flex: 1}}>
          <TouchableOpacity style={inputHybridStyle.buttonStyle} onPress={linkToStore}>
            <Text style={{color: 'white'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
};

GlobalUpdate.propTypes = {
  isShow: PropTypes.bool,
}

GlobalUpdate.defaultProps = {
  isShow: false,
}
export default GlobalUpdate;
