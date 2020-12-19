import React from "react";

export default ({ homeUrl, post, author, privatePost, pages, authorGuestbookEntriesUrl }) => {
    return (
        <div>
            <div id="page-header">
                <div className="left">
                    <div className="website-name">
                        <a href={homeUrl} className={author ? "dimmed" : ""}>
                            Listed
                        </a>
                    </div>
                    {author && !privatePost && (
                        <div className="author-name path-item">
                            <a href={author.url}>{author.title}</a>
                        </div>
                    )}
                    {post && post.page && (
                        <div className="author-name path-item">
                            <a href={post.author_relative_url}>{post.title}</a>
                        </div>
                    )}
                </div>
                <div className="right">
                    {pages && !privatePost && (
                        <div className="pages-menu">
                            {pages.map(page => (
                                <a key={page.id} href={page.author_relative_url} className="page-link">
                                    {page.title}
                                </a>
                            ))}
                            {author.credentials.length > 0 && (
                                <a href={`${author.url}/tip`} className="page-link">
                                    Thank
                                </a>
                            )}
                            {author.guestbook_disabled || (
                                <a href={authorGuestbookEntriesUrl} className="page-link">
                                    Guestbook
                                </a>
                            )}
                            {!author.newsletter_disabled && (
                                <a href={`${author.url}/subscribe`} className="page-link">
                                    Subscribe
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {author && !post && (
                <div className="header-author-info">
                    <div className="bio">{author.bio}</div>
                    <div className="word-count item first" suppressHydrationWarning={true}>
                        {author.word_count.toLocaleString()} words
                    </div>
                    {author.personal_link && (
                        <a
                            href={author.personal_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="item link author-link"
                        >
                            {author.link}
                        </a>
                    )}
                    {author.twitter && (
                        <a
                            href={`https://twitter.com/${author.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="item link author-twitter"
                        >
                            {`@${author.twitter}`}
                        </a>
                    )}
                </div>
            )}
            {author && !post && author.header_image_url && (
                <div className="header-image-container">
                    <img src={author.header_image_url} className="header-image"></img>
                </div>
            )}
            <div id="page-header-hr"></div>
        </div>
    );
};
