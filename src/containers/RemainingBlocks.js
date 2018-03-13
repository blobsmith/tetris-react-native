import React from 'react';
import { Group } from 'ReactNativeART';
import ShapeComponent from '../components/ShapeComponent';
import { connect } from 'react-redux';

class RemainingBlocks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blockSize: 20
        };
    }

    convertRemainingBlocksToShapes() {
        let shapes = [];
        for (const keyLine in this.props.area) {
            const line = this.props.area[keyLine];
            for (const keyblock in line) {
                const blockValue = line[keyblock];
                if (keyLine !== 25 && keyblock !== 0 && keyblock !== 11 && blockValue === 1) {
                    const x = keyblock*this.state.blockSize;
                    const y = keyLine*this.state.blockSize;
                    const shape = [
                        [x - this.state.blockSize, y],
                        [0, this.state.blockSize],
                        [this.state.blockSize, 0],
                        [0, -this.state.blockSize],
                        [-this.state.blockSize, 0],
                    ];
                    shapes.push(shape);
                }
            }
        }
        return shapes;
    };

    render() {
        const shapes = this.convertRemainingBlocksToShapes();
        const remainingShapes = shapes.map((shape, index) => (
            <ShapeComponent color='#ffffff' coordinates={shape} key={index} />
        ));

        return (
            <Group test={this.props.area}>
                {remainingShapes}
            </Group>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        area: state.area,
    }
};

export default connect(mapStatesToProps)(RemainingBlocks);