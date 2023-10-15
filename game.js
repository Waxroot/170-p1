//customer not change
//have more ingrediants appear as cutomer count goes up and 
//limit the time they have
let number = 3;
let countdown = 2000000;
let is_bun = 0;
let is_cheese = 0;
let is_lettuce = 0;
let is_patty = 0;
let burger = {};
let customerCount = 0;


class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneA' });
  }
  preload(){
    this.load.image('window_bkg', './Assets/OrderWindow.png');
    this.load.image('arrow', './Assets/Arrow.png');    
    this.load.image('quote', './Assets/Quote.png');  
    this.load.image('cust1', './Assets/Customer1.png');  
    this.load.image('cust2', './Assets/Customer2.png');  
    this.load.image('cust3', './Assets/Customer3.png');  
    this.load.image('cust4', './Assets/Customer4.png'); 
    this.load.image('cust5', './Assets/Customer5.png');   
      
}

  create(){
    if (!this.registry.has('customer')) {
      // Generate a new random value for 'customer' if it doesn't exist in the registry
      this.registry.set('customer', Phaser.Math.Between(1, 5));
    }

    const customer = this.registry.get('customer');
    console.log('customer', customer);


    this.graphics = this.add.graphics();
    const correct = this.registry.get('correct');
    console.log('here', correct)
    if (!this.registry.has('order1')) {
      const order1 = {'cheese': Phaser.Math.Between(0, 2), 'lettuce': Phaser.Math.Between(0, 3), 'bun': Phaser.Math.Between(1, 3), 'patty': Phaser.Math.Between(0, 4)};
      this.registry.set('order1', order1);
  }
  const order1 = this.registry.get('order1');
  let cust1 = this.imageObject = this.add.image(930,400, 'cust1',).setScale(.7)
  let cust2 = this.imageObject = this.add.image(930,400, 'cust2',).setScale(.7)
  let cust3 = this.imageObject = this.add.image(930, 400,'cust3',).setScale(.7)
  let cust4 = this.imageObject = this.add.image(930,400, 'cust4',).setScale(.7)
  let cust5 = this.imageObject = this.add.image(930,400, 'cust5',).setScale(.7)

  this.imageObject = this.add.sprite(
    420,
    360,
    'window_bkg',
)
this.imageObject.setScale(.7);
let arrow = this.imageObject = this.add.image(
  800,
  650,
  'arrow',
)
this.imageObject.setScale(.05);
arrow.setInteractive()
arrow.on('pointerdown', ()=> {
this.registry.set('order1', order1)
this.scene.start('intro')
})

let textbox = this.imageObject = this.add.image(
  560,
  200,
  'quote',
)
this.imageObject.setScale(.6);



//COUNTDOWN
this.countdownText = this.add.text(10, 10, 'Time Left: ' + countdown, {
  fontSize: '20px',
  fill: '#ffffff'
});


const text = this.add.text(420, 150, '', { fontSize: '25px', fill: 'black' });

    let result = '';
    for (const key in order1) {
        if (order1.hasOwnProperty(key)) {
          if (order1[key] != 0){
            result += ` ${order1[key]} ${key}\n `;
        }}
    }
    let hmmm = 'I want a burger with\n';

    text.setText(hmmm + result);
    
    if(correct == 1){
      this.registry.set('customer', Phaser.Math.Between(1, 5));
      //console.log('New customer', this.registry.get('customer'));
    countdown = 2000;
    text.setAlpha(0)
      console.log('right')
      customerCount ++
      console.log('cutomer count', customerCount)
      const text1 = this.add.text(420, 150, 'Took you long enough', { fontSize: '25px', fill: '#ffffff' });
      this.tweens.add({
        targets: text1,
        alpha: 0, // Fade out text1 by reducing its alpha to 0
        duration: 2000, // 2 seconds
        ease: 'Linear',
        onComplete: () => {
          this.tweens.add({
            targets: text,
            alpha: 1, // Fade in text2 by increasing its alpha to 1
            duration: 2000, // 2 seconds
            ease: 'Linear'})

        }})
    }else if (correct == 2){
      this.registry.set('customer', Phaser.Math.Between(1, 5));
      //console.log('New customer', this.registry.get('customer'));
      text.setAlpha(0)
      const text2 = this.add.text(420, 150, 'That wasnt what I ordered!', { fontSize: '25px', fill: '#ffffff' });
      this.tweens.add({
        targets: text2,
        alpha: 0, // Fade out text1 by reducing its alpha to 0
        duration: 2000, // 2 seconds
        ease: 'Linear',
        onComplete: () => {
          this.tweens.add({
            targets: text,
            alpha: 1, // Fade in text2 by increasing its alpha to 1
            duration: 2000, // 2 seconds
            ease: 'Linear'
          });

        }
      })
      /* this.add.text(200,100,"Click to begin", {fontSize: 65, fill: '#fff2cc', fontStyle: 'italic'});
                this.input.on('pointerdown', () => this.scene.start('intro'));
*/
this.registry.set('correct', 0);
    }

   /* this.add.text(200,100,"Click to begin", {fontSize: 65, fill: '#fff2cc', fontStyle: 'italic'});
                this.input.on('pointerdown', () => this.scene.start('intro'));
*/
}
update(){
  //let oof = this.add.text(100, 100, countdown, {fontSize: '25px', fill: '#ffffff' })
  {countdown--;}
  this.countdownText.setText('Countdown: ' + countdown);
  if (countdown <= 0) {
    this.registry.set('correct', 0);
    this.registry.destroy();
    // Move to the failure scene when the countdown reaches the limit
    this.scene.start('failure');
  }
}
}


class Intro extends Phaser.Scene {
  constructor() {
      super('intro');}
preload(){
  this.load.image('cheese', './Assets/Cheese.png');
  this.load.image('lettuce', './Assets/Lettuce.png');
  this.load.image('food_bkg', './Assets/background1.PNG');
  this.load.image('arrow', './Assets/Arrow.png');
  this.load.image('cheesepile', './Assets/Cheesepile.png');
  this.load.image('lettucepile', './Assets/Lettucepile.png');
  this.load.image('bun', './Assets/Bun.png');
  this.load.image('bunpile', './Assets/Bunpatty.png');
  this.load.image('paper', './Assets/Paper.png');
  this.load.image('pattypile', './Assets/Pattypile.png');
  this.load.image('patty', './Assets/Patty.png');
}
create(){
  number = 0
  console.log('cutomer count intro', customerCount)
  this.registry.set('correct', 0)
  let correct = 0;
  // Retrieve 'order1' from the registry
  const order1 = this.registry.get('order1');
  console.log('Order from SceneA:', order1);
  this.graphics = this.add.graphics();
  //the image objects and the number of times they have been clicked
  this.imageObjects = [];
  //current burger elements
  this.burger = {};
  this.burger['cheese'] = 0;
  this.burger['lettuce'] = 0;
  this.burger['bun'] = 0;
  this.burger['patty'] = 0;
  //contians the ingrediatns to the burger

  const keyboard = this.input.keyboard;
  // Create a keyboard input manager
  
  this.imageObject = this.add.sprite(
    480,
    350,
    'food_bkg',
)
this.imageObject.setScale(.43);

//COUNTDOWN
this.countdownText = this.add.text(10, 10, 'Time Left: ' + countdown, {
  fontSize: '20px',
  fill: '#ffffff'
});

let arrow = this.imageObject = this.add.image(
  800,
  650,
  'arrow',
)
this.imageObject.setScale(.05);
arrow.setInteractive()
arrow.on('pointerdown', ()=> {
  is_cheese = 0
  is_lettuce = 0
  is_bun = 0
  is_patty = 0
  this.scene.start('SceneA')}
)
this.imageObject =this.add.image(410,460,'paper').setScale(.7)


let Cheese = this.imageObject = this.add.image(650,440,'cheesepile').setInteractive()
Cheese.setScale(.7);
Cheese.on('pointerdown', ()=> {
  this.createImage(405, 460, 'cheese', .7)
  //console.log('cheese count in create', is_cheese)
})
let Lettuce = this.add.image (760, 450, 'lettucepile').setInteractive()
Lettuce.setScale(.7);
Lettuce.on('pointerdown', ()=>{
  this.createImage(405, 460, 'lettuce', 0.7);
})

let Bun = this.imageObject = this.add.image(265,440,'bunpile').setInteractive()
Bun.setScale(.7);
Bun.on('pointerdown', ()=> {
  this.createImage(410, 460, 'bun', .7)
})

let Patty = this.imageObject = this.add.image(550,440,'pattypile').setInteractive()
Patty.setScale(.7);
Patty.on('pointerdown', ()=> {
  this.createImage(408, 460, 'patty', .7)
})


const objectsMatch = (obj1, obj2) => {
  console.log(obj1)
  console.log(obj2)
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
keyboard.on('keydown-SPACE', () => {
  console.log(this.burger);
  if (objectsMatch(this.burger, order1)) {
    correct = true;
    this.registry.set('correct', 1);
    console.log('The objects match.');
    const order1 = {'cheese': Phaser.Math.Between(0, 2), 'lettuce': Phaser.Math.Between(0, 3), 'bun':Phaser.Math.Between(1, 3), 'patty':Phaser.Math.Between(0, 4) }
    this.registry.set('order1', order1)
    console.log('here',correct)
  } else {
    console.log('The objects do not match.');
    this.registry.set('correct', 2)
  }

});
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
  }else if (pic == 'bun'){
    is_bun ++
    this.burger['bun'] = is_bun
  } else if (pic == 'patty'){
    is_patty ++
    this.burger['patty'] = is_patty
  }
  // Create an image object
  const image = this.add.image(x, y - number, pic);
  image.setScale(z)

  // Enable input on the image for click events
  image.setInteractive();
  number = number + 5

  // Initialize a click count for the image
  image.clickCount = 0;
// Set a click event handler for the image
  image.on('pointerdown', () => {
  image.clickCount += 1;
  if (image.clickCount >= 1) {
    image.x = Phaser.Math.Between(630, 750)
    image.y = 610
    //console.log('Image has been clicked more than once.');
      // You can perform additional actions for multiple clicks here
      if(pic == 'cheese'){
        const keyToSearch = 'cheese'; // Change this to the key you want to search
        
        subtractValueByKey(burger, keyToSearch);
        if (is_cheese >= 1){
        is_cheese --
        this.burger['cheese'] = is_cheese;
        number = number-5
        }

        //console.log('trash',is_cheese)
      } else if (pic == 'lettuce'){
        const keyToSearch = 'lettuce';
        subtractValueByKey(burger, keyToSearch);
        if(is_lettuce >= 1){
          is_lettuce --
          this.burger['lettuce'] = is_lettuce;
          number = number-5
        }
        //console.log('lettuce',is_lettuce)
      } else if (pic == 'bun'){
        const keyToSearch = 'bun';
        subtractValueByKey(burger, keyToSearch);
        if(is_bun >= 1){
          is_bun --
          this.burger['bun'] = is_bun;
          number = number-5
        }

      }else if (pic == 'patty'){
        const keyToSearch = 'patty';
        subtractValueByKey(burger, keyToSearch);
        if(is_patty >= 1){
          is_patty --
          this.burger['patty'] = is_patty;
          number = number-5
        }

      }
      console.log(this.burger)
    }
  
  })
    this.imageObjects.push(image);
}

  update(){
  {countdown--;}
  this.countdownText.setText('Countdown: ' + countdown);
  if (countdown <= 0) {
    this.registry.set('correct', 0);
    // Move to the failure scene when the countdown reaches the limit
    this.scene.start('failure');
  }
  //console.log('B', countdown)
  
}
}


class FailureScene extends Phaser.Scene {
  constructor() {
    super('failure');
  }

  create() {
    this.add.text(420, 150, 'You failed!', { fontSize: '25px', fill: '#ff0000' });

    const restartText = this.add.text(420, 200, 'Restart', {
      fontSize: '25px',
      fill: '#ffffff',
      backgroundColor: '#000000'
    });

    restartText.setInteractive();
    restartText.on('pointerdown', () => {
      countdown = 2000;
      this.registry.destroy();
      this.scene.start('SceneA');
    });
  }
}








let config = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 700,
  backgroundColor: "black",
  scene: [SceneA, Intro,FailureScene],
}

let game = new Phaser.Game(config);

