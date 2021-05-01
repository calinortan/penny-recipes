class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.column :name, :string
      t.column :ingredients, :string, array: true, default: []
      t.column :image, :string
      t.column :cook_time, :string
      t.column :prep_time, :string
      t.column :total_time, :string
      t.column :author, :string
      t.column :nb_comments, :string
      t.column :people_quantity, :string
      t.column :budget, :string
      t.column :difficulty, :string
      t.column :rate, :string
      t.column :author_tip, :string
      t.column :tags, :string, array: true, default: []

      t.timestamps
    end
  end

  def down
    drop_table :recipes
  end
end
