import ReactOnRails from "react-on-rails";
import AdminMailerNewDomainRequest from "../components/admin_mailer/NewDomainRequest";
import AuthorHeader from "../components/authors/HeaderContainer";
import AuthorSettings from "../components/authors/SettingsPage";
import AuthorShow from "../components/authors/Show";
import AuthorSubscribe from "../components/authors/Subscribe";
import AuthorTip from "../components/authors/Tip";
import AuthorsMailerDomainApproved from "../components/authors_mailer/DomainApproved";
import AuthorsMailerDomainInvalid from "../components/authors_mailer/DomainInvalid";
import AuthorsMailerFeatured from "../components/authors_mailer/Featured";
import AuthorsMailerUnreadGuestbookEntries from "../components/authors_mailer/UnreadGuestbookEntries";
import AuthorsMailerVerifyEmail from "../components/authors_mailer/VerifyEmail";
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
import SubscriptionUnsubscribe from "../components/subscriptions/Unsubscribe";
import SubscriptionUpdateFrequency from "../components/subscriptions/UpdateFrequency";
import SubscriptionValidate from "../components/subscriptions/Validate";
import Usage from "../components/usage/Usage";
import UsageNewAuthor from "../components/usage/NewAuthor";

ReactOnRails.register({
    AdminMailerNewDomainRequest,
    AuthorHeader,
    AuthorSettings,
    AuthorShow,
    AuthorSubscribe,
    AuthorTip,
    AuthorsMailerDomainApproved,
    AuthorsMailerDomainInvalid,
    AuthorsMailerFeatured,
    AuthorsMailerUnreadGuestbookEntries,
    AuthorsMailerVerifyEmail,
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
    SubscriptionUnsubscribe,
    SubscriptionUpdateFrequency,
    SubscriptionValidate,
    Usage,
    UsageNewAuthor,
});
