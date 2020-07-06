import ReactOnRails from "react-on-rails";
import AuthorHeader from "../components/authors/Header";
import AuthorShow from "../components/authors/Show";
import SharedFooter from "../components/shared/Footer";
import Usage from "../components/usage/Usage";
import PostShow from "../components/posts/Show";
import SubscriptionValidate from "../components/subscriptions/Validate";

ReactOnRails.register({
    AuthorHeader,
    AuthorShow,
    SharedFooter,
    Usage,
    PostShow,
    SubscriptionValidate
});
