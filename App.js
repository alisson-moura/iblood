import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import {line} from "react-native-svg";
import * as shape from 'd3-shape'
import Constants from 'expo-constants';
import { AppLoading } from 'expo';
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';


import * as theme from './src/theme';
import * as mocks from './mocks';

import { Block, Text } from './src/components';
import { Line } from 'react-native-svg';

export default function App() {

  let [fontLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  function RenderChart() {
    const chart = mocks.chart;


    return (
      <LineChart
        yMin={0}
        yMax={10}
        style={{ flex: 1 }}
        data={chart}
        curve={shape.curveMonotoneX}
        svg={{ stroke: theme.colors.primary, strokeWidth: 2 }}
        contentInset={{ left: theme.sizes.base, right: theme.sizes.base }}
      >
        <Line
          key={'zero-axis'}
          x1={'0%'}
          x2={'100%'}
          y1={'50%'}
          y2={'50%'}
          stroke={theme.colors.gray}
          strokeDasharray={[2,10]}
          strokeWidth={2}
          strokeOpacity={0.8}
        />
        </LineChart>
    );
  }

  function RenderHeader() {
    return (
      <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
        <Block flex={false} row style={{ paddingVertical: 15 }}>
          <Block center>
            {/* *Trick to center the title is to add negative margin using avatar width + margin value */}
            <Text white h3 bold style={{ marginRight: -(25 + 5) }}>Blood Requests</Text>
          </Block>
          <Image style={styles.avatar} source={mocks.user.avatar} />
        </Block>

        <Block card shadow style={styles.headerChart} color="white">
          <Block row space="between" style={{ paddingHorizontal: 30 }}>

            <Block>
              <Block row center>
                <Text h1 bold>291</Text>
                <Text style={{ paddingHorizontal: 10 }} caption bold tertiary>-12%</Text>
              </Block>

            </Block>

            <Block>
              <Block row center style={{ justifyContent: 'flex-end' }}>
                <Text caption bold primary style={{ paddingHorizontal: 10 }} >+28%</Text>
                <Text h1 bold>481</Text>
              </Block>

            </Block>

          </Block>
          <Block row space="between"  style={{ paddingHorizontal: 30 }}>
            <Text semibold>Available</Text>
            <Text semibold >Requests</Text>
          </Block>

          <Block flex={1}>
            <RenderChart />
          </Block>
        </Block>
      </Block>
    );
  }

  function RenderRequest(request) {
    return (
      <Block row card shadow color="white" style={styles.request} >
        <Block flex={0.25} card column color="secondary" style={styles.requestStatus}>
          <Block flex={0.25} middle center color="primary" style={styles.borderRadiusTop}>
            <Text small white bold style={{ textTransform: 'uppercase' }}>{request.priority}</Text>
          </Block>
          <Block flex={0.75} center middle>
            <Text h1 bold white>{request.bloodType}</Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 bold style={{ paddingBottom: 8 }}>{request.name}</Text>
          <Text caption semibold>
            {request.age}  •  {request.gender}  •  {request.distance}km  •  {request.time}hrs
          </Text>
        </Block>
      </Block>
    );
  }

  function RenderRequests() {
    const requests = mocks.requests;
    return (
      <Block flex={0.8} column color='gray2' style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <Text ligth>Recent Updates</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text bold>View All</Text>
          </TouchableOpacity>
        </Block>
        <ScrollView >
          {requests.map(request => (
            <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`}>
              {RenderRequest(request)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Block>
    );
  }


  if (!fontLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar translucent style="light" />
        <RenderHeader />
        <RenderRequests />
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight + 10
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1,
  },

  // the trick here is to position the requests Block under the header Block
  requests: {
    /* Using the negative marginTop & negative zIndex the Chart Block it has a greater value,
       it will be positioned on top of the requist Block */
    marginTop: -55,
    zIndex: -1,
    paddingTop: 55 + 20,
    paddingHorizontal: 15
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  request: {
    padding: 20,
    marginBottom: 15,
  },
  requestStatus: {
    marginRight: 20,
    height: 90,
    overflow: 'hidden'
  },
  borderRadiusTop: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5
  }
});
