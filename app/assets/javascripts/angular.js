console.log('PAGE IS LOADED');
var app = angular.module('AdviceApp', []),
		getQuestions;
// var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

app.controller('QuestionsController', ['$http', function($http) {
	console.log("inside!!!!!!!!!!")
	var controller = this
	getQuestions = function (){
		$http.get('/questions').then(function (data){
			controller.data = data.data.questions
		});
	}
	getQuestions();

	this.askQuestion = function () {
		$http.post('/questions', {
			// authenticity_token: authenticity_token,
			question: {
				body: controller.newQuestionBody,
			}
		}).success(function (data) {
			getQuestions();
		});
	};

}]);

app.controller('newAnswerController', ['$http', '$scope', function ($http, $scope) {
	var controller = this
	this.addAnswer = function () {
		console.log($scope)
		$http.post('/answers/new/' + $scope.$parent.q.id, {
			// authenticity_token: authenticity_token,
			answer: {
				body: controller.newAnswerBody,
			}
		}).success(function (data) {
			getQuestions();
		});
	};
}])