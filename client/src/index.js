document.addEventListener('DOMContentLoaded', () => {
  console.log("the DOM has loaded")

  /****************** VARIABLES **********************************/
  // Add variables here
  let allUsers = []
  const BASE_URL = "http://localhost:3000"
  const GAME_URL = `${BASE_URL}/api/v1/games`
  const USER_URL = `${BASE_URL}/api/v1/users`
  const canvas = document.querySelector('.canvas')
  const header = document.querySelector('.header')
  /****************** VARIABLES **********************************/

  /****************** FETCH **********************************/
  // Fetch method to pull API from the backend
  fetch(GAME_URL)
  .then( r => r.json() )
  .then( newGame => {
    console.log(newGame);
  })
  /****************** FETCH **********************************/

  /****************** EVENT LISTENERS **********************************/
  // Add event listeners here
  header.addEventListener('click', (e) => {
    canvas.innerHTML = newUserForm()

  canvas.addEventListener('submit', (e) => {
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
        canvas.innerHTML = renderNewGame(newUser)
      })
    }
  })

  }) // end of canvas event listener
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

  function renderNewGame(user) {
    let gameCanvas = `

    `
  }
  /****************** HELPER **********************************/

}) // end of DOMContentLoaded
