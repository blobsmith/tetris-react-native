import React from 'react';
import { Shape, Path } from 'ReactNativeART';

getPath = (coordinates) => {
    let path = new Path();
    let first = true;
    if (coordinates !== undefined) {
        for (const key in coordinates) {
            let point = coordinates[key];
            if (first) {
                path.move(parseInt(point[0], 10), parseInt(point[1], 10));
                first = false;
            }
            else {
                path.line(parseInt(point[0], 10), parseInt(point[1], 10));
            }
        }
        path.close();
    }
    return path;
};

export default ShapeComponent = ( props ) => (
    <Shape
        fill={props.color}
        stroke="black"
        opacity="0.8"
        d={ getPath(props.coordinates) }
    />
);