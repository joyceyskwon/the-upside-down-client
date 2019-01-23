Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, except: :delete
    end
  end

  namespace :api do
    namespace :v1 do
      resources :games, except: :delete
    end
  end

end
