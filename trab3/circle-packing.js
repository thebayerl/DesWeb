dot_list = [];
rmin = 2;
var state = false;

var bd = document.getElementById("bd");
bd.style.cssText = "width:" + screen.width + "px; height:" + screen.height + "px;"

var bg = document.getElementById("bg")
xmax = bg.offsetWidth;
ymax = bg.offsetHeight;

function startnstop(){
    if(state){
        document.getElementById("start").textContent = "Begin";
        state = false;
    }else{
        document.getElementById("start").textContent = "Pause";
        state = true;
    }
}

function reset(){
    state = false;
    dot_list = []
    document.getElementById("stats").textContent = "";
    document.getElementById("quant").textContent = 0;   
    document.getElementById("start").textContent = "Start";
    document.getElementById("bg").innerHTML = "";
}

function random_color(){
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    return rgb;
}

function ponto_aleatorio(xmax, ymax){
    var x = Math.floor(Math.random()*xmax);
    var y = Math.floor(Math.random()*ymax);
    return [x,y];
}

function raio_aleatorio(cord, xmax, ymax, rmin, rmax){
    var x = cord[0];
    var y = cord[1];
    var r = Math.floor(Math.random()*(rmax - rmin) + rmin);
    return [x,y,r];
}

function distancia_lista(p, dot_list){
    var x = p[0];
    var y = p[1];
    var dist_list = [x, y, xmax - x, ymax - y];

    for(var i=0; i<dot_list.length;i++){
        var p2 = dot_list[i]
        var dist = Math.pow(Math.pow((x - p2[0]), 2) + Math.pow((y - p2[1]), 2), 0.5);
        var dist = dist - p2[2];
        dist_list.push(dist);
    }

    return Math.min.apply(Math,dist_list);
}

function draw(){
    if(!state){
        return 0;
    }

    var cord = ponto_aleatorio(xmax,ymax);
    // document.write(cord)
    // document.write("<br>")
    var d = distancia_lista(cord, dot_list);
    // document.write(d)
    // document.write("<br>")
    if(d >= rmin){
        var ponto = raio_aleatorio(cord, xmax, ymax, rmin, d);
        dot_list.push(ponto);
        console.log(ponto);
        // document.write(ponto);

        var rgb = random_color()

        var circle = document.createElement("div");
        circle.classList.add("shape");
        circle.onclick = function(){
            r = this.style.width;
            r = parseInt(r.substring(0, r.length-2))/2
            x = this.style.left;
            x = parseInt(x.substring(0, x.length-2))
            x = x + r
            y = this.style.top;
            y = parseInt(y.substring(0, y.length-2))
            y = y + r
            color = this.style.backgroundColor;
            var stats = "x = " + x + ", y = " + y + ", r = " + r + ", color = " + color;
            document.getElementById("stats").textContent = stats
        };
        circle.style.cssText = 'width:' + ponto[2]*2 + 'px; height:' + ponto[2]*2 + 'px; top:' + (ponto[1] - ponto[2]) + 'px; left:' + (ponto[0] - ponto[2]) + 'px; background-color:' + rgb;

        document.getElementById("bg").appendChild(circle)

        document.getElementById("quant").textContent = dot_list.length
    }
}

setInterval(draw,1000/30);


