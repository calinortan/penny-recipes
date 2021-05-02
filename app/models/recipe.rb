class Recipe < ApplicationRecord
  scope :filter_by_name, -> (name) { where("name ~* ?", name)}
  scope :filter_by_min_rating, -> (rate) { where("rate >= ?", rate)}
  scope :filter_by_min_portions, -> (people) { where("people_quantity >= ?", people)}
end
