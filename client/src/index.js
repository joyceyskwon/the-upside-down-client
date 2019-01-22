document.addEventListener('DOMContentLoaded', () => {
  console.log("the DOM has loaded")

  /****************** VARIABLES **********************************/
  // Add variables here
  let allGames = []
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
  .then( newGame => {
    allGames = newGame
    console.log(newGame)
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
        createNewGame(newUser)
        newUserFormDiv.innerHTML = ""
        gameCanvas.innerHTML = renderNewGame()
        const newGame = gameCanvas.querySelector('.new_game')
        const doors = newGame.querySelector('.doors')
        doors.innerHTML = renderDoors()
      })
    }
  }) // end of newUserFormDiv event listener

  gameCanvas.addEventListener('click', (e) => {

    if (e.target.dataset.doorId === "1") {
      openDoor(1)
    } else if (e.target.dataset.doorId === "2") {
      openDoor(2)
    } else if (e.target.dataset.doorId === "3") {
      openDoor(3)
    }
  })

  /****************** EVENT LISTENERS **********************************/

  /****************** HELPER **********************************/
  // Add helper funcitons here
  function newUserForm() {
    let newUserForm = `
      <form class="new_user_form" action="index.html" method="post">
        <input id="new_username" type="text" name="username" value="" placeholder="Please enter your username">
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
        "win": false
      })
    })
    .then( r => r.json() )
    .then(console.log)
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

  function renderDoors() {
    let doors = `
      <div class="perspective">
          <div data-win-id="win" data-door-id="1" class="thumb">
          </div>
      </div>
      <div class="perspective">
          <div data-win-id="win" data-door-id="2" class="thumb">
          </div>
      </div>
      <div class="perspective">
          <div data-win-id="lose" data-door-id="3" class="thumb">
          </div>
      </div>
    `
    return doors
  }


  //
  // let doorArray = [door1, door2, door3]
  //
  // function shuffleDoor(doorArray) {
  //   let currentIndex = doorArray.length, temporaryValue, randomIndex
  //
  //   while (0 !== currrentIndex) {
  //     randomIndex = Math.floor(Math.random() * currentIndex)
  //     currentIndex -= 1
  //
  //     temporaryValue = doorArray[currentIndex]
  //     doorArray[currentIndex] = doorArray[randomIndex]
  //     doorArray[randomIndex] = temporaryValue
  //   }
  //   return doorArray
  // }

  function openDoor(id) {
    let x = gameCanvas.querySelector(`[data-door-id="${id}"]`)
    if (x.classList.contains("thumbOpened")) {
        return x.classList.remove("thumbOpened")
    } else {
      return x.classList.add("thumbOpened")
    }
  }

  /****************** HELPER **********************************/

}) // end of DOMContentLoaded
