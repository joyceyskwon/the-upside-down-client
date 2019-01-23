Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show, :create, :update]
    end
  end

end
