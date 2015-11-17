class QuestionsController < ApplicationController
	skip_before_action :verify_authenticity_token	

	def index
		@questions = Question.all
	end

	def create
		@question = Question.new(question_params)
		if @question.save 
			render json: @question
		else
      render json: {
        error: {
          message: @question.errors.full_messages.to_sentence
        }
      }
		end
	end

	def show
		@question = Question.find(params[:id])
		@answers = @question.answers
	end
	
	private

	def question_params
		params.require(:question).permit(:body)
	end
end
