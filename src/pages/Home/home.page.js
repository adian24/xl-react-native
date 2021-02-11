import React, {useState, useEffect, useCallback} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {getCarousel} from '../../redux/action/dashboard_action';
import {callEnterpriseLogo} from '../../redux/action/enterprise_action';
import {Card, Title} from 'react-native-paper';
import {View, Text, ScrollView, Image, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderContainer, OverlayBackground} from '../../components';
import Orientation from '../../helpers/orientation';

import style from '../../style/home.style';
import {Dimensions} from 'react-native';

const LandingPage = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const carouselItems = useSelector(
    (state) => state.dashboard_reducer.carousel,
  );
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [activeIndex, setActiveIndex] = useState(0);
  const [orientation, setOrientation] = useState('potrait');

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  const actualSizePercent = (percent, type = 'width') => {
    let tempHeight = Orientation.getHeight();
    let heightAboveBanner = 320; //header navbar margin

    if (Orientation.getHeight() > 600) {
      tempHeight = Math.round(Orientation.getHeight() - heightAboveBanner);
    }
    const orientationSize =
      type === 'width' ? Orientation.getWidth() : tempHeight;
    const scale = (percent / 100) * orientationSize;
    return Math.round(scale);
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{backgroundColor: 'white'}}
        dotStyle={style.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const heightProportion = actualSizePercent(
    orientation === 'potrait' ? 131 : 100,
    'height',
  );

  const renderItem = ({item}) => {
    return (
      <View style={style.cellItem}>
        <Image
          source={{uri: item.bannerImage}}
          resizeMode="contain"
          style={{height: actualSizePercent(90, 'height')}}
        />
      </View>
    );
  };
  const {principal} = userData || {};
  const {firstName, lastName} = principal || '';

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(getCarousel(userData.access_token));
      dispatch(
        callEnterpriseLogo(
          userData.principal.enterpriseId,
          userData.access_token,
        ),
      );

      detectOrientation();
    });

    return pageLoad;
  }, [navigation]);

  return (
    <HeaderContainer
      orientation={orientation}
      navigation={navigation}
      companyLogo={imageBase64}
      headerTitle={'Home'}>
      <ScrollView>
        <OverlayBackground />
        <Card style={[style.cardSection]}>
          <Card.Content style={{marginBottom: 20}}>
            <Title>Hi! {firstName + ' ' + lastName}</Title>
          </Card.Content>
          {carouselItems.length > 0 ? (
            <View
              style={{
                ...style.carouselWrapper,
                // ...{ height: heightProportion }
              }}>
              <Carousel
                style={{margin: 0, padding: 0}}
                layout={'default'}
                data={carouselItems}
                sliderWidth={actualSizePercent(
                  orientation === 'potrait' ? 85 : 80,
                  'width',
                )}
                itemWidth={actualSizePercent(
                  orientation === 'potrait' ? 85 : 80,
                  'width',
                )}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveIndex(index)}
                loop
                scrollEnabled
                autoplay
              />
            </View>
          ) : (
            <View>
              <ActivityIndicator color="#002DBB" size="large" />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingVertical: 10,
                }}>
                Loading...
              </Text>
            </View>
          )}
          {pagination()}
        </Card>
      </ScrollView>
    </HeaderContainer>
  );
};
export default LandingPage;
