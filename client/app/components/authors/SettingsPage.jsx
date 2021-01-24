import React, { useState } from "react";
import LeftNavBarPage from "../shared/LeftNavBarPage";
import {
    General,
    MyPosts,
    GuestbookEntries,
    CustomDomain,
    PaymentDetails,
    DeleteBlog
} from "./settings";
import Resources from "../shared/Resources";
import {
    IcSettingsFilled,
    IcTextRich,
    IcBook,
    IcEarth,
    IcCreditCard,
    IcLifebuoy,
    IcTrash
} from "../../assets/icons";
import "./SettingsPage.scss";
import ErrorToast from "../shared/ErrorToast";

const SettingsPage = ({ author, authorCredentialsUrl, customDomainIP, guestbookEntries, posts }) => {
    const [isErrorToastDisplayed, setIsErrorToastDisplayed] = useState(false);
    const [errorToastMessage, setErrorToastMessage] = useState("");

    const sections = [
        {
            id: "general",
            title: "General",
            icon: IcSettingsFilled,
            collapsed: false,
            renderContent: () => (
                <General
                    author={author}
                    setErrorToastMessage={setErrorToastMessage}
                    setIsErrorToastDisplayed={setIsErrorToastDisplayed}
                />
            ),
        },
        {
            id: "my-posts",
            title: "My posts",
            icon: IcTextRich,
            collapsed: true,
            renderContent: () => (
                <MyPosts
                    posts={posts}
                    author={author}
                    setErrorToastMessage={setErrorToastMessage}
                    setIsErrorToastDisplayed={setIsErrorToastDisplayed}
                />
            ),
        },
        {
            id: "guestbook-entries",
            title: "Guestbook entries",
            icon: IcBook,
            collapsed: true,
            renderContent: () => (
                <GuestbookEntries
                    guestbookEntries={guestbookEntries}
                    setErrorToastMessage={setErrorToastMessage}
                    setIsErrorToastDisplayed={setIsErrorToastDisplayed}
                />
            ),
        },
        {
            id: "custom-domain",
            title: "Custom domain",
            icon: IcEarth,
            collapsed: true,
            renderContent: () => (
                <CustomDomain
                    author={author}
                    customDomainIP={customDomainIP}
                    setErrorToastMessage={setErrorToastMessage}
                    setIsErrorToastDisplayed={setIsErrorToastDisplayed}
                />
            ),
        },
        {
            id: "payment-details",
            title: "Payment details",
            icon: IcCreditCard,
            collapsed: true,
            renderContent: () => (
                <PaymentDetails
                    author={author}
                    authorCredentialsUrl={authorCredentialsUrl}
                    setErrorToastMessage={setErrorToastMessage}
                    setIsErrorToastDisplayed={setIsErrorToastDisplayed} 
                />
            ),
        },
        {
            id: "resources",
            title: "Resources",
            icon: IcLifebuoy,
            collapsed: true,
            renderContent: () => <Resources />
        },
        {
            id: "delete-blog",
            title: "Delete blog",
            icon: IcTrash,
            collapsed: true,
            renderContent: () => <DeleteBlog author={author} />
        }
    ];

    return (
        <>
            <LeftNavBarPage
                heading="Settings"
                subheading={
                    <div>
                        <p className="p1">
                            Your public blog is accessible via:
                        </p>
                        <ul className="accessible-via">
                            {author.accessible_via.map(url => (
                                <li key={url} className="p1">
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {url}
                                    </a>
                                </li>     
                            ))}
                        </ul>
                    </div>
                }
                sections={sections}
            />
            <ErrorToast
                message={errorToastMessage}
                isDisplayed={isErrorToastDisplayed}
                setIsDisplayed={setIsErrorToastDisplayed}
            />
        </>
    );
};

export default (props) => <SettingsPage {...props} />;
