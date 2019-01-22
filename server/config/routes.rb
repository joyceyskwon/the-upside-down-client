Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show, :create, :delete]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :games, only: [:show, :create, :delete]
    end
  end

end
