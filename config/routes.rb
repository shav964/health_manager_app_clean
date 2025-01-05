Rails.application.routes.draw do
  resources :work_sessions, only: [:create, :update, :index, :destroy] do
    collection do
      get :total_time_today
    end
  end
  
end