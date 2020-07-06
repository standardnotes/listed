import ReactOnRails from "react-on-rails";
import Turbolinks from "turbolinks";
import AuthorHeader from "../components/authors/Header";
import AuthorShow from "../components/authors/Show";
import SharedFooter from "../components/shared/Footer";
import Usage from "../components/usage/Usage";
import PostShow from "../components/posts/Show";
import SubscriptionValidate from "../components/subscriptions/Validate";

Turbolinks.start();

ReactOnRails.register({
    AuthorHeader,
    AuthorShow,
    SharedFooter,
    Usage,
    PostShow,
    SubscriptionValidate
});

ReactOnRails.setOptions({
    traceTurbolinks: TRACE_TURBOLINKS
});
