Rails.application.routes.draw do
  resources :work_sessions, only: [:create, :update, :index]
  root 'work_sessions#index'
end