
var baseUrl = 'http://whitevinyldesign.com/experiments/';
var experiments = [
    {
        title: 'Flow',
        url: 'flow',
        description: "Flow generates marbled paint flow textures in realtime. Rendered in Canvas, it uses Perlin noise to generate the form and color patterns. This was adapted from a texture generating library I'd been working on."
    },
    {
        title: 'Crush',
        url: 'crush',
        description: "Crush generates glitchy patterns in Canvas, by creating a Perlin noise heightmap, and mapping the height data back into itself. The reduced feedback creates rectangular shapes."
    },
    {
        title: 'Wave',
        url: 'wave',
        description: "Wave creates the effect of motion on the surface of a dark and slightly gooey liquid, in a pseudo-3D style. Rendered in 2D Canvas, it uses Perlin noise to displace and tint a map of triangles."
    },
    /*{
        title: 'Warp',
        url: 'warp',
        description: "Warp takes the image data of a photo and distorts it in realtime. The shape and movement of the distortion use Perlin noise, and the distortion is rendered using an array of drawn lines rendered in Canvas."
    },*/
    {
        title: 'Swell',
        url: 'swell',
        description: "Swell distorts an image in realtime, it creates it ripples by slicing the image into many horizontal views, which are then indivually displaced by Perlin noise. Rendered in Canvas."
    },
    {
        title: 'Txt',
        url: 'txt',
        description: "Realtime type distortion, creates ripples by slicing the type into many horizontal strips, which are then indivually displaced by Perlin noise. Rendered in Canvas."
    },
    {
        title: 'Walk',
        url: 'walk',
        description: "Walk paints soft colorful abstract gradient shapes in realtime. Movement and color shifting is generated with perlin noise, and rounded lines are rendered in Canvas."
    }
];

var menuState = 1;
var menuAnimating = false;
var menuCounter = 0;

var experiment;
var line = [
    new LinePoint('M', 1, 25, 20, 20), new LinePoint('L', 99, 25, 80, 80),
    new LinePoint('M', 1, 50, 50, 50), new LinePoint('L', 99, 50, 50, 50),
    new LinePoint('M', 1, 75, 20, 80), new LinePoint('L', 99, 75, 80, 20)
];

// DOM Elements //
var menuIcon, svg, path, menuList;




// INIT //
function setupExperiment() {

    // CREATE MENU ICON //
    menuIcon = document.createElement('div');
    menuIcon.id = 'menuIcon';
    menuIcon.onclick = function() {toggleMenu();}


    // CREATE HAMBURGER SVG //
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute('viewBox','0 0 100 100');
    svg.setAttribute('preserveAspectRatio','none');

    path.setAttribute('d','M1 25 L99 25 M1 50 L99 50 M1 75 L99 75');
    path.setAttribute('vector-effect','non-scaling-stroke');
    path.setAttribute('stroke','currentColor');
    path.setAttribute('fill','none');
    path.setAttribute('stroke-width','3');
    path.setAttribute('stroke-linecap','square');


    // APPEND ELEMENTS //
    document.body.appendChild(menuIcon);
    svg.appendChild(path);
    menuIcon.appendChild(svg);


    // CREATE MENU //
    menuList = document.createElement('div');
    menuList.id = 'menuList';



    // ADD MENU ITEMS //
    var l = experiments.length;
    for (var i=0; i<l; i++) {
        var exp = experiments[i];
        var item = document.createElement('a');
        item.classList = 'menuItem';
        item.setAttribute('href', baseUrl + exp.url);

        var title = document.createElement('div');
        title.classList = 'menuTitle';
        title.innerHTML = exp.title;

        var num = document.createElement('div');
        num.classList = 'menuNumber';
        var n = '';
        if (i < 9) n += '0';
        num.innerHTML = n + (i + 1);

        item.appendChild(num);
        item.appendChild(title);
        menuList.appendChild(item);
    }

    // ADD HOME LINK //
    if (window.location.href !== baseUrl) {
        var item = document.createElement('a');
        item.classList = 'menuItem home';
        item.setAttribute('href', baseUrl);

        var title = document.createElement('div');
        title.classList = 'menuTitle homeTitle';
        title.innerHTML = 'All Experiments';

        var num = document.createElement('div');
        num.classList = 'menuNumber homeNumber';
        num.innerHTML = '<';

        item.appendChild(num);
        item.appendChild(title);
        menuList.appendChild(item);
    }

    document.body.appendChild(menuList);


    // ADD INFO BOX //

    // ADD INFO ICON //

    experiment = new Experiment();
}


// MENU INTERACTION //
function toggleMenu() {
    if (menuState === 1) {
        menuState = 2;
        menuList.style.left = '20px';
    } else {
        menuState = 1;
        menuList.style.left = '-220px';
    }

    menuAnimating = true;
    menuCounter = 15;
}



function Experiment(){

}
Experiment.prototype.update = function() {

    if (menuAnimating) {
        // loop through line points, animate them & update the svg path string //
        var l = line.length;
        var d = '';
        for (var i=0; i<l; i++) {
            line[i].update();
            d += line[i].print();
        }
        path.setAttribute('d',d);

        // turn animation off after a while to save processing //
        menuCounter --;
        if (menuCounter < 1) menuAnimating = false;
    }
};


function LinePoint(type, x1, y1, x2, y2) {
    this.type = type;
    this.x = [x1,x1,x2];
    this.y = [y1,y1,y2];
}
LinePoint.prototype.update = function() {
    // index zero is the co-ords we're animating //
    // index 1 is hamburger state, index 2 is X state //
    this.x[0] = lerp(this.x[0],this.x[menuState],30);
    this.y[0] = lerp(this.y[0],this.y[menuState],30);
};
LinePoint.prototype.print = function() {
    // return a string of this point //
    return '' + this.type + '' + this.x[0] + ' ' + this.y[0];
};
