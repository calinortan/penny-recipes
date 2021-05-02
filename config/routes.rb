Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' } do
    get "/recipes", to: "recipes#index"
  end
  root to: "home#index"
end
