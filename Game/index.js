import React from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Update, Touch, Collide } from "./systems";
import { Box } from "./renderers";

const { width, height } = Dimensions.get("screen");

class Player {
	constructor(x, y) {
		this.p = {x: x, y: y}
		this.v = {x: 0, y: 0}
		this.gravity = -800
		this.a = {x: 0, y: this.gravity}
		this.size = {width: Math.trunc(height / 8), height: Math.trunc(height / 8)}
		this.canJump = true
	}
}

class Platform {
	constructor(x, y) {
		this.p = {x: x, y: y}
		this.v = {x: 0, y: 0}
		this.a = {x: 0, y: 0}
		this.size = {width: Math.trunc(height / 2), height: Math.trunc(height / 8)}
	}
}


const RigidBodies = (props) => {
	const player = new Player(0, 100) 
	const floor = new Platform(0, -100)
  return (
    <GameEngine
      systems={[Update, Touch, Collide]}
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
