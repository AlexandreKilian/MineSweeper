define(['./module'], function(controllers) {'use strict';
	controllers.controller('sweeperCtrl', ['$scope', '$timeout',
	function($scope, $timeout) {
		$scope.fields = [];
		var maxX = 20;
		var maxY = 20;
		var running = true;
		var stack = [];
		
		var getId = function(x, y) {
			return x * maxX + y;
		};

		var createField = function(x, y) {
			var rand = Math.floor(Math.random() * 8);
			return {
				x : x,
				y : y,
				marked : false,
				open : false,
				mine : (rand == 2),
				mines : "",
				visible : false
			};
		};

		var checkField = function(field, level) {
			stack.push(field);
			var index;
			while (stack.length > 0) {
				
				index = stack.pop();
				var x = $scope.fields[index].x;
				var y = $scope.fields[index].y;
				var bombs = 0;
				
				if ($scope.fields[index].visible || $scope.fields[index].mine)continue;
				var tempstack = [];
				for (var i = (x - 1); i <= (x + 1); i++) {
					for (var j = (y - 1); j <= (y + 1); j++) {
						if (i >= 0 && i < maxX && j >= 0 && j < maxY) {
							if ($scope.fields[getId(i, j)].mine) {
								bombs++;
							} else {
								var neighbour = getId(i, j);
								if (!(stack.indexOf(neighbour) > 0))
									tempstack.push(neighbour);

							}
						}
					}
				}
				if (bombs > 0) {
					$scope.fields[index].mines = bombs;
				} else{
					stack = stack.concat(tempstack);
				}
				$scope.fields[index].visible = true;
			}
			console.log(stack);
		};

		$scope.mixFields = function() {
			for (var i = 0; i < 20; i++) {
				for (var j = 0; j < 20; j++) {
					$scope.fields.push(createField(i, j));
				}
			}
		};

		$scope.selectField = function(index) {
			if (!running)
				return;
			if ($scope.fields[index].mine) {
				$scope.fields[index].visible = true;
				running = false;
			} else {
				checkField(index, 0);
			}
		};
		$scope.markField = function(index) {
			if (!$scope.fields[index].visible)
				$scope.fields[index].marked = !$scope.fields[index].marked;
		};

		$scope.mixFields();

	}]);
});
