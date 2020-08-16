import ReactOnRails from "react-on-rails";
import AuthorHeader from "../components/authors/Header";
import AuthorShow from "../components/authors/Show";
import AuthorSubscribe from "../components/authors/Subscribe";
import AuthorTip from "../components/authors/Tip";
import AuthorsMailerDomainApproved from "../components/authors_mailer/DomainApproved";
import AuthorsMailerDomainInvalid from "../components/authors_mailer/DomainInvalid";
import AuthorsMailerFeatured from "../components/authors_mailer/Featured";
import Guestbook from "../components/guestbook_entries/Guestbook";
import GuestbookNew from "../components/guestbook_entries/New";
import Help from "../components/help/Help";
import PostShow from "../components/posts/Show";
import Posts from "../components/posts/Posts";
import SharedFooter from "../components/shared/Footer";
import SubscriptionConfirm from "../components/subscriptions/Confirm";
import SubscriptionMailerConfirmSubscription from "../components/subscription_mailer/ConfirmSubscription";
import SubscriptionMailerNewPost from "../components/subscription_mailer/NewPost";
import SubscriptionMailerNewSubscription from "../components/subscription_mailer/NewSubscription";
import SubscriptionMailerWeeklyDigest from "../components/subscription_mailer/WeeklyDigest";
import SubscriptionValidate from "../components/subscriptions/Validate";
import SubscriptionUnsubscribe from "../components/subscriptions/Unsubscribe";
import SubscriptionUpdateFrequency from "../components/subscriptions/UpdateFrequency";
import Usage from "../components/usage/Usage";

ReactOnRails.register({
    AuthorHeader,
    AuthorShow,
    AuthorSubscribe,
    AuthorTip,
    AuthorsMailerDomainApproved,
    AuthorsMailerDomainInvalid,
    AuthorsMailerFeatured,
    Guestbook,
    GuestbookNew,
    Help,
    PostShow,
    Posts,
    SharedFooter,
    SubscriptionConfirm,
    SubscriptionMailerConfirmSubscription,
    SubscriptionMailerNewPost,
    SubscriptionMailerNewSubscription,
    SubscriptionMailerWeeklyDigest,
    SubscriptionValidate,
    SubscriptionUnsubscribe,
    SubscriptionUpdateFrequency,
    Usage
});
