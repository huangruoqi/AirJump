import React from "react";
import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import SpriteSheet from "rn-sprite-sheet";

const Box = ({ body, color }) => {
  const { width, height } = Dimensions.get("screen");
  const angle = 0;
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

const Nut = ({ body, color }) => {
  const { width, height } = Dimensions.get("screen");
	const x = body.p.x + width / 2 - body.size.width / 2
  const y = -body.p.y + height / 2 - body.size.height / 2

  return (
    <SpriteSheet
      ref={(ref) => ({})}
      source={require("../assets/simple.png")}
      columns={1}
      rows={1}
			viewStyle={{
				position: 'absolute',
				left: x,
				top: y,
			}}
      // height={200} // set either, none, but not both
      width={body.size.width}
      // frameHeight={50} // manually set size of your sprite
      // frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
      animations={{}}
    />
  );
};

const Regular = ({ body, color }) => {
  const { width, height } = Dimensions.get("screen");
	const x = body.p.x + width / 2 - body.size.width / 2
  const y = -body.p.y + height / 2 - body.size.height / 2

  return (
		<View>
			<SpriteSheet
				ref={(ref) => ({})}
				source={require("../assets/regular.png")}
				columns={1}
				rows={1}
				viewStyle={{
					position: 'absolute',
					left: x,
					top: y
				}}
				// height={200} // set either, none, but not both
				width={body.size.width}
				// frameHeight={50} // manually set size of your sprite
				// frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
				animations={{}}
			/>
		</View>
  );
};

const Jumppad = ({ body, color }) => {
  const { width, height } = Dimensions.get("screen");
	const x = body.p.x + width / 2 - body.size.width / 2
  const y = -body.p.y + height / 2 - body.size.height / 2

  return (
		<View>
			<SpriteSheet
				ref={(ref) => ({})}
				source={require("../assets/jumppad.png")}
				columns={1}
				rows={1}
				viewStyle={{
					position: 'absolute',
					left: x,
					top: y
				}}
				// height={200} // set either, none, but not both
				width={body.size.width}
				// frameHeight={50} // manually set size of your sprite
				// frameWidth={50} // overrides auto calculation of frame size based on height, width, columns, and rows.
				animations={{}}
			/>
		</View>
  );
};


export { Box, Nut, Regular, Jumppad };
