let score = 0;
let active_fallers = [];
let burger_stack = [];
const faller_width = 100;
const faller_height = 30;
const catcher_width = 100;
const catcher_height = 30;




class Faller {
    constructor( x_pos, y_pos, y_speed, type, color) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.y_speed = y_speed;
        this.type = type;
        this.color = color;
    }
    
    move() {
        // remove faller from list if out of screen
        if( this.y_pos > windowHeight+faller_width/2) {
            active_fallers.shift();
            delete this;
        }

        // advance faller
        this.y_pos += this.y_speed;
    }
    // display faller
    display() {
        fill(this.color);
        ellipse(this.x_pos, this.y_pos, faller_width, faller_height);
    }
    isColliding() {
        // check x_pos value is with X pixels of catcher
        if( abs(this.x_pos - mouseX) < catcher_width ) {
            // check y_pos value is within X pixels of catcher
            if( abs(this.y_pos - (windowHeight-catcher_height/2)) < catcher_height/2 ) {
                // grab index of faller colliding
                const index_of_faller = active_fallers.indexOf(this);

                // remove faller from list of actice_fallers
                active_fallers.splice(index_of_faller,1);

                // increment score
                score++;

                // add topping to stack
                burger_stack.push(this);
            }
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);


}

function draw() {
    clear();
    runGame();
}


// function to add new Faller to sky
function addFaller() {
    let x_pos = Math.random()*(windowWidth - faller_width/2) + faller_width/2;
    let y_pos = -(faller_height/2);
    let y_speed = 6 ;
    let type = "topping";
    let color = "Red";
    let new_faller = new Faller( x_pos, y_pos, y_speed, type, color);
    active_fallers.push(new_faller);
}

let skip_frame_counter = 0;
function runGame() {
    // skip every XX frames and then add new faller
    if( skip_frame_counter == 100 ) {
        addFaller();
        skip_frame_counter = 0
     } else {
         skip_frame_counter++;
     }

    // display current fallers
    for( const faller of active_fallers ) {
        faller.move();
        faller.display();
        faller.isColliding();
    }
    displayCatcher();
}

function displayCatcher() {

    let stack_height = burger_stack.length * faller_height;
    for( let i = 0; i < burger_stack.length; i++ ) {
        burger_stack[i].x_pos = mouseX;
        burger_stack[i].y_pos = windowHeight - stack_height + (faller_height*i/3);
        burger_stack[i].display();
    }
}

