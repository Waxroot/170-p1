class TimerScene extends Phaser.Scene {
    constructor() {
      super({ key: 'TimerScene' });
    }
  
    create() {
      // Create a countdown timer
      this.timer = this.time.addEvent({
        delay: 1000, // 1 second
        callback: this.updateTimer,
        callbackScope: this,
        loop: true, // Repeat
      });
  
      // Display the countdown text
      this.timerText = this.add.text(400, 300, '', {
        fontSize: '32px',
        fill: '#ffffff',
      });
      this.timerText.setOrigin(0.5);
    }
  
    updateTimer() {
      // Update the countdown text
      if (this.timer.getRepeatCount() >= 0) {
        this.timerText.setText(`Time: ${this.timer.getRepeatCount()}`);
      } else {
        // Timer reached 0, do something (e.g., switch scenes)
        this.scene.start('NextScene'); // Replace 'NextScene' with your actual scene key
      }
    }
  }
  