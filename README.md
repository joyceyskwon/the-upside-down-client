# WELCOME TO THE UPSIDE DOWN!

![](https://media.giphy.com/media/9Dm6LI9XJ5KCD8zC3R/giphy.gif)

Ready to enter the upside down? This game is inspired by the Stranger Things, featuring two characters from the series: Eleven and Demogorgon. Tip: please use headphones for best experience!

## How to start the game
1. Click the logo to log in
2. Type in the username
3. Carefully read the rules
4. And off you go!

## Game rules
1. Hiding behind one of three doors is a Demogorgon.
2. Your mission is to open two of the doors without running into a Demogorgon.
3. If you manage to avoid the Demogorgon until you open the very last door, you win!
4. See if you can score a winning streak!

## How it's built
This game is our first full-stack project at Flatiron School. We are using Ruby on Rails API for the backend, and HTML/CSS/JS for the frontend. The server handles the 'has-many' association between the user and game models in the JSON. The Rails API and a user form create a resource and render the response asynchronously. This game does not use authentication with encrypted passwords. User is effectively signed out when the page refreshes.

## Challenges and Stretch Goals
Some of the challenges we faced building this game was building infinite loop of games for winning streak. Three doors had their own unique ID to listen to the event and three had only two outcomes. The way we solved it was to assign a separate event listener for winning streak games and counting the number of streaks for each user. In the next version, we hope to limit the number of games each user can play by assigning more doors in the initial game and decrementing its number as they win each game. Additionally, we would like to implement login using password and authentication.
