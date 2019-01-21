Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: :show
    end
  end

  namespace :api do
    namespace :v1 do
      resources :games, only: :show
    end
  end

end
