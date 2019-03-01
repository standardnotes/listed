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

ActiveRecord::Schema.define(version: 20190220004015) do

  create_table "authors", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string   "secret"
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.string   "username",                                                            collation: "utf8mb4_general_ci"
    t.string   "display_name",                                                        collation: "utf8mb4_general_ci"
    t.text     "bio",                      limit: 65535,                              collation: "utf8mb4_general_ci"
    t.string   "link"
    t.string   "email"
    t.string   "twitter"
    t.integer  "last_word_count"
    t.boolean  "featured",                               default: false
    t.boolean  "show_tip_option",                        default: true
    t.string   "meta_image_url"
    t.string   "header_image_url"
    t.boolean  "hide_from_homepage",                     default: false
    t.boolean  "guestbook_disabled",                     default: false
    t.boolean  "email_verified",                         default: false
    t.string   "email_verification_token"
    t.boolean  "newsletter_disabled",                    default: false
    t.index ["hide_from_homepage"], name: "index_authors_on_hide_from_homepage", using: :btree
  end

  create_table "credentials", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "author_id"
    t.string   "key"
    t.text     "value",      limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "domains", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "author_id"
    t.string   "domain"
    t.string   "extended_email"
    t.boolean  "approved",       default: false
    t.boolean  "active",         default: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "guestbook_entries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "author_id"
    t.text     "text",          limit: 65535
    t.string   "signer_email"
    t.text     "donation_info", limit: 65535
    t.boolean  "public",                      default: false
    t.string   "token"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
  end

  create_table "posts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "token"
    t.string   "item_uuid"
    t.string   "title",                                                                                    collation: "utf8mb4_general_ci"
    t.text     "text",            limit: 4294967295,                                                       collation: "utf8mb4_general_ci"
    t.integer  "author_id"
    t.boolean  "unlisted",                                                    default: false
    t.boolean  "published",                                                   default: true
    t.datetime "created_at",                                                                  null: false
    t.datetime "updated_at",                                                                  null: false
    t.integer  "word_count"
    t.string   "canonical"
    t.string   "metatype"
    t.string   "image_url"
    t.datetime "email_sent_date"
    t.boolean  "hidden",                                                      default: false
    t.boolean  "pinned",                                                      default: false
    t.boolean  "paid"
    t.decimal  "price",                              precision: 10, scale: 2
    t.text     "paid_content",    limit: 16777215
    t.index ["created_at"], name: "index_posts_on_created_at", using: :btree
    t.index ["metatype"], name: "index_posts_on_metatype", using: :btree
    t.index ["unlisted", "hidden", "published"], name: "index_posts_on_unlisted_and_hidden_and_published", using: :btree
    t.index ["unlisted"], name: "index_posts_on_unlisted", using: :btree
  end

  create_table "purchases", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer  "post_id"
    t.string   "buyer_email"
    t.decimal  "price_paid",    precision: 10, scale: 2
    t.boolean  "emailed",                                default: false
    t.string   "cus_stripe_id"
    t.string   "tx_stripe_id"
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.boolean  "paid_out",                               default: false
  end

  create_table "simple_captcha_data", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "key",        limit: 40
    t.string   "value",      limit: 6
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["key"], name: "idx_key", using: :btree
  end

  create_table "subscribers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscriptions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer  "author_id"
    t.integer  "subscriber_id"
    t.string   "token"
    t.boolean  "verified"
    t.string   "frequency",            default: "daily"
    t.datetime "last_mailing"
    t.boolean  "unsubscribed",         default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "verification_sent_at"
    t.index ["author_id"], name: "index_subscriptions_on_author_id", using: :btree
    t.index ["frequency"], name: "index_subscriptions_on_frequency", using: :btree
    t.index ["subscriber_id"], name: "index_subscriptions_on_subscriber_id", using: :btree
    t.index ["unsubscribed"], name: "index_subscriptions_on_unsubscribed", using: :btree
    t.index ["verified"], name: "index_subscriptions_on_verified", using: :btree
  end

  create_table "tips", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.integer  "author_id"
    t.string   "tipper_email"
    t.decimal  "amount",                      precision: 10, scale: 2
    t.string   "cus_stripe_id"
    t.string   "tx_stripe_id"
    t.text     "message",       limit: 65535
    t.boolean  "paid_out",                                             default: false
    t.datetime "created_at",                                                           null: false
    t.datetime "updated_at",                                                           null: false
  end

end
