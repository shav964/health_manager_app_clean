Rails.application.routes.draw do
  root "work_sessions#index" # ホーム画面を設定
  resources :work_sessions, only: [:create, :update]
end
