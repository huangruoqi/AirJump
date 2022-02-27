const Physics = (state, { touches, time, screen }) => {
	const body = state['player'].body
	const dt = time.delta / 1000;
	body.v.x += body.a.x * dt
	body.v.y += body.a.y * dt
	body.p.x += body.v.x * dt
	body.p.y += body.v.y * dt
	if (body.p.y > screen.height-250) 
		body.v.y = -body.v.y
	return state;
};

const Touch = (state, { touches, time, screen}) => {
	const press = touches.find(t => t.type == 'press')
	if (press) {
		state['player'].body.v.y = -600
	}
	return state;
}

export { Physics, Touch };
