var app = angular.module('AdviceApp', []),
		//Function to render all questions on to page
		getQuestions = function (){
			$http.get('/questions').then(function (data){
				controller.data = data.data.questions
			});
		};

/////////////////// QUESTION CONTROLLER  //////////////////////		
app.controller('QuestionsController', ['$http', function($http) {
	var controller = this
	getQuestions()
	this.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	this.askQuestion = function () {
		$http.post('/questions', {
			authenticity_token: controller.authenticity_token,
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
	this.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	this.addAnswer = function () {
		$http.post('/answers/new/' + $scope.$parent.q.id, {
			authenticity_token: controller.authenticity_token,
			answer: {
				body: controller.newAnswerBody,
			}
		}).success(function (data) {
			getQuestions();
		});
	};
}])