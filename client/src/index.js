document.addEventListener('DOMContentLoaded', () => {
  console.log("the DOM has loaded")

  /****************** VARIABLES **********************************/
  // Add variables here
  let allGames = []
  let allUsers = []
  const BASE_URL = "http://localhost:3000"
  const GAME_URL = `${BASE_URL}/api/v1/games`
  const USER_URL = `${BASE_URL}/api/v1/users`
  const header = document.querySelector('.header')
  const newUserFormDiv = document.querySelector('.new_user_form_div')
  const gameCanvas = document.querySelector('.game_canvas')
  /****************** VARIABLES **********************************/

  /****************** FETCH **********************************/
  // Fetch method to pull API from the backend
  fetch(GAME_URL)
  .then( r => r.json() )
  .then( gameData => {
    allGames = gameData
    console.log(gameData)
  })
  /****************** FETCH **********************************/

  /****************** EVENT LISTENERS **********************************/
  // Add event listeners here
  header.addEventListener('click', (e) => {
    newUserFormDiv.innerHTML = newUserForm()
  }) // end of header event listener

  newUserFormDiv.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target);
    if (e.target.className === "new_user_form") {
      const newUserForm = document.querySelector('.new_user_form')
      const newUsernameValue = newUserForm.querySelector('#new_username').value

      fetch(USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "username": newUsernameValue
        })
      })
      .then( r => r.json() )
      .then( newUser => {
        newUserFormDiv.innerHTML = ""
        gameCanvas.innerHTML = renderNewGame()
        const newGame = gameCanvas.querySelector('.new_game')
        const doors = newGame.querySelector('.doors')
        createNewGame(newUser)
      })
    }
  }) // end of newUserFormDiv event listener

  // door3 is the TRAPPPP!!!!!
  gameCanvas.addEventListener('click', (e) => {

    // app needs to keep track of the number of clicks on the door
    // if the first click is door 1 or door 2
    // patch method to update first win to true
    // if the second click is door 1 or door 2
    // patch mathod to update the second win to true
    // and create and render a new game
    // if the first or second click is door 3
    // terminate the game
    if (e.target.dataset.doorId === "1") {
      // console.log(e.target);
      let currentGame = allGames.find( game => game.id == e.target.dataset.gameId )
      let currentUser = allGames.find( game => game.user_id == e.target.dataset.userId )
      openDoor(1)

      fetch(`${GAME_URL}/${currentGame.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "first_win": true
        })
      })
    } // end of door1 if statement

    else if (e.target.dataset.doorId === "2") {
      let currentGame = allGames.find( game => game.id == e.target.dataset.gameId )
      let currentUser = allGames.find( game => game.user_id == e.target.dataset.userId )
      console.log("is it hitting this one?");
      openDoor(2)
    } // end of door2 else if statement

    else if (e.target.dataset.doorId === "3") {
      openDoor(3)
      gameCanvas.innerHTML = renderGameOverPage()
      const newGameBtn = gameCanvas.querySelector('#play_new_game')

      newGameBtn.addEventListener('click', (e) => {
        location.reload()
      })
    } // end of door3 else if statement
  })

  /****************** EVENT LISTENERS **********************************/

  /****************** HELPER **********************************/
  // Add helper funcitons here
  function newUserForm() {
    let newUserForm = `
      <form class="new_user_form" action="index.html" method="post">
        <input required id="new_username" type="text" name="username" value="" placeholder="Enter your username">
        <input type="submit" value="Create Username">
      </form>
    `
    return newUserForm
  }

  function createNewGame(user) {
    fetch(GAME_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "user_id": user.id,
        "first_win": false,
        "second_win": false
      })
    })
    .then( r => r.json() )
    .then( newGameData => {
      console.log(newGameData, "I'm in line 214")
      allGames.push(newGameData)
      const newGame = gameCanvas.querySelector('.new_game')
      const doors = newGame.querySelector('.doors')
      doors.innerHTML = renderDoors(newGameData)
    })
  }

  function renderNewGame() {
    let gameCanvas = `
      <div class="new_game">
        <h3>Game Rules</h3>
        <p>1. Hiding behind one of three doors is a trap.<br>
        2. your mission is to open all of the doors without running into the trap<br>
        3. if you manage to avoid the trap until you open the very last door, you win<br>
        4. see if you can score a winning streak!</p>
        <br>
        <div class="doors">
        </div>
      </div>
    `
    return gameCanvas
  }

  function renderDoors(game) {
    let door1 = `
      <div class="perspective">
        <div data-game-id=${game.id} data-user-id=${game.user_id} data-win-id="win" data-door-id="1" class="thumb">
        </div>
      </div>
    `
    let door2 = `
      <div class="perspective">
        <div data-game-id=${game.id} data-user-id=${game.user_id} data-win-id="win" data-door-id="2" class="thumb">
        </div>
      </div>
    `
    let door3 = `
      <div class="perspective">
        <div data-game-id=${game.id} data-user-id=${game.user_id} data-win-id="lose" data-door-id="3" class="thumb">
        </div>
      </div>
    `
    let doorArray = [door1, door2, door3]
    return shuffleDoor(doorArray)
  }

  function shuffleDoor(doorArray) {
    let currentIndex = doorArray.length
    let temp;
    let index;
    while (currentIndex > 0) {
      index = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temp = doorArray[currentIndex]
      doorArray[currentIndex] = doorArray[index]
      doorArray[index] = temp;
    }
    console.log(doorArray);
    return doorArray.join('')
  }

  function openDoor(id) {
    let x = gameCanvas.querySelector(`[data-door-id="${id}"]`)
    if (x.classList.contains("thumbOpened")) {
        return x.classList.remove("thumbOpened")
    } else {
      return x.classList.add("thumbOpened")
    }
  }

  function renderGameOverPage() {
    let gameOver = `
      <h3>Aw, you lost!</h3>
      <button id="play_new_game" type="button" name="button">Play Again</button>
    `
    return gameOver
  }

  /****************** HELPER **********************************/

}) // end of DOMContentLoaded
