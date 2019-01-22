document.addEventListener('DOMContentLoaded', () => {
  console.log("the DOM has loaded")

  /****************** VARIABLES **********************************/
  // Add variables here
  const BASE_URL = "http://localhost:3000"
  const GAME_URL = `${BASE_URL}/api/v1/games`
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

  /****************** EVENT LISTENERS **********************************/

  /****************** HELPER **********************************/
  // Add helper funcitons here

  /****************** HELPER **********************************/

}) // end of DOMContentLoaded
