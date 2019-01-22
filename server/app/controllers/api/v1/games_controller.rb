class Api::V1::GamesController < ApplicationController

  def show
    @game = Game.find(params[:id])
    render json: GameSerializer.new(@game), status: :ok
  end

end
