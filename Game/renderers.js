import React from "react";
// import Animated from "react-native-reanimated";
import {Dimensions, View} from "react-native"
import Animated from "react-native-reanimated";

const Box = ({body, color}) => {
	const {width, height} = Dimensions.get('screen')
	const angle = 0

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: body.p.x + width / 2 - body.size.width / 2,
        top: -body.p.y + height / 2 - body.size.height / 2,
        width: body.size.width,
        height: body.size.height,
        transform: [{ rotate: angle + "rad" }],
        backgroundColor: color || "pink",
      }}
    />
  );
};

export { Box };
