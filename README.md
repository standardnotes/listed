# Listed

_Listed_ is a minimal blogging platform ideal for publishing a public journal or sharing domain specific knowledge. Writers can publish directly from the comforts of [Standard Notes](https://standardnotes.org) and readers can subscribe to new articles via email.

Listed is unopinionated about fonts, widths, and colors, and instead defers to the reader's system settings to provide a familiar experience.

## Usage

Generate an author code on [listed.to](https://listed.to) to get started.

### Customization

#### How to style your blog with custom CSS:

1\. Create a new note in Standard Notes, and call it `listed_styles.css` (name doesn't matter).

2\. Use the following metadata structure, followed by some CSS, then publish the note to your blog.

    ---
    metatype: css
    ---

    html, body {
    	font-family: "Avenir Next", sans-serif;
    	color: #37424F;
    }

    h1 a, h2 a, h3 a, h4 a {
    	color: #37424F !important;
    }

    .post-content {
    	color: #37424F !important;
    }

    #author-header .bio {
    	opacity: 1.0;
    }

#### How to specify post date and canonical URL:

You can change the date that appears on your post, or set a [canonical URL](https://en.wikipedia.org/wiki/Canonical_link_element) if you're importing a post from another location (such as Medium).

1\. Use the following metadata structure at the beginning of your note:

    ---
    created_at: 2017-11-20 17:08:05
    canonical: https://mysite.com/blog/1/post-im-importing.
    ---

    Your story...`

## Contributing

### How to run application locally

To run the application locally, after cloning the repo follow these steps:
```
yarn install --frozen-lockfile
bundle exec rails db:migrate
bundle exec rails db:seed
gem install bundler && bundle install
yarn run start:dev
```

Now the application should be running on http://localhost:3000 and webpack-dev-server should be watching source files and recompiling as you make changes in your code to allow live reloading.


### How to run locally with Docker

To run the application locally you have to install Docker and type the following:
```
cp .env.sample .env
docker-compose up -d
```

Now the application should be running on http://localhost:3000
