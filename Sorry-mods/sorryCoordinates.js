/**
 * Console Version of Game
 */

// Coordinates (0,0) to (640, 640)

/**
 * 
 * Figure out whether the user's click is within a graphical box within which
 * a pawn is logically located.
 * 
 * Returns boolean true/false.
 */

/*
 * TO FIX LATER ----------------------------------
 * Does not account for the bitch space between start and home stretch
 */

Sorry.coordinates = (function() {
	
	var actualPos;
	
	function getPositionNumber(Color,logicLocation) {
		
		var defaultPos,
			l = logicLocation;
			
		if (Color=='Blue'){
			defaultPos = [460, 580];
			actualPos = defaultPos;
			if (l==0){
				// do nothing
			} else if (l <= 1){
				// FIRST SPACE
				actualPos = defaultPos;
				actualPos[1] = defaultPos[1]+40*l;
			} else if (l <= 11) {
				// BOTTOM
				actualPos[0] = defaultPos[0]-(l-1)*40;
				actualPos[1] = defaultPos[1]+40;
			} else if (l <= 26) {
				// LEFT
				// subtr 40*l from y
				actualPos[0] = 20;
				actualPos[1] = (defaultPos[1]+40)-((l-12)*40);
			} else if (l <= 41) {
				// TOP
				// add to x
				actualPos[0] = 20+(40*(l-27));
				actualPos[1] = 20;
			} else if (l <= 56) {
				// RIGHT
				// add to y
				actualPos[0] = 20+(40*(l-42));
				actualPos[1] = 620;
			} else if (l <= 59) {
				// BOTTOM
				// subtr from x
				actualPos[0] = 620 - 40*(l-57);
				actualPos[1] = (defaultPos[1] + 40)
			} else if (l <= 65) {
				// HOME STRETCH
				// adds to y
				actualPos[0] = defaultPos[0] + 80;
				actualPos[1] = defaultPos[1] = 620 - 40*(l-60);
			}
			
		}
		
		return actualPos;

	}
	
	function inGrid(x, y){
		if (x<=40){
			return true;
		} else if (x>=600){
			return true;
		}
		
		if (y<=40){
			return true;
		} else if (y>=600){
			return true;
		}
		
		return false;
	}
	
	function isValid(x, y, a){
		var xRangeLow,
			xRangeHigh,
			yRangeLow,
			yRangeHigh;
		
		var valid = inGrid(x, y);
		if (valid) {
			xRangeLow = a[0]-20;
			xRangeHigh = a[0]+20;
			yRangeLow = a[1]-20;
			yRangeHigh = a[1]+20;
			
			// logicPos = 0 : 65
			// a = (x, y)
			if (x>=xRangeLow && x<=xRangeHigh && y>=yRangeLow && y<=yRangeHigh){
				return true;
			}
			return false;
		}
	}
	
	return {
		check: function(x, y, Color, logicPos){
			var a = getPositionNumber(Color,logicPos);
			var isThere = isValid(x, y, a);
			console.log('Pawn at position: ' + logicPos +
				', You clicked x = ' + x +
				', y = ' + y +
				', Result of click: '+ isThere);
		}
		
	}
	
})();

// input: x, y, Color, logicPos
// x, y: coordinates of click
// Color: color of peg
// logicPos
Sorry.coordinates.check(470,610, 'Blue', 1);
