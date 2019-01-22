# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

Game Rules
1. hiding behind one of three doors is a trap
2. your mission is to open all of the doors without running into the trap
3. if you manage to avoid the trap until you open the very last door, you win
4. see if you can score a winning streak!

Game logic
1. user is able to create a username
  - User controller: create method, routes: create
2. three doors render, but one of them has a trap
  - three buttons, with different data-actions, (or data-id)
  - generating data-action for buttons randomly
  - create an array of actions and assign button actions randomly
    - [ o , x , o ] <— generated randomly every game
3. when user clicks on one of the doors, js (if statemnt) checks if that door is the trap.
  - event listener on users click on the button (each door needs a randomly generated (o,x) data-action, so it listens to the click and knows which one it is a trap (or not a trap)
4. if it does have the trap, the game ends and the user gets 0 streak
  - if (x is clicked) game terminates…?
  - Game over page?? Option to restart (create user)
5. if it doesn’t have the trap, the game continues. the clicked door opens and user can pick another door.
  - event listener on 'o' button, then 'open door'
    - if (o is clicked, open that door) {}
6. user clicks again and if it is a trap, the game ends and the same logic on the fourth step repeats.
7. if it isn’t a trap, the user wins and the new game model gets created, and the game continues, and the user has 1 streak
  - if (o is clicked again, that door opens){} && new game is generated through step 2.
  - create new Game, with the same user_id
8. steps from 2 - 7 repeats until the user chooses the wrong door
