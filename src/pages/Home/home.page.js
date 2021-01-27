import React, { useState, useEffect } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getCarousel } from '../../redux/action/dashboard_action';
import { Card, Title } from 'react-native-paper';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderContainer, OverlayBackground } from '../../components';

import style from '../../style/home.style';

const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const titleVersion = useSelector((state) => state.auth_reducer.titleVersion);
  const carouselItems = useSelector((state) => state.dashboard_reducer.carousel);
  const { imageBase64 } = useSelector((state) => state.enterprise_reducer);
  const [activeIndex, setActiveIndex] = useState(0);

  const pagination = () => {
    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        containerStyle={{ backgroundColor: 'white' }}
        dotStyle={style.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View style={style.cellItem}>
        <Image source={{ uri: item.bannerImage }} style={style.imageCellItem} />
      </View>
    );
  };
  const { principal } = userData || {};
  const { firstName, lastName } = principal || '';

  useEffect(() => {
    dispatch(getCarousel(userData.access_token));
  }, []);

  return (
    <HeaderContainer
      navigation={navigation}
      companyLogo={imageBase64}
      headerTitle={'Home'}>
      <ScrollView>
        <OverlayBackground />
        <Card style={[style.cardSection]}>
          <Card.Content style={{ marginBottom: 10 }}>
            <Title>Hi! {firstName + ' ' + lastName}</Title>
          </Card.Content>
          {
            carouselItems.length > 0
              ?
              <View style={{ alignItems: 'center', backgroundColor: '#002DBB' }}>
                <Carousel
                  style={{ margin: 0, padding: 0 }}
                  layout={'default'}
                  data={carouselItems}
                  sliderWidth={300}
                  itemWidth={500}
                  renderItem={renderItem}
                  onSnapToItem={(index) => setActiveIndex(index)}
                  loop
                  scrollEnabled
                  autoplay
                />
              </View>
              :
              <ActivityIndicator color="#002DBB" size="large" />
          }
          {pagination()}
          <View style={style.tradeMark}>
            <Text style={{ fontWeight: 'bold' }}>
              IoT SIMCare {titleVersion || ''}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </HeaderContainer>
  );
};
export default LandingPage;
