class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games, status: :ok
  end

  def show
    @game = Game.find(params[:id])
    render json: GameSerializer.new(@game), status: :ok
  end

  def create
    @game = Game.create(game_params)
    render json: @game, status: :created
  end

  private

  def game_params
    params.require(:game).permit(:user_id, :win)
  end

end
