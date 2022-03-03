import * as React from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Update, Level, Touch, Collide } from "./systems";
import { Box, Nut } from "./renderers";
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get("screen");

class Player {
	constructor(x, y) {
		this.p = { x: x, y: y }
		this.v = { x: 0, y: 0 }
		this.gravity = -1400
		this.a = { x: 0, y: this.gravity }
		this.size = { width: Math.trunc(height / 8), height: Math.trunc(height / 8) }
		this.canJump = true
		this.power = 5;
		this.renderer = Nut
	}

	platformJump(upVelocity) {
		this.v.y = 0
		this.a.y = 0
		this.canJump = false
		setTimeout(() => {
			this.v.y = upVelocity
			this.a.y = this.gravity
			this.canJump = true
		}, 100);
	}

	powerJump() {
		if (this.a.y != 0) this.v.y = 650
		this.power--;
		console.log('power: ' + this.power)
	}
}




const RigidBodies = (props) => {
	const acc = React.useRef({ x: 0, y: 0, z: 0 })
	const ref = React.useRef(null)
	React.useEffect(() => {
		const id = Accelerometer.addListener(accelerometerData => {
			acc.current = accelerometerData
		})
		Accelerometer.setUpdateInterval(20)
		return () => id.remove();
	}, []);

	const player = new Player(0, 100)

	const Acc = function (state) {
		const player = state['player'].body
		player.v.x = acc.current.y * -800
		return state
	}

	return (
		<GameEngine
			systems={[Update, Level, Touch, Collide, Acc]}
			entities={{
				player: { body: player,r: ref,color: 'dodgerblue', renderer: player.renderer, totalTime: 0 },
			}}
		>
			<StatusBar hidden={true} />
		</GameEngine>
	);
};

export default RigidBodies;
