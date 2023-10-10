let number = 3;
let countdown = 10;
let is_paper = 0;
let is_cheese = 0;
let is_lettuce = 0;
let burger = {};

class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneA' });
  }
  preload(){
    this.load.image('window_bkg', './Assets/OrderWindow.jpg');
    this.load.image('arrow', './Assets/Arrow.png');    
}

  create(){
    this.graphics = this.add.graphics();
    this.imageObject = this.add.sprite(
      390,
      380,
      'window_bkg',
  )
  this.imageObject.setScale(.5);
  let arrow = this.imageObject = this.add.image(
    800,
    650,
    'arrow',
)
this.imageObject.setScale(.05);
arrow.setInteractive()
arrow.on('pointerdown', ()=> {
  this.scene.start('intro')
})
  
   /* this.add.text(200,100,"Click to begin", {fontSize: 65, fill: '#fff2cc', fontStyle: 'italic'});
                this.input.on('pointerdown', () => this.scene.start('intro'));
*/
}
update(){
  {countdown--;}
  //console.log('A', countdown)
}
}



class Intro extends Phaser.Scene {
  constructor() {
      super('intro');}
preload(){
  this.load.image('cheese', './Assets/Cheese.png');
  this.load.image('lettuce', './Assets/Lettuce.png');
  this.load.image('food_bkg', './Assets/WorkStation.jpg');
  this.load.image('arrow', './Assets/Arrow.png');
    
}
create(){

  this.graphics = this.add.graphics();
  //the image objects and the number of times they have been clicked
  this.imageObjects = [];
  //current burger elements
  this.burger = {};
  this.burger['cheese'] = 0;
  this.burger['lettuce'] = 0;
  //contians the ingrediatns to the burger
  const order1 = {'cheese': Phaser.Math.Between(0, 2), 'lettuce': Phaser.Math.Between(0, 3)}
  console.log('order', order1);
  //randomized order
  //probably declare later
  const keyboard = this.input.keyboard;
  // Create a keyboard input manager
  
  this.imageObject = this.add.sprite(
    380,
    380,
    'food_bkg',
)
this.imageObject.setScale(.45);
let arrow = this.imageObject = this.add.image(
  800,
  650,
  'arrow',
)
this.imageObject.setScale(.05);
arrow.setInteractive()
arrow.on('pointerdown', ()=> {
  this.scene.start('SceneA')}
)

let paper = this.imageObject = this.add.image(300, 540,'cheese').setInteractive()
paper.setScale(.4);
paper.on('pointerdown', () =>{
  this.createImage(460, 430, 'cheese', 0.4)
  }
)
let Cheese = this.imageObject = this.add.image(600,430,'cheese').setInteractive()
Cheese.setScale(.2);
Cheese.on('pointerdown', ()=> {
  this.createImage(440, 430, 'cheese', .2)
  //console.log('cheese count in create', is_cheese)
})

let Lettuce = this.add.image (700, 430, 'lettuce').setInteractive()
Lettuce.setScale(.2);
Lettuce.on('pointerdown', ()=>{
  this.createImage(450, 430, 'lettuce', 0.4);
})
keyboard.on('keydown-SPACE', () => {
  console.log(this.burger);
  const objectsMatch = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false; // Objects have different numbers of keys
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false; // Values for the same key are different
      }
    }
    return true;
  };
  if (objectsMatch(this.burger, order1)) {
    console.log('The objects match.');
  } else {
    console.log('The objects do not match.');
  }


})
}





createImage(x, y, pic, z) {
  const subtractValueByKey = (object, key) => {
    if (object[key] !== undefined) {
      if (object[key] >= 1){
        object[key] -= 1;
        
      }
    }}

  this.pic = pic
  if (pic == 'cheese'){
    is_cheese ++
    this.burger['cheese'] = is_cheese;
  }else if (pic == 'lettuce'){
    is_lettuce ++
    this.burger['lettuce'] = is_lettuce
  }
  // Create an image object
  const image = this.add.image(x, y - number, pic);
  image.setScale(z)

  // Enable input on the image for click events
  image.setInteractive();
  number ++

  // Initialize a click count for the image
  image.clickCount = 0;

  // Set a click event handler for the image
  image.on('pointerdown', () => {
    image.clickCount += 1;
    if (image.clickCount >= 1) {
      image.x = 700
      image.y = 550
      //console.log('Image has been clicked more than once.');
      // You can perform additional actions for multiple clicks here
      if(pic == 'cheese'){
        const keyToSearch = 'cheese'; // Change this to the key you want to search
        subtractValueByKey(burger, keyToSearch);
        if (is_cheese >= 1){
        is_cheese --
        this.burger['cheese'] = is_cheese;
        }
        
        //console.log('trash',is_cheese)
      } else if (pic == 'lettuce'){
        const keyToSearch = 'lettuce';
        subtractValueByKey(burger, keyToSearch);
        if(is_lettuce >= 1){
          is_lettuce --
          this.burger['lettuce'] = is_lettuce;
        }
        //console.log('lettuce',is_lettuce)
      }
      console.log(this.burger)
    }
  
  })
    this.imageObjects.push(image);
  }

update(){
  {countdown--;}
  //console.log('B', countdown)
  
}}



let config = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 700,
  backgroundColor: "black",
  scene: [Intro, SceneA],
}

let game = new Phaser.Game(config);


/*let text = this.add.text(200,100,"Gross, don't touch that!", {fontSize: 65, fill: '#fff2cc', fontStyle: 'italic'});
        this.tweens.add({
          targets: text,
          alpha: 0, // Target alpha value (fully transparent)
          duration: 1000, // Duration of the tween in milliseconds
          ease: 'Linear',})
          console.log(object[key])*/