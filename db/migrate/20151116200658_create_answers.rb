class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
    	t.string :body, null: false
    	t.integer :likes, default: 0
    	t.references :question, foreign_key: true

      t.timestamps null: false
    end
  end
end
