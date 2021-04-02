const hasCredentials = (author) => author.credentials.length > 0;

const hasPages = (pages) => pages && pages.length > 0;

const hasGuestbook = (author) => !author.guestbook_disabled;

const hasNewsletter = (author) => !author.newsletter_disabled;

const shouldShowMenu = (author, pages) => hasPages(pages) || hasCredentials(author)
    || hasGuestbook(author) || hasNewsletter(author);

export {
    hasNewsletter,
    hasGuestbook,
    hasCredentials,
    hasPages,
    shouldShowMenu,
};
