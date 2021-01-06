import React, {useEffect} from 'react'
import {
  View,
  Text
} from 'react-native'
import {useSelector} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
const Auth = ({navigation}) =>{
  const dummy_action = useSelector(state=> state.dummy_reducer)
  useEffect(()=>{
    SplashScreen.hide()
    navigation.replace("Login")
  },[navigation])
  return(
    <View>
      <Text onPress={()=>navigation.replace("Login")}>
        hello from auth dummy_action:{JSON.stringify(dummy_action)}
      </Text>
    </View>
  )
}
export default Auth
