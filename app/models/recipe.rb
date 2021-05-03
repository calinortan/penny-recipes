class Recipe < ApplicationRecord
  scope :filter_by_name, -> (name) { where("name ~* ?", name)}
  scope :filter_by_min_rating, -> (rate) { where("rate >= ?", rate)}
  scope :filter_by_min_portions, -> (people) { where("people_quantity >= ?", people)}
  scope :filter_by_tags, -> (tags) { where("lower(tags::text)::text[] && ?", "{#{tags.map(&:downcase).join(",")}}")}
  scope :filter_by_ingredients, -> (ingredients) {
    where("array_to_string(ingredients, ',') ~* ANY(ARRAY[?]::text[])", ingredients)
  }
end