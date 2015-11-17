json.questions(@questions) do |question|
  json.id 	question.id
  json.body	question.body
  json.answers(question.answers) do |ans|
    json.id 		ans.id
    json.body 	ans.body
    json.likes 	ans.likes
  end
end