class Api::RecipesController < ApplicationController
  def index
    page = params["page"] ? params["page"] : 1

    @recipes = Recipe.where(nil)
    filtering_params(params).each do |key, value|
      @recipes = @recipes.public_send("filter_by_#{key}", value) if value.present?
    end

    @recipes = @recipes.page(page)

    respond_to do |format|
      format.json { render :json => @recipes }
    end
  end

  private

  def filtering_params(params)
    params.slice(:name, :min_rating, :min_portions, :tags, :ingredients)
  end
end
