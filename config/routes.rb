Rails.application.routes.draw do
  # Administrate Gem Routes
  namespace :admin do
    resources :users
    resources :notes

    root to: "users#index"
  end

  # Devise Gem Routes
  devise_for :users

  # Model Routes
  resources :notes, only: [:index, :create, :destroy]
  root to: 'notes#index'
end
