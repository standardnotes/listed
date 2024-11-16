# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_02_24_140201) do

  create_table "authors", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "secret", collation: "latin1_swedish_ci"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", collation: "utf8mb4_general_ci"
    t.string "display_name", collation: "utf8mb4_general_ci"
    t.text "bio", collation: "utf8mb4_general_ci"
    t.string "link", collation: "latin1_swedish_ci"
    t.string "email", collation: "latin1_swedish_ci"
    t.string "twitter", collation: "latin1_swedish_ci"
    t.integer "last_word_count"
    t.boolean "featured", default: false
    t.boolean "show_tip_option", default: true
    t.string "meta_image_url", collation: "latin1_swedish_ci"
    t.string "header_image_url", collation: "latin1_swedish_ci"
    t.boolean "hide_from_homepage", default: false
    t.boolean "guestbook_disabled", default: false
    t.boolean "email_verified", default: false
    t.string "email_verification_token", collation: "latin1_swedish_ci"
    t.boolean "newsletter_disabled", default: false
    t.datetime "homepage_activity"
    t.text "css", limit: 16777215, collation: "utf8mb4_general_ci"
    t.string "cover_style", default: "full", collation: "latin1_swedish_ci"
    t.string "blog_layout_style", default: "vertical", collation: "latin1_swedish_ci"
    t.boolean "custom_theme_enabled", default: false
    t.index ["hide_from_homepage"], name: "index_authors_on_hide_from_homepage"
    t.index ["homepage_activity"], name: "index_authors_on_homepage_activity"
  end

  create_table "credentials", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "author_id"
    t.string "key"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "domains", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "author_id"
    t.string "domain"
    t.string "extended_email"
    t.boolean "approved", default: false
    t.boolean "active", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "guestbook_entries", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "author_id"
    t.text "text"
    t.string "signer_email"
    t.text "donation_info"
    t.boolean "public", default: false
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "unread", default: false
    t.boolean "spam", default: false
    t.index ["unread"], name: "index_guestbook_entries_on_unread"
  end

  create_table "letsencrypt_certificates", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "domain", limit: 180
    t.text "certificate"
    t.text "intermediaries"
    t.text "key"
    t.datetime "expires_at"
    t.datetime "renew_after"
    t.string "verification_path"
    t.string "verification_string"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["domain"], name: "index_letsencrypt_certificates_on_domain"
    t.index ["renew_after"], name: "index_letsencrypt_certificates_on_renew_after"
  end

  create_table "posts", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "token"
    t.string "item_uuid"
    t.string "title", collation: "utf8mb4_general_ci"
    t.text "text", limit: 4294967295, collation: "utf8mb4_general_ci"
    t.integer "author_id"
    t.boolean "unlisted", default: false
    t.boolean "published", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "word_count"
    t.string "canonical"
    t.string "metatype"
    t.string "image_url"
    t.datetime "email_sent_date"
    t.boolean "hidden", default: false
    t.boolean "pinned", default: false
    t.boolean "paid"
    t.decimal "price", precision: 10, scale: 2
    t.text "paid_content", limit: 16777215
    t.boolean "page", default: false
    t.boolean "author_show", default: false
    t.boolean "author_page", default: false
    t.string "desc"
    t.string "custom_path"
    t.string "page_link"
    t.integer "page_sort", default: 0
    t.string "author_name"
    t.string "author_link"
    t.index ["author_id", "author_name"], name: "index_posts_on_author_id_and_author_name"
    t.index ["author_id", "custom_path"], name: "index_posts_on_author_id_and_custom_path"
    t.index ["author_page"], name: "index_posts_on_author_page"
    t.index ["author_show", "created_at"], name: "index_posts_on_author_show_and_created_at"
    t.index ["author_show"], name: "index_posts_on_author_show"
    t.index ["created_at"], name: "index_posts_on_created_at"
    t.index ["metatype"], name: "index_posts_on_metatype"
    t.index ["unlisted", "hidden", "published"], name: "index_posts_on_unlisted_and_hidden_and_published"
    t.index ["unlisted"], name: "index_posts_on_unlisted"
  end

  create_table "purchases", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "post_id"
    t.string "buyer_email"
    t.decimal "price_paid", precision: 10, scale: 2
    t.boolean "emailed", default: false
    t.string "cus_stripe_id"
    t.string "tx_stripe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "paid_out", default: false
  end

  create_table "reactions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "subscriber_id"
    t.string "reaction_string", null: false
    t.string "token", null: false
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "simple_captcha_data", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "key", limit: 40
    t.string "value", limit: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "idx_key"
  end

  create_table "subscribers", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscriptions", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "author_id"
    t.integer "subscriber_id"
    t.string "token"
    t.boolean "verified"
    t.string "frequency", default: "daily"
    t.datetime "last_mailing"
    t.boolean "unsubscribed", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "verification_sent_at"
    t.index ["author_id"], name: "index_subscriptions_on_author_id"
    t.index ["frequency"], name: "index_subscriptions_on_frequency"
    t.index ["subscriber_id"], name: "index_subscriptions_on_subscriber_id"
    t.index ["unsubscribed"], name: "index_subscriptions_on_unsubscribed"
    t.index ["verified"], name: "index_subscriptions_on_verified"
  end

  create_table "tips", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "author_id"
    t.string "tipper_email"
    t.decimal "amount", precision: 10, scale: 2
    t.string "cus_stripe_id"
    t.string "tx_stripe_id"
    t.text "message"
    t.boolean "paid_out", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
