class Gift {
  constructor() {
    this.gameContainerEl = document.getElementById('gameContainer');
    this.initGiftEl();
  }

  initGiftEl() {
    this.giftEl = document.createElement('div');
    this.giftEl.classList.add('gift');
    this.giftEl.classList.add('animate__animated');
    this.giftEl.classList.add('animate__pulse');
    this.giftEl.classList.add('animate__infinite');
    this.giftEl.style.top = randomNumber(0, this.gameContainerEl.offsetHeight - 30) + 'px';
    this.giftEl.style.left = randomNumber(0, this.gameContainerEl.offsetWidth - 30) + 'px';
    this.gameContainerEl.append(this.giftEl);
  }


  eaten() {
    this.giftEl.remove();
    setTimeout(() => {
      this.initGiftEl();
    }, 100);
  }
}
