document.addEventListener('DOMContentLoaded', () => {
  console.log("the DOM has loaded")

  /***************** START VARIABLES ***************************/

  let allGames = []
  let allUsers = []
  let gameObj = {}
  let streak = 0
  const BASE_URL = "http://localhost:3000"
  const GAME_URL = `${BASE_URL}/api/v1/games`
  const USER_URL = `${BASE_URL}/api/v1/users`
  const header = document.querySelector('header')
  const newUserFormDiv = document.querySelector('.new_user_form_div')
  const gameCanvas = document.querySelector('.game_canvas')
  const newGamePage = document.querySelector('.new_continued_game')

  /************** END VARIABLES ********************************/

  /**************** START FETCH ********************************/

  fetch(GAME_URL)
  .then( r => r.json() )
  .then( gameData => {
    allGames = gameData
    console.log(gameData)
  })

  fetch(USER_URL)
  .then( r => r.json() )
  .then( userData => {
    allUsers = userData
    console.log(userData)
  })

  /****************** END FETCH **********************************/

  /*************** START EVENT LISTENERS ************************/

  header.addEventListener('click', (e) => {
    newUserFormDiv.innerHTML = newUserForm()
  }) // end of header event listener


  newUserFormDiv.addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.target.id === "new_user_form") {
      const newUserForm = document.querySelector('#new_user_form')
      const newUsernameValue = newUserForm.querySelector('#new_username').value

      fetch(USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "username": newUsernameValue,
          "streak": 0
        })
      })
      .then( r => r.json() )
      .then( newUser => {
        allUsers.push(newUser)
        newUserFormDiv.innerHTML = ""
        gameCanvas.innerHTML = renderNewGame()
        const newGame = gameCanvas.querySelector('.new_game')
        const doors = newGame.querySelector('.doors')
        createNewGame(newUser)
      })
    }
  }) // end of newUserFormDiv event listener


  newGamePage.addEventListener('click', (e) => {
    if (e.target.className === "continue_play") {
      console.log(e.target);
      let currentGame = allGames.find( game => game.id == e.target.dataset.gameId )
      let currentUser = allUsers.find( user => user.id == e.target.dataset.userId )
      console.log('%c listener', 'color:orange');
      newGamePage.innerHTML = ""
      // ++currentUser.streak
      debugger
      fetch(`${USER_URL}/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "streak": ++streak
        })
      })
      .then( r => r.json() )
      .then( updatedUserData => {
        console.log(updatedUserData);
        setTimeout( () => {
          let currentGame = allGames.find( game => game.id == e.target.dataset.gameId )
          createNewGame(updatedUserData)
          newGamePage.innerHTML = ""
        }, 1500)
      })
    }
  }) // end of newGamePage event listener


  gameCanvas.addEventListener('click', (e) => {
    console.log('%c test', 'color:red');
    // door 1 or 2 event listener
    if (e.target.dataset.doorId === "1" || e.target.dataset.doorId === "2") {
      let currentGame = allGames.find( game => game.id == e.target.dataset.gameId )
      let currentUser = allUsers.find( user => user.id == e.target.dataset.userId )

      openDoor(parseInt(e.target.dataset.doorId))
      checkFirstOrSecondWin(gameObj)
      patchCurrentGame(currentGame)

      // if the user passes the first game
      while (gameObj.first_win && gameObj.second_win) {
        console.log('%c loop', 'color:blue');
        newGamePage.innerHTML = renderContinuePlay(currentGame)
        if (gameObj.first_win || gameObj.second_win !== true) {
          break
        }
      } // end of while loop
    } // end of door1 if statement
    // door3 (TRAP) event listener
    else if (e.target.dataset.doorId === "3") {
      openDoor(parseInt(e.target.dataset.doorId))
      setTimeout( () => {
        newGamePage.innerHTML = ""
        gameCanvas.innerHTML = renderGameOverPage()
      }, 2000)

      gameCanvas.addEventListener('click', (e) => {
        if (e.target.className === "play_again") {
          location.reload()
        }
      })
    } // end of door3 else if statement
  }) // end of gameCanvas event listener


  /*************** END EVENT LISTENERS **************************/

  /*************** START HELPER **********************************/

  function newUserForm() {
    let newUserForm = `
      <form id="new_user_form" class="center" action="index.html" method="post">
        <input required id="new_username" type="text" name="username" value="" placeholder="Enter your username">
        <input type="submit" value="Create Username">
      </form>
    `
    return newUserForm
  }

  // creates a new game data and renders the doors
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
      gameObj = newGameData
      // console.log(newGameData, "I'm in line 214")
      allGames.push(newGameData)
      const newGame = gameCanvas.querySelector('.new_game')
      const doors = newGame.querySelector('.doors')
      doors.innerHTML = renderDoors(newGameData)
    })
  }

  function patchCurrentGame(currentGame) {
    fetch(`${GAME_URL}/${currentGame.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "first_win": gameObj.first_win,
        "second_win": gameObj.second_win
      })
    })
    .then(r => r.json())
    .then( updatedGame => {
      console.log(updatedGame)
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

  // renders randomly generated doors
  function renderDoors(game) {
    let door1 = `
      <div class="perspective">
        <div data-door-id="1" data-game-id=${game.id} data-user-id=${game.user_id} data-win-id="win" class="thumb">
        </div>
        <div class="smiles"></div>
      </div>
    `
    let door2 = `
      <div class="perspective">
        <div data-door-id="2" data-game-id=${game.id} data-user-id=${game.user_id} data-win-id="win" class="thumb">
        </div>
        <div class="smiles"></div>
      </div>
    `
    let door3 = `
      <div class="perspective">
        <div data-door-id="3" data-game-id=${game.id} data-user-id=${game.user_id} data-win-id="lose" class="thumb">
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

  function sleep(ms) {
    setTimeout( () => {console.log("waiting...")}, ms)
  }

  // renders gameOverPage after user clicks on door3
  function renderGameOverPage() {
    let gameOver = `
      <h3>Aw, you lost!</h3>
      <button class="play_again" type="button" name="button">Play Again</button>
    `
    return gameOver
  }

  function checkFirstOrSecondWin(obj) {
    if (obj.first_win) {
      obj.second_win = true
    } else {
      obj.first_win = true
    }
  }

  function renderContinuePlay(currentGame) {
    let continuePlay = `
      <h3>Continue Playing?</h3>
      <button data-game-id="${currentGame.id}" data-user-id="${currentGame.user_id}" class="continue_play" type="button" name="button">Continue</button>
    `
    return continuePlay
  }

  /*************** END HELPER **********************************/

}) // end of DOMContentLoaded
