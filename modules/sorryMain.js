(function() {

	//dependencies
	var Player = Sorry.Player, 
		Deck = Sorry.Deck, 
		Board = Sorry.Board;
		
	Sorry.Core = {};

	Sorry.Initialize.readUserInput = function() {

		return {
			name : $("#name").val(),
			color : $("#color").val(),
			difficultyLevel : $("[name='diffLevel']").val()
		}
	};

	/**
	 * @param settings
	 */
	Sorry.Initialize.createPlayers = function(settings) {


		var colors,
			computerColor;
		
		//generate computer's color based on players color selection
		if(settings.color === "red" || settings.color === "yellow") {
			colors = ["green","blue"];
		}
		else {
			colors = ["red","yellow"];
		}
		
		computerColor = colors[Math.floor(Math.random() * 2)];
		//for testing

		Sorry.Core.Player = new Player(settings.name, settings.color);
		Sorry.Core.Computer = new Player.Computer(computerColor, settings.difficultyLevel);

	}
	
	/**
	 * This function dynamically creates eight <img> elements
	 * and sets id, className, and src attributes. They are
	 * first appended to a document fragment and 
	 * then appended to <div id="boardContainer">
	 */
	Sorry.Initialize.addPawnsToBoard = function() {
				
		var docFragment = document.createDocumentFragment();
			compColor = Sorry.Core.Computer.getColor(),
			playerColor = Sorry.Core.Player.getColor()
			boardOverlay = document.getElementById("boardOverlay");
		
		for(var i = 1; i < 5; i++) {
			
			var computerPawn = document.createElement("img"),
				humanPawn = document.createElement("img");
				
			computerPawn.id = compColor.substring(0,1) + i;
			computerPawn.className = compColor;
			computerPawn.src = "img/"+compColor+"Piece.png";
			humanPawn.id = playerColor.substring(0,1) + i;
			humanPawn.className = playerColor;
			humanPawn.src = "img/"+playerColor+"Piece.png";
			docFragment.appendChild(computerPawn);
			docFragment.appendChild(humanPawn);
		}
		
		boardOverlay.appendChild(docFragment);

	}

	Sorry.Core.isGameOver = function() {

		var gameOver = false;

		if(Sorry.Core.Player.isWinner() || Sorry.Core.Computer.isWinner()) {
			gameOver = true;
		}

		return gameOver;

	}
	///////////////////////////////////////////////////////////////////
	//Begin Game Execution
	///////////////////////////////////////////////////////////////////

	var player,playerColor,computer,
		deck = new Deck();
		/*player = Sorry.Core.Player,
		playerColor = player.getColor(),
		computer = Sorry.Core.Computer;*/
		


	$(document).ready(function() {

		var pawnIMG_HTML, pawn, card, collisionNotice,
			boardOffset = $("#myCanvas").offset(), 
			offsetLeft = boardOffset.left, 
			offsetTop = boardOffset.top;
	
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
			playerColor = player.getColor();
			computer = Sorry.Core.Computer;				
		});

		$("#boardContainer").bind("click", function(e) {

			var $target = $(e.target);

			if(!Sorry.Core.isGameOver()) {

				//if human player	
				
				//if players pawn is selected						
				if($target.hasClass(playerColor)) {

					//initialize the multimove object
					if(card.value === 7) {
						player.initializeMultiMove();
					}
					
					pawnIMG_HTML = $target.attr("id");
					pawn = player.getPawns()[pawnIMG_HTML.substring(1)];
		
				} else if((pawn && $target.get(0).nodeName === "CANVAS") || $target.hasClass(playerColor)) {

					var validMove,remainingMoves,moveInfo,positionChange_MM,
						square = Board.mapPixelsToSquare(e.pageX - offsetLeft, e.pageY - offsetTop),					
						adjustedSquare = Board.adjustSquareForPawnColor(square,playerColor);
						
						//if remainingMoves > 0 then finish 
						//distributing the seven spaces among
						//pawns
						if(remainingMoves = player.getRemainingMoves()) {
							moveInfo = pawn.validateMove(card.value, adjustedSquare, remainingMoves);
							validMove = moveInfo.validMove;
							positionChange_MM = moveInfo.pawnDelta;							
						}
						else {
							validMove = pawn.validateMove(card.value, adjustedSquare);
						}

						console.log(validMove);
						console.log(positionChange_MM);						
						
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
						Sorry.Board.setOccupiedSquares(square,pawn);
						
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
					
										
				}
				//if not player one's turn => computer's turn								
				/*else {
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
				console.log(pawn);

			}
		});
	});
})();
