# app/controllers/work_sessions_controller.rb
class WorkSessionsController < ApplicationController
  def create
    @work_session = WorkSession.new(start_time: Time.now)
    if @work_session.save
      render json: { message: "作業開始を記録しました！" }
    else
      render json: { error: @work_session.errors.full_messages }
    end
  end

  def update
    @work_session = WorkSession.find(params[:id])
    if @work_session.update(end_time: Time.now)
      render json: { message: "作業終了を記録しました！" }
    else
      render json: { error: @work_session.errors.full_messages }
    end
  end
end
