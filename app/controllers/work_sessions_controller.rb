# app/controllers/work_sessions_controller.rb
class WorkSessionsController < ApplicationController
  def index
    @work_sessions = WorkSession.all.order(created_at: :desc)
  end

  def create
    @work_session = WorkSession.new(start_time: Time.current)
    if @work_session.save
      respond_to do |format|
        format.turbo_stream # Turbo Stream形式でレスポンスを返す
        format.html { redirect_to work_sessions_path, notice: "作業開始を記録しました！" }
      end
    else
      render json: { error: @work_session.errors.full_messages }
    end
  end

  def update
    @work_session = WorkSession.find(params[:id])
    if @work_session.update(end_time: Time.current)
      respond_to do |format|
        format.turbo_stream # Turbo Stream形式でレスポンスを返す
        format.html { redirect_to work_sessions_path, notice: "作業終了を記録しました！" }
      end
    else
      render json: { error: @work_session.errors.full_messages }
    end
  end
end
