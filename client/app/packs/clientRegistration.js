import ReactOnRails from "react-on-rails";
import Turbolinks from "turbolinks";
import AuthorHeader from "../components/authors/HeaderContainer";
import AuthorSettings from "../components/authors/SettingsPage";
import AuthorAll from "../components/authors/All";
import AuthorShow from "../components/authors/Show";
import AuthorSubscribe from "../components/authors/Subscribe";
import AuthorTip from "../components/authors/Tip";
import Guestbook from "../components/guestbook_entries/Guestbook";
import GuestbookNew from "../components/guestbook_entries/New";
import Help from "../components/help/Help";
import PostShow from "../components/posts/Show";
import Posts from "../components/posts/Posts";
import SharedFooter from "../components/shared/Footer";
import SubscriptionConfirm from "../components/subscriptions/Confirm";
import SubscriptionUnsubscribe from "../components/subscriptions/Unsubscribe";
import SubscriptionUpdateFrequency from "../components/subscriptions/UpdateFrequency";
import SubscriptionValidate from "../components/subscriptions/Validate";
import Usage from "../components/usage/Usage";
import UsageNewAuthor from "../components/usage/NewAuthor";
import ReactionSuccess from "../components/reactions/ReactionSuccess";
import NewReaction from "../components/reactions/New";

import "../assets/styles/application.scss";

Turbolinks.start();

ReactOnRails.register({
    AuthorHeader,
    AuthorSettings,
    AuthorAll,
    AuthorShow,
    AuthorSubscribe,
    AuthorTip,
    Guestbook,
    GuestbookNew,
    Help,
    NewReaction,
    PostShow,
    Posts,
    ReactionSuccess,
    SharedFooter,
    SubscriptionConfirm,
    SubscriptionUnsubscribe,
    SubscriptionUpdateFrequency,
    SubscriptionValidate,
    Usage,
    UsageNewAuthor,
});

ReactOnRails.setOptions({
    /* global TRACE_TURBOLINKS */
    traceTurbolinks: TRACE_TURBOLINKS,
});
