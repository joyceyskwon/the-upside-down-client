class GameSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :user_id, :first_win, :second_win
end
