const Update = (state, { touches, time, screen }) => {
	const body = state['player'].body
	const dt = time.delta / 1000;
	body.v.x += body.a.x * dt
	body.v.y += body.a.y * dt
	body.v.y = Math.max(-500, body.v.y)
	body.p.x += body.v.x * dt
	body.p.y += body.v.y * dt
	body.canJump = body.v.y < 0
	
		
	return state;
};

const Touch = (state, { touches, time, screen}) => {
	const press = touches.find(t => t.type == 'press')
	const player = state['player'].body
	if (press) {
		if (player.a.y != 0)
			player.v.y = 400
	}
	return state;
}

const Collide = (state, { time, screen }) => {
	function checkCollision(p, q) {
		if (!p.canJump) return false
		const xdis = Math.abs(p.p.x - q.p.x) - (p.size.width + q.size.width) / 2
		if (xdis > 0) return false
		const ydis = (p.p.y - q.p.y) - (p.size.height + q.size.height) / 2
		return ydis > -10 && ydis < 5
	}
	const player = state['player'].body
	Object.keys(state)
	.filter(key => key != 'player')
	.forEach(key => {
		if (checkCollision(player, state[key].body)) {
			player.v.y = 0
			player.a.y = 0
			player.p.y = state[key].body.p.y+(player.size.height+state[key].body.size.height)/2
			setTimeout(() => {
				player.v.y = 500
				player.a.y = player.gravity
			}, 150);
		}
	})

	return state
}

export { Update, Touch, Collide };
