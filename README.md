# FlappyBet

About
=====
A game for two players in which one of them tries to overcome flappy-bird style challenges while the other bets on the outcome of the challenge.

* Live version - http://coffeelabs.com.br/flappybet/

Controls
========
* Flapping player - SPACE to jump
* Betting player - Mouse click to choose an option
 
Status
======
Initial, 48-hours version is incomplete. Known bugs / incomplete features:
* Betting system not working (apparently too ambitious for the deadline)
* No "How To" and "Credits" menus
* No pre-game menu to choose match type (best of 3, single round, etc)
* Balancing (jump, obstacles, bets)
 
Dependencies
============
Requires:
* Haxe 3.2.0 (get it here: www.haxe.org)
* Pixi.js Haxe externs (after installing Haxe, run `haxelib install pixijs`)
* Howler.js Haxe externs (after installing Haxe, run `haxelib install howlerjs`)
 
Compiling
=========
* Windows / Flash Develop - Double-click the `FlappyBet.hxproj` file and run the game from the editr
* Command line - To build the game open a command line in the project root folder and run `haxe Build.hxml`. The game must be run from a web server.
 
Credits
=======
* Game music from http://freesound.org/
* Game sfx procedurally generated with Bfxr: http://www.bfxr.net/
* Game art from Kenney's Assets: http://www.kenney.nl/assets
* Bunny art got from Pixi.js Haxe samples: https://github.com/pixijs/pixi-haxe/tree/dev/samples
