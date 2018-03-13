import React from 'react';
import { Group } from 'ReactNativeART';
import ShapeComponent from '../components/ShapeComponent';
import { connect } from 'react-redux';
import blockManagement from '../services/BlockService';

class Blocks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blockSize: 20
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
        const realBlocks = blockManagement.getBlocksRealCoordinates(this.props.shapeCoordinate, this.props.coordinate, this.state.blockSize);
        const shapes = this.convertBlocksToShapes(realBlocks);
                const ShapeComponents = shapes.map((shape, index) => (
            <ShapeComponent color={this.props.shape.color} coordinates={shape} key={index} />
        ));

        return (
            <Group test={this.props.area}>
                {ShapeComponents}
            </Group>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        coordinate: state.coordinate,
        shape: state.shape,
        shapeCoordinate: state.shapeCoordinate,
    }
};

export default connect(mapStatesToProps)(Blocks);