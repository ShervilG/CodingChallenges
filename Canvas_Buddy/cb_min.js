// some global variables
let board = document.getElementById('gc');
let pen = board.getContext('2d');
let w = board.width ,h = board.height;
board.style.border = "3px solid black";
pen.strokeStyle = "black";

const lw = pen.lineWidth;


// some additional classes
//------------------------------------------------------------------------------------------------------------------------//

// point
class point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	draw(color) {
		pen.lineWidth = 3;
		pen.strokeStyle = color;
		pen.fillStyle = color;
		pen.beginPath();
		pen.arc(this.x,h-this.y,3,0,(Math.PI)*2,false);
		pen.fill();
		pen.stroke();
		pen.closePath();
		pen.lineWidth = lw;
	}
}

// vector
class vector {
	// initial and final co-ordinates
	constructor(x1,y1,x2,y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.magnitude = Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
	}
	// draw the vector
	draw = (w=2,s='black') => {
		pen.lineWidth = w;
		pen.strokeStyle = s;
		pen.moveTo(this.x1,h-this.y1);
		pen.lineTo(this.x2,h-this.y2);
		pen.stroke();
		pen.lineWidth = lw;
	}
}

//------------------------------------------------------------------------------------------------------------------------//



// basic geometric shapes
//------------------------------------------------------------------------------------------------------------------------//

// Rectangle 
// x,y are co-ordinates top left of rectangle, l,b are length and breadth respectively, s1 refers to boundary color and s2 refers to fill color,w is the boundary width
const rectangle = (x,y,l,b,w=2,s1='black',s2='white') => {
	pen.lineWidth = w;
	pen.strokeStyle = s1;
	pen.fillStyle = s2;
	pen.strokeRect(x,h-y,l,b);
	pen.fillRect(x,h-y,l,b);
	pen.lineWidth = lw;
}

// Square
// x,y are top left co-ordinate,s is side s1 refers to boundary color and s2 refers to fill color,w is boundary width
const square = (x,y,s,w=2,s1='black',s2='white') => {
	pen.lineWidth = w;
	pen.strokeStyle = s1;
	pen.fillStyle = s2;
	pen.strokeRect(x,h-y,s,s);
	pen.fillRect(x,h-y,s,s);
	pen.lineWidth = lw;
} 

// Circle
// x,y are co-ordinates of center, r is radius, s1 refers to boundary color and s2 refers to fill color,w is boundary width
const circle = (x,y,r,w=2,s1='black',s2='white') => {
	pen.lineWidth = w;
	pen.strokeStyle = s1;
	pen.fillStyle = s2;
	pen.beginPath();
	pen.arc(x,h-y,r,0,(Math.PI)*2,false);
	pen.fill();
	pen.stroke();
	pen.closePath();
	pen.lineWidth = lw;
}

// A line Segment
// x1,y1 first co-ordinates x2,y2 second co-ordinates,w is line width and s is stroke style
const line = (x1,y1,x2,y2,w=2,s='black') => {
	pen.beginPath();
	pen.lineWidth = w;
	pen.strokeStyle = s;
	pen.moveTo(x1,h-y1);
	pen.lineTo(x2,h-y2);
	pen.stroke();
	pen.lineWidth = lw;
	pen.closePath();
}

// A polygon
// draws in the order of points as in the list
const polygon = (list,w=3,s='black')=> {
	let p1 = list[0];
	let t1 = list[0];
	for (let i = 1;i<list.length;i++) {
		line(p1.x,p1.y,list[i].x,list[i].y,w,s);
		p1 = list[i];
	}
	line(p1.x,p1.y,t1.x,t1.y,w,s);
}

// print some text
const text = (s,x,y,face,size) => {
	pen.font = size + "px " + face;
	pen.fillText(s,x,h-y);
}

//------------------------------------------------------------------------------------------------------------------------//




// some helper functions
//------------------------------------------------------------------------------------------------------------------------//

// distance between 2 points
const distance = (p1,p2) => {
	return Math.sqrt(Math.pow((p1.x - p2.x),2) + Math.pow((p1.y - p2.y),2));
}

// mouse position, returns an object on event trigger
const getMousePos = (evt) => {
    let rect = board.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top
    y = h - y;
    if(x>=0 && x<=w && y>=0 && y<=h) {
    	return {x,y};
	}
	else {
		x = -9999;
		y = -9999;
		return {x,y};
	}
}

// clear everything
const clear_canvas = () => {
	pen.clearRect(0,0,w,h);
}

//------------------------------------------------------------------------------------------------------------------------//




