Rails.application.routes.draw do

  resources :authors do
    member do
      get "settings"
      get "tip"
      get "verify_email"
      post "subscribe", :as => "subscribe"
      post "domain_request"
    end

    resources :guestbook_entries, :path => :guestbook do
      member do
        get "approve"
        get "unapprove"
        get "delete"
      end
    end

    resources :posts do
      member do
        post "unpublish"
        post "newsletter"
        get "delete"
      end
    end

    resources :credentials
    get "extension"
  end

  resources :subscriptions do
    get "confirm", :as => "subscriptions_confirm"

    # Captcha
    get "validate", :as => "validate"
    post "submit_validate", :as => "submit_validate"

    get "unsubscribe", :as => "subscription_unsubscribe"
    get "update_frequency", :as => "subscription_update_frequency"
  end

  constraints CustomDomainConstraint do
    get 'feed' => 'authors#feed', :format => 'rss'
    get 'tip' => 'authors#tip'
    get ':id/:slug' => 'posts#show'
    post "subscribe" => "authors#subscribe"
    root to: 'authors#show'
  end

  get "/usage" => "usage#index"

  un_regex = /@.[^\/]*/

  # RSS Feed
  get ':username/feed' => 'authors#feed', :format => 'rss', :constraints => {:username => un_regex}

  # Tipping
  get ':username/tip' => 'authors#tip', :constraints => {:username => un_regex}

  get ':username/:id' => 'posts#show', :constraints => {:username => un_regex}, as: 'single_post'
  get ':username/:id/:slug' => 'posts#show', :constraints => {:username => un_regex}, as: 'slugged_post'

  get ':username' => 'authors#show', :constraints => {:username => un_regex}

  get 'sitemap.xml', :to => 'sitemap#index', :defaults => {:format => 'xml'}
  get '/help' => "help#index"

  get "/:post_token" => "posts#show"

  root "usage#index"

end
