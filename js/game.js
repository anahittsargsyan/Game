function enterGame () {
  const firstInput = document.getElementById("player-1");
  const secondInput = document.getElementById("player-2");

  if (nameCheck(firstInput, secondInput)) {
    startGame(firstInput.value, secondInput.value);
    let welcome = (document.getElementById("welcome").style.display = "none");
  }
}
function nameCheck(firstInput, secondInput){
  let isValid = true;

  let namePlayer1 = document.getElementById("namePlayer1");
  let namePlayer2 = document.getElementById("namePlayer2");

  namePlayer1.innerHTML = firstInput.value + ":";
  namePlayer2.innerHTML = secondInput.value + ":";

  if (firstInput.value === "" || secondInput.value ==="") {
    isValid = false;
    alert("The names are required: ")
  }
  if (firstInput.value.trim() === secondInput.value.trim()) {
    alert("Input different names: ")
    isValid = false;
  }
  return isValid;
}
function gameOver(winPlayerName){
  console.log(winPlayerName)
  let gameOver = (document.getElementById("gameOver").style.display = "flex");
  let winnerName = document.getElementById('winnerName');
  winnerName.innerHTML = winPlayerName;
}
