import PropTypes from "prop-types";
import { authorAppearanceValidOptions } from "../constants";

const type = PropTypes.shape({
    bio: PropTypes.string,
    display_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    guestbook_disabled: PropTypes.bool.isRequired,
    header_image_url: PropTypes.string,
    hide_from_homepage: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    link: PropTypes.string,
    meta_image_url: PropTypes.string,
    newsletter_disabled: PropTypes.bool.isRequired,
    secret: PropTypes.string.isRequired,
    twitter: PropTypes.string,
    username: PropTypes.string.isRequired,
    cover_style: PropTypes.oneOf(authorAppearanceValidOptions.coverStyle).isRequired,
    blog_layout_style: PropTypes.oneOf(authorAppearanceValidOptions.blogLayoutStyle).isRequired,
    custom_theme_enabled: PropTypes.bool.isRequired,
});

export default type;
