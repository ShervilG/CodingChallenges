// global shit
const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');
const w = canvas.width,h = canvas.height;
let made = false;

let space = [];
let points = [];


class point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.rad = 4;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.rad,0,(Math.PI)*2,false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

const orientation = (p,q,r) => {
    let diff = (p.y - q.y)*(q.x - r.x) - (p.x - q.x)*(q.y - r.y);
    if (diff==0)
        return 0;
    if(diff>0)
        return 1;
    else
        return 2;
}

const getMousePos = (canvas,evt) => {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

const spawn = (e) => {
    let c = getMousePos(canvas,e);
    if(c.x>=0 && c.x<=w && c.y>=0 && c.y<=h) {
        for(let x = 0;x<space.length;x++) {
            if(space[x].x==c.x && space[x].y == c.y) {
                alert('same posiiiii');
                return;
            }
        }
        let p1 = new point(c.x,c.y);
        space.push(p1);
    }
}

// algorithm
const findHull = () => {
    if (space.length == 0) {
        alert('No points marked !');
    }
    else {
        let ind = 0;
        let leftmost = space[0];
        for(let i = 1;i<space.length;i++) {
            if(space[i].x < leftmost.x) {
                leftmost = space[i];
                ind = i;
            }
        }
        //console.log('x: ' + leftmost.x);
        //console.log('y: ' + leftmost.y);
        ctx.strokeStyle = "rgb(190, 10, 250)";
        ctx.lineWidth = 3;
        let p = ind;
        let q;
        do {
            points.push(space[p]);
            q = (p+1)%space.length;
            for (let i = 0; i < space.length; i++) {
                if (orientation(space[p], space[i], space[q]) == 2)
                    q = i;
            }
        p = q;
  
    }while (p != ind);
    }
    let p1 = points[0];
    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    for(let i=1;i<points.length;i++) {
        ctx.lineTo(points[i].x,points[i].y);
        ctx.moveTo(points[i].x,points[i].y);
    }
    ctx.lineTo(p1.x,p1.y);
    ctx.stroke();
    ctx.closePath();
}

const clear1 = () => {
    while(space.length!=0) {
        space.pop();
    }
    while(points.length!=0) {
        points.pop();
    }
    //console.log(space.length);
    ctx.clearRect(0,0,w,h);
}

document.addEventListener("click",spawn);


