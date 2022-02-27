import React from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, Touch } from "./systems";
import { Box } from "./renderers";


const RigidBodies = (props) => {
  const { width, height } = Dimensions.get("screen");
	const player = {
		p: {x:width / 2 - 50, y:50},
		v: {x:0, y:0},
		a: {x:0, y:800},
		size: {width: 100, height: 100}
	} 

	const floor = {
		p: {x:0, y:height - 150},
		v: {x:0, y:0},
		a: {x:0, y:0},
		size: {width: width, height: 150}
	} 
  return (
    <GameEngine
      systems={[Physics, Touch]}
      entities={{
				player: {body: player, color: 'dodgerblue', renderer: Box},
				floor: {body: floor, renderer: Box}
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
};

export default RigidBodies;
