class Circle {
  constructor({
    color = '#DEF2FF',
    size = 50,
    speed = 5,
    controlKeys = {
      UP: 'ArrowUp',
      DOWN: 'ArrowDown',
      LEFT:  'ArrowLeft',
      RIGHT: 'ArrowRight',
    },
    scoreElId,
    playerName,
  }) {
    this._size = size;
    this._speed = speed;
    this.gameContainerEl = document.getElementById('gameContainer');
    this.color = color;
    this.initCircleEl(size);
    this.controlKeys = controlKeys;
    this.scoreEl = document.getElementById(scoreElId);
    this.playerName = playerName;
  }

  get size() {
    return this._size;
  }

  set size(_size) {
    this._size = _size;
    this.circleEl.style.width = `${_size}px`;
    this.circleEl.style.height = `${_size}px`;
  }


  set left(_left) {
    this._left = _left;
    this.circleEl.style.left = _left + 'px';
  }

  set top(_top) {
    this._top = _top;
    this.circleEl.style.top = _top + 'px';
  }

  get left() {
    return this._left;
  }

  get top() {
    return this._top;
  }

  initCircleEl() {
    this.points = 0;
    this.circleEl = document.createElement('div');
    this.circleEl.classList.add('circle');
    this.top = randomNumber(0, this.gameContainerEl.offsetHeight - this._size);
    this.left = randomNumber(0, this.gameContainerEl.offsetWidth - this._size);
    this.size = this._size;
    this.gameContainerEl.append(this.circleEl);
    this.speed = this._speed;
    this.circleEl.style.backgroundColor = this.color;
    document.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    const availableKeys = Object.values(this.controlKeys);
    const { UP, DOWN, LEFT,  RIGHT } = this.controlKeys;

    if (availableKeys.includes(event.key)) {
      this.stop();

      switch (event.key) {
        case UP:
          this.moveUp();
          break;
        case DOWN:
          this.moveDown();
          break;
        case LEFT:
          this.moveLeft();
          break;
        case RIGHT:
          this.moveRight();
          break;
      }
    }
  }

  stop() {
    clearInterval(this.intervalId);
  }

  move(fn, dir) {
    this.intervalId = setInterval(() => {
      if (!this.canMove(dir)) {
        return this.stop();
      }

      fn();
      this.eatGift();
      this.eatEnemy();
      this.eatStar();
    }, 10);
  }

  canMove(dir) {
    switch(dir) {
      case 'left':
        return this.left - this.speed > 0;
      case 'right':
        return this.left + this.speed < this.gameContainerEl.offsetWidth - this.size;
      case 'up':
        return this.top - this.speed > 0;
      case 'down':
        return this.top + this.speed < this.gameContainerEl.offsetHeight - this.size;
    }
  }


  moveLeft() {
    this.move(() => this.left -= this.speed, 'left');
  }

  moveRight() {
    this.move(() => this.left += this.speed, 'right');
  }

  moveUp() {
    this.move(() => this.top -= this.speed, 'up');
  }

  moveDown() {
    this.move(() => this.top += this.speed, 'down');
  }

  eatGift() {
    if (this.elementsConnected(this.circleEl, this.gift.giftEl)) {
      this.points++;
      this.scoreEl.innerHTML = this.points;
      this.gift.eaten();
      this.speed -= this.speed * 10 / 100;
      this.size += 5;
      console.log('eaten');
      console.log(this.secondPlayer);
      if (this.points==10) {
        gameOver(this.playerName);
      }
    }
  }

  eatStar() {
    if (this.star.available && this.elementsConnected(this.circleEl, this.star.starEl)) {
      this.star.eaten();
      const oldSpeed = this.speed;
      this.speed += this.speed * 70 / 100;
      setTimeout(() => {
        this.speed = oldSpeed;
      }, 2000);
    }
  }

  eatEnemy() {
    if (this.elementsConnected(this.circleEl, this.enemy.circleEl) && this.size > this.enemy.size) {
      this.points++;
      this.scoreEl.innerHTML = this.points;
      this.enemy.destroy();
      if (this.points==10) {
        gameOver(this.playerName);
        console.log(111)
        this.stop();
      }
    }
  }

  registerStar(star) {
    this.star = star;
  }

  registerGift(gift) {
    this.gift = gift;
  }

  registerEnemy(enemy) {
    this.enemy = enemy;
  }

  destroy() {
    this.stop();
    this.circleEl.remove();
    this.scoreEl.innerHTML = 0;
    document.removeEventListener('keydown', this.onKeyDown);
    setTimeout(() => {
      this.initCircleEl(50);
    }, 100);

  }

  elementsConnected(el1, el2) {
      el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
      el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
      el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
      el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

      return !((el1.offsetBottom < el2.offsetTop) ||
               (el1.offsetTop > el2.offsetBottom) ||
               (el1.offsetRight < el2.offsetLeft) ||
               (el1.offsetLeft > el2.offsetRight));
  }

}
