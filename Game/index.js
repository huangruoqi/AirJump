import * as React from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Update, Touch, Collide } from "./systems";
import { Box } from "./renderers";
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get("screen");

class Player {
	constructor(x, y) {
		this.p = {x: x, y: y}
		this.v = {x: 0, y: 0}
		this.gravity = -1000
		this.a = {x: 0, y: this.gravity}
		this.size = {width: Math.trunc(height / 8), height: Math.trunc(height / 8)}
		this.canJump = true
	}
}

class Platform {
	constructor(x, y) {
		this.p = {x: x, y: y}
		this.v = {x: -200, y: 0}
		this.a = {x: 0, y: 0}
		this.size = {width: Math.trunc(height / 2.5), height: Math.trunc(height / 10)}
	}
}


const RigidBodies = (props) => {
	const ref = React.useRef({x:0, y:0, z:0})
  React.useEffect(() => {
		const id = Accelerometer.addListener(accelerometerData => {
			ref.current = accelerometerData
		})
		Accelerometer.setUpdateInterval(20)
    return () => id.remove();
  }, []);

	const player = new Player(0, 100) 
	const floor = new Platform(0, -100)

	const Acc = function(state) {
		const player = state['player'].body
		player.v.x = ref.current.y * -800
		return state
	}

  return (
    <GameEngine
      systems={[Update, Touch, Collide, Acc]}
      entities={{
				engine: {},
				player: {body: player, color: 'dodgerblue', renderer: Box, totalTime: 0},
				floor: {body: floor, floorID: -1, renderer: Box}
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
};

export default RigidBodies;
