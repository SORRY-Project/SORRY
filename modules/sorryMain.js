(function() {

	//dependencies
	var Player = Sorry.Player, Deck = Sorry.Deck, Board = Sorry.Board;

	Sorry.Core = {};

	Sorry.Initialize = (function() {

		return {

			readUserInput : function() {

				return {
					name : $("#name").val(),
					color : $("#color").val(),
					difficultyLevel : $("[name='diffLevel']").val()
				}
			},
			createPlayers : function(settings) {

				var colors, computerColor;

				//generate computer's color based on players color selection
				if(settings.color === "red" || settings.color === "yellow") {
					colors = ["green", "blue"];
				} else {
					colors = ["red", "yellow"];
				}
				computerColor = colors[Math.floor(Math.random() * 2)];

				Sorry.Core.Player = new Player(settings.name, settings.color);
				Sorry.Core.Computer = new Player.Computer(computerColor, settings.difficultyLevel);
			},
			addPawnsToBoard : function() {

				var docFragment = document.createDocumentFragment(); compColor = Sorry.Core.Computer.getColor(), playerColor = Sorry.Core.Player.getColor()
				boardContainer = document.getElementById("boardContainer");

				for(var i = 1; i < 5; i++) {

					var computerPawn = document.createElement("img"), humanPawn = document.createElement("img");

					computerPawn.id = compColor.substring(0, 1) + i;
					computerPawn.className = compColor;
					computerPawn.src = "img/" + compColor + "Piece.png";
					humanPawn.id = playerColor.substring(0, 1) + i;
					humanPawn.className = playerColor;
					humanPawn.src = "img/" + playerColor + "Piece.png";
					docFragment.appendChild(computerPawn);
					docFragment.appendChild(humanPawn);
				}

				boardContainer.appendChild(docFragment);
			}
		}
	})();

	Sorry.Core.isGameOver = function() {

		var gameOver = false;

		if(Sorry.Core.Player.isWinner() || Sorry.Core.Computer.isWinner()) {
			gameOver = true;
		}

		return gameOver;

	}
	
	Sorry.Core.waitForComputer = function() {
		$("#loader").fadeIn();
	}
	
	Sorry.Core.ComputerPlay = function() {
		
		card = deck.drawCard(); 
		console.log(card);
		if(computer.difficultyLevel === "easy"){
			//computer selects pawn at random						
			pawn = computer.getPawns()[Math.ceil(Math.random() * 4).toString(10)];
			console.dir(pawn);
		}
		
	}
	///////////////////////////////////////////////////////////////////
	//Begin Game Execution
	///////////////////////////////////////////////////////////////////

	var
	player, playerColor, computer, deck = new Deck();

	$(document).ready(function() {

		var pawnIMG_HTML, pawn, card, collisionNotice, boardOffset = $("#myCanvas").offset(), offsetLeft = boardOffset.left, offsetTop = boardOffset.top;

		$("#drawCard").bind("click", function() {
			card = deck.drawCard();
			console.log(card.value);
		});
		//gather user input
		$("#startGame").bind("click", function() {

			var settings = Sorry.Initialize.readUserInput();

			Sorry.Initialize.createPlayers(settings);
			Sorry.Initialize.addPawnsToBoard();
			player = Sorry.Core.Player;
			playerColor = player.getColor(); computer = Sorry.Core.Computer, computerColor = computer.getColor();

		});

		$("#boardContainer").bind("click", function(e) {

			var $target = $(e.target);

			if(!Sorry.Core.isGameOver()) {

				//if human player

				//if players pawn is selected
				if($target.hasClass(playerColor)) {

					//initialize the multimove object
					if(card && card.value === 7) {
						player.initializeMultiMove();
					}
					pawnIMG_HTML = $target.attr("id");
					pawn = player.getPawns()[pawnIMG_HTML.substring(1)];

				} else if(pawn) {

					if($target.get(0).nodeName === "CANVAS" || $target.hasClass(computerColor)) {

						var validMove, remainingMoves, moveInfo, positionChange_MM, square = Board.mapPixelsToSquare(e.pageX - offsetLeft, e.pageY - offsetTop), adjustedSquare = Board.adjustSquareForPawnColor(square, playerColor);

						//if remainingMoves > 0 then finish
						//distributing the seven spaces among
						//pawns (i.e. a multi move remains unfinished)
						/*if( remainingMoves = player.getRemainingMoves()) {
							moveInfo = pawn.validateMove(card.value, adjustedSquare, remainingMoves);
							validMove = moveInfo.validMove;
							positionChange_MM = moveInfo.pawnDelta;
						} else {
							validMove = pawn.validateMove(card.value, adjustedSquare);
						}*/
						
						validMove = pawn.validateMove(card.value,adjustedSquare);

						console.log(validMove);
						//console.log(positionChange_MM);

						if(validMove) {

							//if a multiMove turn has been succesfully executed
							//then update the multiMove object with the number
							//of spaces available for pawns to move
							if(positionChange_MM) {
								player.setRemainingMoves(pawnDelta);
								//reset
								positionChange_MM = 0;
							}

							//update pawns position
							player.movePawn(pawn, adjustedSquare);
							//store pawns absolute position and pawn -- for collision detection
							Sorry.Board.setOccupiedSquares(square, pawn);

							//animate pawn on canvas element

							//reset htmlPawn and pawn references for next move
							pawn = null;
							pawnImg = null;
						}

						/*if(!(remainingMoves - pawnDelta)) {

						 //let the computer play a round
						 //will use setTimeout for effect only
						 //so game play isn't immediately
						 //sent back to user

						 }*/
						
						//start computer turn
						Sorry.Core.waitForComputer();
						setTimeout("Sorry.Core.ComputerPlay();",5000);

					}

				}
				//if not player one's turn => computer's turn
				/**else {
				*
				* drawCard
				* if difficulty is hard -- look for bump move
				* for(var pawn in pawns) {
				* 	if(this.position + cardValue === bump) {
				* 	this.bump(pawn)
				* }
				* }
				* else randomly generate move
				* 	select a pawn and execute an instruction
				*  given by card
				* }
				*/

				//if computer player
				//console.log(pawn);

			}
		});
	});
})();
