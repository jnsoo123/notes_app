Rails.application.routes.draw do
  ActiveAdmin.routes(self)

  # Devise Gem Routes
  devise_for :users

  # Model Routes
  scope module: :notes do
    resources :searches, only: :index
  end

  resources :notes, only: [:index, :create, :destroy]

  # Root Path
  root to: 'notes#index'
end
