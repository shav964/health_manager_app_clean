# app/controllers/work_sessions_controller.rb
class WorkSessionsController < ApplicationController
  def index
    @work_sessions = WorkSession.where(start_time: Time.zone.today.all_day).order(created_at: :desc) # 今日の作業のみ取得
    @total_time = calculate_total_time(@work_sessions) # 合計時間を計算
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
  def destroy
    @work_session = WorkSession.find(params[:id])
    if @work_session.destroy
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.remove("work_session_#{@work_session.id}") }
        format.html { redirect_to work_sessions_path, notice: '作業を削除しました。' }
      end
    else
      render json: { error: @work_session.errors.full_messages }, status: :unprocessable_entity
    end
  end
  private
  def calculate_total_time(work_sessions)
    work_sessions.sum do |session|
      if session.end_time.present?
        session.end_time - session.start_time # 終了したセッションの時間
      else
        Time.current - session.start_time # 進行中のセッションの時間を現在時刻まで計算
      end
    end
  end
  def set_work_session
    @work_session = WorkSession.find(params[:id])
  end
end
