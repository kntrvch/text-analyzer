angular.module('app',[]).controller('TextAnalysisController', TextAnalysisController);
    function TextAnalysisController($scope) {
        $scope.message = "";
        var words = 0;
        var vowelsNumber = 0;
        var syllablesNumber = 0;
        var wordsNumber = 0;
        var sentencesNumber = 0;
        $scope.chars = function() {
            return $scope.message.length;
        };
        $scope.words = function() {
            words = $scope.message.split(" ");
            return ($scope.message === '') ? 0 : $scope.message.split(" ").length;
        };
        $scope.vowels = function() {
            vowelsNumber = ($scope.message.match(/[aeiou]/gi) == null) ? 0 : $scope.message.match(/[aeiou]/gi).length;
            return vowelsNumber;
        };
        $scope.sentences = function() {
            sentencesNumber = ($scope.message.match(/[.?:;!]/gi) == null) ? 0 : $scope.message.match(/[.?:;!]/gi).length;
            return sentencesNumber;
        };
        $scope.index = function() {
            if(sentencesNumber > 0) {
                var fleschIndex = 206.835 - 1.015 * (wordsNumber / sentencesNumber) - 84.6 * (syllablesNumber / wordsNumber);
                if(fleschIndex <= 0) {
                    fleschIndex = 0;
                } else if (fleschIndex >= 120) {
                    fleschIndex = 120;
                }
                return fleschIndex.toFixed(3);
            } else {
                return "(at least one sentence required)";
            }
        };
        $scope.level = function() {
            if(sentencesNumber > 0) {
                var gradeLevel = 0.39 * (wordsNumber / sentencesNumber) + 11.8 * (syllablesNumber / wordsNumber) - 15.59;
                gradeLevel = Math.round(gradeLevel);
                if(gradeLevel < 1) {
                    gradeLevel = 1;
                } 
                return gradeLevel;
            } else {
                return "(at least one sentence required)";
            }
        };
        $scope.clear = function() {
            $scope.message = "";
        };
    }
    
    String.prototype.endsWith = function(str)
    {
        var lastIndex = this.lastIndexOf(str);
        return (lastIndex !== -1) && (lastIndex + str.length === this.length);
    }
