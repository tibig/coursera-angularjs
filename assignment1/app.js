(function () {
	angular.module("LunchCheck", [])
	.controller('LunchCheckController', ["$scope", "$filter", LunchCheckController]);
	  
	  function LunchCheckController($scope, $filter) {
		  $scope.menu_items = "";
		  $scope.message = "";
		  $scope.messageClass = "";
		  $scope.checkMenuItems = function() {
			var messageTextClass = determineMessage(splitMenuItems($scope.menu_items));
			$scope.message = messageTextClass[0];
			$scope.messageClass = messageTextClass[1];
		  }
	  }
	  
	  function determineMessage(items) {
		var numItems = items.length;
		if (numItems == 0) {
			return ["Please enter data first", "invalid"];
		} else if (numItems <= 3) {
			return ["Enjoy!", "valid"];
		} else {
			return ["Too much!", "valid"];
		}
	  };
	  
	  function splitMenuItems(menuItems) {
		return menuItems.split(",").filter(function(item){ return item.trim().length > 0; });
	  };
})();
