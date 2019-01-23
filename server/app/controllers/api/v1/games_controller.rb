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
    if @game
      render json: @game, status: :created
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  def update
    @game = Game.find(params[:id])
    @game.update(game_params)
    render json: @game
  end

  private

  def game_params
    params.require(:game).permit(:user_id, :first_win, :second_win)
  end

end
