import React from "react";
// import Animated from "react-native-reanimated";
import {Dimensions, View} from "react-native"
import Animated from "react-native-reanimated";

const Box = ({body, color}) => {
	const {width, height} = body.size
	const x = body.p.x
	const y = body.p.y
	const angle = 0

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ rotate: angle + "rad" }],
        backgroundColor: color || "pink",
      }}
    />
  );
};

export { Box };
