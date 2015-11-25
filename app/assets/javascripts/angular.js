var app = angular.module('AdviceApp', []),
		//Function will be set to render all questions on to page inside of Question controller
		getQuestions;

/////////////////// QUESTION CONTROLLER  //////////////////////		
app.controller('QuestionsController', ['$http', function($http) {
	var controller = this
	getQuestions = function (){
		$http.get('/questions').then(function (data){
			controller.data = data.data.questions
		});
	};
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

//////////////////    NEW ANSWER CONTROLLER     ///////////////////
app.controller('newAnswerController', ['$http', '$scope', function ($http, $scope) {
	var controller = this
	this.authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	
	this.addAnswer = function () {
		$http.post('/answers/new/' + $scope.$parent.q.id, { //$scope.$parent.q.id is equal to the ID of the specific question
			authenticity_token: controller.authenticity_token,
			answer: {
				body: controller.newAnswerBody,
			}
		}).success(function (data) {
			getQuestions();
		});
	};
}])