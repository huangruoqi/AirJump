import {Dimensions} from 'react-native'
import { Box } from "./renderers";

let floorID = 1
const {width, height} = Dimensions.get('screen')

const Update = (state, { touches, time, screen}) => {
	const body = state['player'].body
	const dt = time.delta / 1000;
	body.v.x += body.a.x * dt
	body.v.y += body.a.y * dt
	body.v.y = Math.max(-600, body.v.y)
	body.p.x += body.v.x * dt
	body.p.x = Math.max(-width/2 +50, body.p.x)
	body.p.x = Math.min(width/2 -50, body.p.x)
	body.p.y += body.v.y * dt
	body.canJump = body.v.y < 0
	state['player'].totalTime += time.delta	
	if (state['player'].totalTime >= 1300) {
		state['player'].totalTime = 0	
		state[floorID] = {
			body: new Platform(200+width / 2,Math.trunc(Math.random() * 50) - 100),
			floorID: floorID,
			renderer: Box
		}
		floorID++;
	}

	Object.keys(state).filter(key => state[key].floorID).forEach(key => {
		const b = state[key].body
		const dt = time.delta / 1000;
		b.v.x += b.a.x * dt
		b.v.y += b.a.y * dt
		b.p.x += b.v.x * dt
		b.p.y += b.v.y * dt
		if (b.p.x < -width / 2 -200) {
			delete state[key]
		}
	})
	return state;
};


class Platform {
	constructor(x, y, up) {
		this.p = {x: x, y: y}
		this.v = {x: -200, y: 0}
		this.a = {x: 0, y: 0}
		this.size = {width: Math.trunc(height / 2.5), height: Math.trunc(height / 10)}
		this.upVelocity = up
	}
}

const Touch = (state, { touches, time, screen}) => {
	const press = touches.find(t => t.type == 'press')
	const player = state['player'].body
	if (press) {
		if (player.a.y != 0)
			player.v.y = 450
	}
	return state;
}

const Collide = (state) => {
	function checkCollision(p, q) {
		if (!p.canJump) return false
		const xdis = Math.abs(p.p.x - q.p.x) - (p.size.width + q.size.width) / 2
		if (xdis > 0) return false
		const ydis = (p.p.y - q.p.y) - (p.size.height + q.size.height) / 2
		return ydis > -15 && ydis < 0
	}
	const player = state['player'].body
	Object.keys(state)
	.filter(key => state[key].floorID)
	.forEach(key => {
		if (checkCollision(player, state[key].body)) {
			player.v.y = 0
			player.a.y = 0
			player.p.y = (state[key].body.p.y + player.p.y + player.size.height) / 2 
			setTimeout(() => {
				player.v.y = state[key].body.upVelocity
				player.a.y = player.gravity
			}, 150);
		}
	})

	return state
}

export { Update, Touch, Collide };
