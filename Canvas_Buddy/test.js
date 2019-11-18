// testbed for checking the script
let obj_list = [];
let obj_count = 0;

class game_object {
	constructor(x,y,s) {
		this.x = x;
		this.y = h - y;
		this.s = s;
	}
	draw = () => {
		square(this.x,this.y,this.s,3);
	}
	hit = (m) => {
		if (m.x>=this.x && m.x<=this.x+this.s) {
			if(m.y>=this.y-this.s && m.y<=this.y+this.s) {
				obj_count--;
				return true;
			}
		}
		return false;
	}
}

const random_spawn = () => {
	if(obj_count<5) {
		obj_count++;
		let x = Math.random()*w;
		let y = Math.random()*h;
		let s = Math.random()*50;
		let g = new game_object(x,y,s);
		obj_list.push(g);
	}
}

const draw = () => {
	if(obj_list.length >0) {
		for (let i =0;i<obj_list.length;i++) {
			obj_list[i].draw();
		}
	}
}


const event = (e) => {
	let m = getMousePos(e);
	let s1 = "X : " + m.x;
	let s2 = "Y : " + m.y;
	let s3 = "(" + s1 + ", " + s2 + ")";
	let p = new point(m.x,m.y);
	//p.draw("red");
	// make the crosshair
	line(p.x,p.y,p.x+7,p.y,2,"red");
	line(p.x,p.y,p.x,p.y-7,2,"red");
	line(p.x,p.y,p.x-7,p.y,2,"red");
	line(p.x,p.y,p.x,p.y+7,2,"red");
	text(s3,4,h-12,"Roboto Mono",13);
}

const make = () => {
	clear_canvas();
	random_spawn();
	draw();
	event();
}


const dest = (e) => {
	let m = getMousePos(e);
	if(obj_list.length >0) {
	for (let i =0;i<obj_list.length;i++) {
		if (obj_list[i].hit(m)) {
			let t = obj_list[obj_list.size - 1];
			obj_list[obj_list.size - 1] = obj_list[i];
			obj_list[i] = t;
			obj_list.pop();
		}
	}}
}

document.addEventListener("mousehover",event);
document.addEventListener("mousemove",event);

document.addEventListener("click",dest);

setInterval(make,5);
