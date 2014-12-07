'use strict';

console.log(angular.version.full);

var app = angular.module('initiativeCalculatorApp', []);

// Services
// -----------------------------------------------------------------------------
app.service('characterService', function() {
  var characters = [{
    "name": "Test Character",
    "initiativeMod": 3,
    "initiativeModDisplay": '+3'
  }]; 

  return {
    getCharacters: function() {
      return characters;
    },
    updateCharacters: function(value) {
      characters.push(value);
    },
    updateCharacterInitiative: function(index, value) {
        characters[index].currentInitiative = value;
    },
    removeCharacter: function(index) {
      characters.splice(index, 1);
    }
  };

});


// Controllers
// ----------------------------------------------------------------------------
app.controller('MainController', ['$scope', 'characterService', function ($scope, characterService) {

  $scope.characters = characterService.getCharacters();

  // Add a character to the Character's list.
  $scope.addCharacter = function() {
    // Create a nice looking display string for initiative modifier. (+3, -2).
    // If the number is greater than 0, add a +.
    if ($scope.newCharacterModifier > 0) {
      $scope.newCharacterModifierDisplay = '+' + $scope.newCharacterModifier; 
    }
    // If the number is negative or 0, just turn it into a string. The "-" is
    // included already for negative numbers
    else {
      $scope.newCharacterModifierDisplay = $scope.newCharacterModifier.toString(); 
    }

    // Push data to the service's character array.
    characterService.updateCharacters({
      'name': $scope.newCharacter,
      'initiativeMod': parseInt($scope.newCharacterModifier),
      'initiativeModDisplay': $scope.newCharacterModifierDisplay
    });

  }

  // Remove a character from the service's character array.
  $scope.removeCharacter = function(index) {
    characterService.removeCharacter(index);
  }


}]);


// This controller is concerned with the Initiative calculations for each character.
app.controller('InitiativeController', ['$scope', 'characterService', function ($scope, characterService) {
  $scope.characters = characterService.getCharacters();

  $scope.rollInitiative = function() {
    // Iterate through each character in the characterService array of characters.
    // This is where the rolls happen.
    for (var key in $scope.characters) {
      // Roll a d20.
      var baseInitiative = Math.floor(Math.random() * 20) + 1;
      // Add the current character's initiative modifier to the last roll.
      var finalInitiative = baseInitiative + $scope.characters[key].initiativeMod;
      // @todo: Can initiative go negative??
      if (finalInitiative <= 0) {
        finalInitiative = 1;
      }
      // Update character list objects to include "Current Initiative" for the encounter.
      characterService.updateCharacterInitiative(key, finalInitiative);
    }

  };

}]);

