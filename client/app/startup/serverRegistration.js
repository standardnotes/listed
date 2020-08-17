import ReactOnRails from "react-on-rails";
import AuthorHeader from "../components/authors/Header";
import AuthorSettings from "../components/authors/Settings";
import AuthorShow from "../components/authors/Show";
import AuthorSubscribe from "../components/authors/Subscribe";
import AuthorTip from "../components/authors/Tip";
import CredentialsEdit from "../components/credentials/Edit";
import CredentialsNew from "../components/credentials/New";
import Guestbook from "../components/guestbook_entries/Guestbook";
import GuestbookNew from "../components/guestbook_entries/New";
import Help from "../components/help/Help";
import PostShow from "../components/posts/Show";
import Posts from "../components/posts/Posts";
import SharedFooter from "../components/shared/Footer";
import SubscriptionConfirm from "../components/subscriptions/Confirm";
import SubscriptionValidate from "../components/subscriptions/Validate";
import SubscriptionUnsubscribe from "../components/subscriptions/Unsubscribe";
import SubscriptionUpdateFrequency from "../components/subscriptions/UpdateFrequency";
import Usage from "../components/usage/Usage";

ReactOnRails.register({
    AuthorHeader,
    AuthorSettings,
    AuthorShow,
    AuthorSubscribe,
    AuthorTip,
    CredentialsEdit,
    CredentialsNew,
    Guestbook,
    GuestbookNew,
    Help,
    PostShow,
    Posts,
    SharedFooter,
    SubscriptionConfirm,
    SubscriptionValidate,
    SubscriptionUnsubscribe,
    SubscriptionUpdateFrequency,
    Usage
});
