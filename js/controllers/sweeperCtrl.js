define(['./module'], function (controllers) {
    'use strict';
     controllers.controller('sweeperCtrl', ['$scope','$timeout',function ($scope,$timeout) {
     	$scope.fields = [];
     	var maxX = 20;
     	var maxY = 20;
     	var running = true;
     	var getId = function(x,y){
     		return x * maxX + y;
     	};
     	
     	var createField = function(x,y){
     		var rand = Math.floor(Math.random()*20);
     		return {x:x,y:y,marked:false,open:false,mine:(rand==8),mines:"",visible: false};
     	};
     	
     	var checkFields = function(index){
     		var x = $scope.fields[index].x;
     		var y = $scope.fields[index].y;
     		if($scope.fields[index].visible)return;
     		if($scope.fields[index].mine){
     			$scope.fields[index].visible=true;
     		}
     		checkField(index);
     		for(var i = (x-1); i<=(x+1); i++){
     			for(var j = (y-1); j<=(y+1); j++){
     				if(i>=0&&i<=maxX&&j>=0&&j<=maxX){
     					checkFields(i,j);
     				}
     			}	
     		}
     	};
     	
     	var checkField = function(index,level){
     		console.log(level);
     		if(level>4)return;
     		var x = $scope.fields[index].x;
     		var y = $scope.fields[index].y;
     		var bombs = 0;
     		if($scope.fields[index].visible || $scope.fields[index].mine)return;
     		for(var i = (x-1); i<=(x+1); i++){
     			for(var j = (y-1); j<=(y+1); j++){
     				if(i>=0&&i<=maxX&&j>=0&&j<=maxX){
     					if($scope.fields[getId(i,j)].mine){
     						bombs++;
     					} else {
     						checkField(getId(i,j),(level+1));
     					}
     				} 
     			}	
     		}
     		if(bombs > 0){
	     		$scope.fields[index].mines = bombs;
     		}
     		$scope.fields[index].visible = true;
     	};
     	
     	$scope.mixFields = function(){
     		for(var i = 0; i<20; i++){
     			for(var j=0;j<20;j++){
     				$scope.fields.push(createField(i,j));
     			}
     		}
     	};
     	
     	$scope.selectField = function(index){
     		if(!running)return;
     		if($scope.fields[index].mine){
     			$scope.fields[index].visible=true;
     			running = false;
     		} else{
     			checkField(index,0);
     			// $scope.fields[index].visible = true;
     		}
     	};
     	$scope.markField = function(index){
     		if(!$scope.fields[index].visible)
     		$scope.fields[index].marked = !$scope.fields[index].marked;
     	};
     	
     	$scope.mixFields();
     	
     }]);
 });