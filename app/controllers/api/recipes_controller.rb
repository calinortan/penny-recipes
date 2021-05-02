class Api::RecipesController < ApplicationController
  def index
    page = params["page"] ? params["page"] : 1

    @recipes = Recipe.page(page)

    respond_to do |format|
      format.json { render :json => @recipes }
    end
  end
end
