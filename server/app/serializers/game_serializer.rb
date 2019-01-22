class GameSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :user_id, :win
end
