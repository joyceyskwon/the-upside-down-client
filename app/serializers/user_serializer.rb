class UserSerializer < ActiveModel::Serializer
  has_many :games
  attributes :id, :username
end
