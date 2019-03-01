Sequel.migration do
  up do
    create_table :simple_captcha_data do
      primary_key :id
      String :key, size: 40
      String :value, size: 6
      DateTime :created_at
      DateTime :updated_at

      index :key, name: "idx_key"
    end
  end

  down do
    drop_table :simple_captcha_data
  end
end
