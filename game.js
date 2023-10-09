let countdown = 10;


class SceneA extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneA' });
  }

  create(){
    this.add.text(200,100,"Click to begin", {fontSize: 65, fill: '#fff2cc', fontStyle: 'italic'});
                this.input.on('pointerdown', () => this.scene.start('intro'));

}
update(){
  {countdown--;}
  console.log('A', countdown)
}
}



class Intro extends Phaser.Scene {
  constructor() {
      super('intro');}
      create(){
        this.add.text(200,100,"Click to begin", {fontSize: 65, fill: 'red', fontStyle: 'italic'});
                    this.input.on('pointerdown', () => this.scene.start('SceneA'));}
update(){
  {countdown--;}
  console.log('B', countdown)
}
}


let config = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 700,
  backgroundColor: "black",
  scene: [SceneA, Intro],
}

let game = new Phaser.Game(config);
