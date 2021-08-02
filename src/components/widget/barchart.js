import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {requestWidgetData} from '../../redux/action/dashboard_action';
import {useSelector, useDispatch} from 'react-redux';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
  VictoryContainer,
} from 'victory-native';
import {Card, Title} from 'react-native-paper';
import {View, ActivityIndicator, Text, Dimensions} from 'react-native';
import Orientation from '../../helpers/orientation';

import Helper from '../../helpers/helper';
import style from '../../style/home.style';
import {NoDataText} from '..';

const BarChartComponent = ({item, filterParams = {}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataSet = useSelector(
    (state) => state.dashboard_reducer.topTrafficStatistics,
  );
  const userData = useSelector((state) => state.auth_reducer.data);
  const {loading, error} = useSelector((state) => state.dashboard_reducer);
  const [orientation, setOrientation] = useState('potrait');

  const generateChart = () => (
    <View style={{position: 'relative', top: -20, left: -15}}>
      {dataSet.length > 0 ? (
        <VictoryContainer>
          <VictoryChart
            width={
              Orientation.getWidth() - (orientation === 'landscape' ? 120 : 70)
            }>
            <VictoryAxis
              crossAxis
              label="Subscriptions"
              tickFormat={() => ''}
            />
            <VictoryAxis
              dependentAxis
              style={{axis: {stroke: 'none'}}}
              standalone={false}
              tickFormat={(t) => Helper.formatBytes(t)}
              tickLabelComponent={<VictoryLabel style={{fontSize: 10}} />}
            />
            <VictoryBar
              data={dataSet}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: 'labels',
                          eventKey: 'all',
                          mutation: () => ({active: false}),
                        },
                      ];
                    },
                    onPressOut: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: () => ({active: true}),
                        },
                      ];
                    },
                  },
                },
              ]}
              horizontal
              style={{
                data: {fill: '#00D3A0', width: 15},
              }}
              labelComponent={
                <VictoryTooltip
                  dx={-30}
                  dy={20}
                  orientation="top"
                  flyoutStyle={{stroke: '#00D3A0', fill: 'white'}}
                  flyoutWidth={130}
                  flyoutHeight={40}
                  labelComponent={<CustomLabel />}
                  renderInPortal={false}
                />
              }
            />
          </VictoryChart>
        </VictoryContainer>
      ) : (
        <NoDataText />
      )}
    </View>
  );

  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);

  useEffect(() => {
    if (dataSet === null) {
      dispatch(
        requestWidgetData(
          userData.access_token,
          item,
          filterParams,
          (type = 'top'),
        ),
      );
    }

    const pageLoad = navigation.addListener('focus', () => {
      dispatch(
        requestWidgetData(
          userData.access_token,
          item,
          filterParams,
          (type = 'top'),
        ),
      );
    });

    detectOrientation();

    return pageLoad;
  }, [navigation]);
  return (
    <Card style={[style.cardSection]}>
      <Card.Content style={[style.cardContentWrapper, {flex: 1}]}>
        <Title>{item.jsonData?.title?.text || ''}</Title>
        {loading ? (
          <ActivityIndicator color="#002DBB" size="large" />
        ) : (
          <>{dataSet ? generateChart() : <NoDataText />}</>
        )}
      </Card.Content>
    </Card>
  );
};

const CustomLabel = (props) => {
  const {text, x, y} = props;

  let yPos = y - 15;
  let xPos = x - 60;

  return (
    <View style={{position: 'absolute', top: yPos, left: xPos}}>
      <Text style={{fontSize: 10}}>
        {text[0]}
        <Text style={{fontWeight: 'bold'}}>{text[1]}</Text>
      </Text>
      <Text style={{fontSize: 10}}>
        {text[2]}
        <Text style={{fontWeight: 'bold'}}>{text[3]}</Text>
      </Text>
    </View>
  );
};

export default BarChartComponent;
