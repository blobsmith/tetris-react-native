import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Surface, Group } from 'ReactNativeART';

import { connect } from 'react-redux';
import blockManagement from '../services/BlockService';

class NextShape extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blockSize: 10
        };
    }

    convertBlocksToShapes(realBlocks) {
        let shapes = [];
        for (const keyBlock in realBlocks) {
            const block = realBlocks[keyBlock];
            const x = block[0];
            const y = block[1];
            const shape = [
                [x - this.state.blockSize, y],
                [0, this.state.blockSize],
                [this.state.blockSize, 0],
                [0, -this.state.blockSize],
                [-this.state.blockSize, 0],
            ];
            shapes.push(shape);
        }
        return shapes;
    };


    render() {
        const coordinates = {
            x: 4 + this.props.nextShape.previewOffset.x,
            y: 2 + this.props.nextShape.previewOffset.y,
        };

        const realBlocks = blockManagement.getBlocksRealCoordinates(this.props.nextShape.blocks, coordinates, this.state.blockSize);
        const shapes = this.convertBlocksToShapes(realBlocks);
        const ShapeComponents = shapes.map((shape, index) => (
            <ShapeComponent color={this.props.nextShape.color} coordinates={shape} key={index} />
        ));

        return (
            <View style={styles.nextShapeContainer} >
                <Text style={styles.label} >NEXT SHAPE</Text>
                <Surface width="150" height="150" >
                    <Group>
                        {ShapeComponents}
                    </Group>
                </Surface>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nextShapeContainer: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        position: 'absolute',
        width: 70,
        height: 105,
        left: 3,
        top: 40,
    },
    label: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black'
    }
});


const mapStatesToProps = (state) => {
    return {
        nextShape: state.nextShape
    }
};

export default connect(mapStatesToProps)(NextShape);
