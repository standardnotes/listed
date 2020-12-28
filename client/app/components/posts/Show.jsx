import React from "react";
import Post from "../posts/Post";
import SubscriptionForm from "../authors/SubscriptionForm";
import moment from "moment";

export default ({ post, previous, next, authorPosts, subscribedToAuthor, subscriptionForAuthor, subscriptionSuccess, authenticityToken }) => {
    return (
        <div className="single-post-show">
            <Post post={post}></Post>
            {!post.unlisted && (
                <div>
                    <hr></hr>
                    <div id="single-post-footer">
                        {!post.author.newsletter_disabled && (
                            <div id="subscription-form" className="form-box centered">
                                <SubscriptionForm
                                    subscribedToAuthor={subscribedToAuthor}
                                    subscriptionForAuthor={subscriptionForAuthor}
                                    subscriptionSuccess={subscriptionSuccess}
                                    author={post.author}
                                    authenticityToken={authenticityToken}
                                >
                                </SubscriptionForm>
                            </div>
                        )}
                        {post.page || (
                            <div>
                                <p className="more-from">
                                    More from&nbsp;
                                    <a className="author-name" href={post.author.username}>
                                        <strong>{post.author.title}</strong>
                                    </a>
                                </p>
                                <div className="previous-next-container">
                                    {previous && (
                                        <div className="previous">
                                            <Post post={previous} truncate={true}></Post>  
                                        </div>
                                    )}
                                    {next && (
                                        <div className="next">
                                            <Post post={next} truncate={true}></Post>  
                                        </div>
                                    )}
                                </div>
                                <div className="posts">
                                    {authorPosts && authorPosts.length > 0 && (
                                        authorPosts.map(tiedPost =>
                                            <div key={tiedPost.id} className="more-from-link">
                                                <a href={tiedPost.author_relative_url}>
                                                    <strong>{tiedPost.title}</strong>
                                                    <div className="faded">
                                                        <i>{moment.utc(tiedPost.created_at).format("MMMM D, YYYY")}</i>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
