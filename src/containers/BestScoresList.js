import React  from 'react';
import { goDownAction } from '../actions';
import { connect } from 'react-redux';
import BestScoreRow from "../components/BestScoreRow";
import { View, FlatList, Text, ScrollView, StyleSheet } from 'react-native';

class BestScoresList extends React.Component  {

  data = [
    {
      position: 1,
      uuid: 'fdk3d-eefed',
      deviceid: 'kkldff-dfdfr',
      name: 'Olivier',
      points: 200,
      level: 2,
    },
    {
      position: 2,
      uuid: 'fdk3d-eefes',
      deviceid: 'kkldff-dfdfr',
      name: 'OlivierG',
      points: 160,
      level: 2,
    },
  ];

  _renderItem = ({ item }) => (
    <BestScoreRow
        position={item.position}
        name={item.name}
        points={item.points}
        level={item.level}
    />
);

  render() {
    return (
      <View>
        <View style={styles.sectionTitle}>
          <Text style={styles.title} >Your hightscores</Text>
        </View>
            <ScrollView>
            <FlatList
                data={this.data}
                renderItem={this._renderItem}
                keyExtractor={item => item.uuid}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
  },
});

const mapStatesToProps = (state) => {
  return {
    shapeCoordinate: state.shapeCoordinate,
    gameArea: state.area,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    goDown: (gameArea, shapeCoordinate) => {
      dispatch(goDownAction(gameArea, shapeCoordinate));
    },
  }
};

export default connect(mapStatesToProps, mapDispatchToProps)(BestScoresList);
