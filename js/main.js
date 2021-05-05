function startGame(namePlayer1, namePlayer2) {
  const firstPlayer = new Circle({
    scoreElId: 'player1',
    playerName: namePlayer1
  });

  const secondPlayer = new Circle({
    color: "#F0E68C",
    controlKeys: {
        UP: "w",
        DOWN: "s",
        LEFT:  "a",
        RIGHT: "d",
      },
      playerName: namePlayer2,
      scoreElId: 'player2'
    }
  );

  const gift = new Gift();
  const star = new Star();

  firstPlayer.registerGift(gift);
  secondPlayer.registerGift(gift);

  firstPlayer.registerStar(star);
  secondPlayer.registerStar(star);



  firstPlayer.registerEnemy(secondPlayer);
  secondPlayer.registerEnemy(firstPlayer);
};
