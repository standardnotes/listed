import PropTypes from "prop-types";
import React from "react";

const NewReaction = ({ author, post, reaction }) => (
    <div>
        <h3>Hey {author.display_name},</h3>
        <p>
            Someone reacted {reaction.reaction_string} to your post "<a href={post.url}>{post.title}</a>"!
        </p>
        <p>Keep up the good work!</p>
    </div>
);

NewReaction.propTypes = {
    reaction: PropTypes.shape({
        reaction_string: PropTypes.string.isRequired,
    }).isRequired,
    author: PropTypes.shape({
        display_name: PropTypes.string.isRequired,
    }).isRequired,
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default NewReaction;
