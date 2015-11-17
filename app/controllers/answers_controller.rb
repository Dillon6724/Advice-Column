class AnswersController < ApplicationController
	# skip_before_action :verify_authenticity_token	
	def create
		question = Question.find(params[:question_id])
		@answer = question.answers.new(answer_params)
		if @answer.save  
			render json: @answer
		else
      render json: {
        error: {
          message: @answer.errors.full_messages.to_sentence
        }
      }
		end
	end

	private

	def answer_params
		params.require(:answer).permit(:body)
	end
end
