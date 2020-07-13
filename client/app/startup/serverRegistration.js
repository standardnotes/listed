import ReactOnRails from "react-on-rails";
import AuthorHeader from "../components/authors/Header";
import AuthorShow from "../components/authors/Show";
import AuthorSubscribe from "../components/authors/Subscribe";
import AuthorTip from "../components/authors/Tip";
import SharedFooter from "../components/shared/Footer";
import Usage from "../components/usage/Usage";
import PostShow from "../components/posts/Show";
import SubscriptionValidate from "../components/subscriptions/Validate";

ReactOnRails.register({
    AuthorHeader,
    AuthorShow,
    AuthorSubscribe,
    AuthorTip,
    SharedFooter,
    Usage,
    PostShow,
    SubscriptionValidate
});
