class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.boolean :first_win
      t.boolean :second_win

      t.timestamps
    end
  end
end
