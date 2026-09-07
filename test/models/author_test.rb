require 'test_helper'

class AuthorTest < ActiveSupport::TestCase
  self.fixture_table_names = []

  setup do
    ENV['HOST'] ||= 'http://www.example.com'
  end

  def create_author(attrs = {})
    Author.create!({
      secret: SecureRandom.hex(10),
      email: 'author@example.com',
      email_verified: true,
    }.merge(attrs))
  end

  def create_post(author, attrs = {})
    Post.create!({
      author: author,
      title: 'Test post',
      text: 'Post content',
      token: SecureRandom.hex(10),
      published: true,
    }.merge(attrs))
  end

  test 'with_published_posts includes author with a public published post' do
    author = create_author
    create_post(author, unlisted: false)

    assert_includes Author.with_published_posts, author
  end

  test 'with_published_posts includes author with a private-link published post' do
    author = create_author
    create_post(author, unlisted: true)

    assert_includes Author.with_published_posts, author
  end

  test 'with_published_posts includes author with a css published post' do
    author = create_author
    create_post(author, metatype: 'css')

    assert_includes Author.with_published_posts, author
  end

  test 'with_published_posts excludes author with only unpublished posts' do
    author = create_author
    create_post(author, published: false)

    assert_not_includes Author.with_published_posts, author
  end

  test 'emailable includes verified author with email' do
    author = create_author(email_verified: true, email: 'verified@example.com')

    assert_includes Author.emailable, author
  end

  test 'emailable excludes unverified author' do
    author = create_author(email_verified: false, email: 'unverified@example.com')

    assert_not_includes Author.emailable, author
  end

  test 'with_published_posts emailable matches rake task audience' do
    published_author = create_author(email: 'published@example.com', email_verified: true)
    create_post(published_author)

    unpublished_author = create_author(email: 'unpublished@example.com', email_verified: true)
    create_post(unpublished_author, published: false)

    unverified_author = create_author(email: 'unverified@example.com', email_verified: true)
    create_post(unverified_author)
    unverified_author.update!(email_verified: false)

    audience = Author.with_published_posts.emailable

    assert_includes audience, published_author
    assert_not_includes audience, unpublished_author
    assert_not_includes audience, unverified_author
  end
end
