json.questions(@questions) do |question|
  json.id 	question.id
  json.body	question.body
end