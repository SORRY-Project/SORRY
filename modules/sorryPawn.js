
(function() {
	
	/**
	 * 
	 */
	Sorry.Pawn = (function() {
		
		//private variables
		var idCounter = 0;
		
		/**
		 * @param {String} color The color of the pawn (red,green,blue,yellow)
		 */
		function Pawn(color) {			
			this.position = 0;
			this.color = color;
			this.ID = ((idCounter++) % 4) + 1;			
		}
		
		Pawn.prototype = {
			
			setPosition : function(position) {
				this.position = position;
			}
			
		}
		
		return Pawn;
				
	})();
		
})(); 
