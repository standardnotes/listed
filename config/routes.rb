Rails.application.routes.draw do
  get "/healthcheck" => "health_check#index"

  mount LetsEncrypt::Engine => '/.well-known'

  resources :authors do
    member do
      get 'all'
      get 'settings'
      get 'tip'
      get 'subscribe'
      get 'verify_email'
      get 'feed' => 'authors#feed', :format => 'rss'
      get 'more_posts'
      post 'email_subscribe', as: 'email_subscribe'
      post 'domain_request'
      post 'delete_domain'
      post 'delete_all_data'
    end

    get ':author_id/guestbook' => 'guestbook_entries#index'

    resources :guestbook_entries, path: :guestbook do
      member do
        get 'approve'
        get 'unapprove'
        get 'delete'
        get 'spam'
      end
    end

    resources :posts do
      member do
        post 'unpublish'
        post 'newsletter'
        post 'change_privacy'
        post 'delete'
      end
    end

    resources :credentials
    get 'extension'
  end

  resources :subscriptions do
    get 'confirm', :as => 'subscriptions_confirm'

    # Captcha
    get 'validate', :as => 'validate'
    post 'submit_validate', :as => 'submit_validate'

    get 'unsubscribe', :as => 'subscription_unsubscribe'
    get 'update_frequency', :as => 'subscription_update_frequency'
  end

  constraints CustomDomainConstraint do
    get 'all' => 'authors#all'
    get 'feed' => 'authors#feed', :format => 'rss'
    get 'tip' => 'authors#tip'
    get 'subscribe' => 'authors#subscribe'
    get 'guestbook' => 'guestbook_entries#index'
    post 'email_subscribe' => 'authors#email_subscribe'
    get 'author-sitemap.xml', :to => 'sitemap#custom_domain', :defaults => {:format => 'xml'}
    get 'robots.txt' => 'robots#index', :defaults => {:format => 'txt'}
    get '/p/:post_token' => 'posts#show'
    get ':id/:slug' => 'posts#show'
    get ':id' => 'posts#show', constraints: { id: /[0-9]+/ }
    get ':post_token' => 'posts#show'
    root to: 'authors#show'
  end

  get '/usage' => 'usage#index'
  get '/new-author' => 'usage#new_author'

  un_regex = /@.[^\/]*/

  get ':username/all' => 'authors#all', :constraints => {:username => un_regex}
  get ':username/feed' => 'authors#feed', :format => 'rss', :constraints => {:username => un_regex}
  get ':username/tip' => 'authors#tip', :constraints => {:username => un_regex}
  get ':username/subscribe' => 'authors#subscribe', :constraints => {:username => un_regex}
  get ':username/guestbook' => 'guestbook_entries#index', :constraints => {:username => un_regex}
  get ':username/:id' => 'posts#show', :constraints => {:username => un_regex, id: /[0-9]+/ }, as: 'single_post'
  get ':username/:custom_path' => 'posts#show', :constraints => {:username => un_regex}
  get ':username/:id/:slug' => 'posts#show', :constraints => {:username => un_regex}, as: 'slugged_post'
  get ':username' => 'authors#show', :constraints => {:username => un_regex}

  get 'sitemap.xml', :to => 'sitemap#index', :defaults => {:format => 'xml'}
  get 'authors-sitemap-:page.xml', :to => 'sitemap#authors', :defaults => {:format => 'xml'}
  get 'posts-sitemap-:page.xml', :to => 'sitemap#posts', :defaults => {:format => 'xml'}
  get 'robots.txt' => 'robots#index', :defaults => {:format => 'txt'}

  get '/help' => 'help#index'

  get '/:post_token' => 'posts#show'
  get '/p/:post_token' => 'posts#show'

  get '404', :to => 'application#page_not_found'

  root 'usage#index'
end
