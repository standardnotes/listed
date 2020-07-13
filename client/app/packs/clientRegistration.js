import ReactOnRails from "react-on-rails";
import Turbolinks from "turbolinks";
import AuthorHeader from "../components/authors/Header";
import AuthorShow from "../components/authors/Show";
import AuthorSubscribe from "../components/authors/Subscribe";
import AuthorTip from "../components/authors/Tip";
import Guestbook from "../components/guestbook_entries/Guestbook";
import GuestbookNew from "../components/guestbook_entries/New";
import PostShow from "../components/posts/Show";
import SharedFooter from "../components/shared/Footer";
import SubscriptionValidate from "../components/subscriptions/Validate";
import Usage from "../components/usage/Usage";

Turbolinks.start();

ReactOnRails.register({
    AuthorHeader,
    AuthorShow,
    AuthorSubscribe,
    AuthorTip,
    Guestbook,
    GuestbookNew,
    PostShow,
    SharedFooter,
    SubscriptionValidate,
    Usage
});

ReactOnRails.setOptions({
    traceTurbolinks: TRACE_TURBOLINKS
});
