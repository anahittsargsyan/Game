class Star {
  constructor() {
    this.gameContainerEl = document.getElementById('gameContainer');
    this.initLife();
  }

  initLife() {
    setTimeout(() => {
      this.available = true;
      this.initStarEl();

      setTimeout(() => {
        if (this.available) {
          this.eaten();
        }
      }, 3000);
    }, randomNumber(1000, 5000));
  }

  initStarEl() {
    this.starEl = document.createElement('div');
    this.starEl.classList.add('star');
    this.starEl.classList.add('animate__animated');
    this.starEl.classList.add('animate__pulse');
    this.starEl.classList.add('animate__infinite');
    this.starEl.style.top = randomNumber(0, this.gameContainerEl.offsetHeight - 30) + 'px';
    this.starEl.style.left = randomNumber(0, this.gameContainerEl.offsetWidth - 30) + 'px';
    this.gameContainerEl.append(this.starEl);
  }

  eaten() {
    this.available = false;
    this.starEl.remove();
    setTimeout(() => {
      this.initLife();
    }, randomNumber(1000, 3000));
  }
}
