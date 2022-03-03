import { Dimensions } from "react-native";
import { Box, Regular, Jumppad, Fly } from "./renderers";
import levels from "./levels";

let floorID = 1;
const { width, height } = Dimensions.get("screen");

let totalLevel = levels.length;
let currentLevel = 0;
let totalCount = levels[0].length;
let currentCount = 0;

class Platform {
  constructor(name, x, y) {
    this.p = { x: x, y: y };
    this.v = { x: -200, y: 0 };
    this.a = { x: 0, y: 0 };
    this.size = {
      width: Math.trunc(height / 2.5),
      height: Math.trunc(height / 10),
    };
    this.upVelocity = name != "jumppad" ? 700 : 850;
    this.ypos = this.p.y;
    this.jy = 0;
    this.jt = 0;
    this.isJiggling = false;
    this.renderer = name != "jumppad" ? Regular : Jumppad;
  }

  jiggle(dt) {
    if (!this.isJiggling) return;
    this.jt += dt / 100;
    const jy =
      (20 * -Math.sin(this.jt * 1.2)) /
      Math.pow(this.jt, (this.jt / 10) * 0.5 + 0.5);
    this.p.y = this.ypos + jy;
    if (this.jt > 10) {
      this.jt = 0;
      this.isJiggling = false;
      this.p.y = this.ypos;
    }
  }
}

class Monster {
  constructor(name, x, y) {
    this.p = { x: x, y: y };
    this.v = { x: -200, y: 0 };
    this.a = { x: 0, y: 0 };
    this.size = {
      width: Math.trunc(height / 2.5),
      height: Math.trunc(height / 10),
    };
    this.upVelocity = 650;
    this.ypos = this.p.y;
    this.jy = 0;
    this.jt = 0;
    this.isJiggling = false;
    this.renderer = Fly;
  }
}

const Update = (state, { touches, time, screen }) => {
  const body = state["player"].body;
  const dt = time.delta / 1000;
  body.v.x += body.a.x * dt;
  body.v.y += body.a.y * dt;
  body.v.y = Math.max(-700, body.v.y);
  body.p.x += body.v.x * dt;
  body.p.x = Math.max(-width / 2 + 50, body.p.x);
  body.p.x = Math.min(width / 2 - 50, body.p.x);
  body.p.y += body.v.y * dt;
  body.canJump = body.v.y < 0;

  Object.keys(state)
    .filter((key) => state[key].floorID)
    .forEach((key) => {
      const b = state[key].body;
      const dt = time.delta / 1000;
      b.v.x += b.a.x * dt;
      b.v.y += b.a.y * dt;
      b.p.x += b.v.x * dt;
      b.p.y += b.v.y * dt;
      b.jiggle(time.delta);
      if (b.p.x < -width / 2 - 200) {
        delete state[key];
      }
    });
	
	state.bg.body.p.x += state.bg.body.v.x * dt
	if (state.bg.body.p.x < -1920) state.bg.body.p.x += 1920
  return state;
};

const Level = (state, { touches, time, screen }) => {
  const nextPlatorm = () => {
    if (currentLevel >= totalLevel) return;
    const obj = levels[currentLevel][currentCount++];
    if (currentCount >= totalCount) {
      currentLevel++;
      totalCount = levels[currentLevel] ? levels[currentLevel].length : 0;
    }
    const floor = new Platform(obj.name, 200 + width / 2, obj.pos);
    return {
      body: new Platform(obj.name, 200 + width / 2, obj.pos),
      floorID: floorID,
      renderer: floor.renderer,
    };
  };
  state["player"].totalTime += time.delta;
  if (state["player"].totalTime >= 800) {
    state["player"].totalTime = 0;
    const p = nextPlatorm();
    if (p) state['floor'+floorID++] = p;
    else {
      const a = Math.random() < 0.5;
      const floor = new Platform(
        a ? "regular" : "jumppad",
        200 + width / 2,
        -100
      );
      state['floor'+floorID++] = {
        body: floor,
        floorID: floorID,
        renderer: floor.renderer,
      };
    }
  }
  return state;
};

const Touch = (state, { touches, time, screen }) => {
  const press = touches.find((t) => t.type == "press");
  const player = state["player"].body;
  if (press) {
    player.powerJump();
  }
  return state;
};

const Collide = (state) => {
  function checkCollision(p, q) {
    if (!p.canJump) return false;
    const xdis = Math.abs(p.p.x - q.p.x) - (p.size.width + q.size.width) / 2;
    if (xdis > 0) return false;
    const ydis = p.p.y - q.p.y - (p.size.height + q.size.height) / 2;
    return ydis > -35 && ydis < -20;
  }
  const player = state["player"].body;
  Object.keys(state)
    .filter((key) => state[key].floorID)
    .forEach((key) => {
      if (checkCollision(player, state[key].body)) {
        // player.p.y = state[key].body.p.y + state[key].body.size.height / 2 + player.size.height /2 - 25
        player.platformJump(state[key].body.upVelocity);
        state[key].body.isJiggling = true;
        state.player.r.current();
      }
    });

  return state;
};

export { Update, Level, Touch, Collide };
