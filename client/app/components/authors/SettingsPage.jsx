import React from "react";
import LeftNavBarPage from "../shared/LeftNavBarPage";
import {
    General,
    MyPosts,
    GuestbookEntries,
    CustomDomain,
    PaymentDetails,
    DeleteBlog,
} from "./settings";
import Resources from "../shared/Resources";
import {
    IcSettingsFilled,
    IcTextRich,
    IcBook,
    IcEarth,
    IcCreditCard,
    IcLifebuoy,
    IcTrash,
} from "../../assets/icons";
import "./SettingsPage.scss";

const SettingsPage = ({
    author, authorCredentialsUrl, customDomainIP, guestbookEntries, posts,
}) => {
    const sections = [
        {
            id: "general",
            title: "General",
            icon: IcSettingsFilled,
            collapsed: false,
            renderContent: () => <General author={author} />,
        },
        {
            id: "my-posts",
            title: "My posts",
            icon: IcTextRich,
            collapsed: true,
            renderContent: () => <MyPosts posts={posts} author={author} />,
        },
        {
            id: "guestbook-entries",
            title: "Guestbook entries",
            icon: IcBook,
            collapsed: true,
            renderContent: () => <GuestbookEntries guestbookEntries={guestbookEntries} />,
        },
        {
            id: "custom-domain",
            title: "Custom domain",
            icon: IcEarth,
            collapsed: true,
            renderContent: () => <CustomDomain author={author} customDomainIP={customDomainIP} />,
        },
        {
            id: "payment-details",
            title: "Payment details",
            icon: IcCreditCard,
            collapsed: true,
            renderContent: () => (
                <PaymentDetails author={author} authorCredentialsUrl={authorCredentialsUrl} />
            ),
        },
        {
            id: "resources",
            title: "Resources",
            icon: IcLifebuoy,
            collapsed: true,
            renderContent: () => <Resources />,
        },
        {
            id: "delete-blog",
            title: "Delete blog",
            icon: IcTrash,
            collapsed: true,
            renderContent: () => <DeleteBlog author={author} />,
        },
    ];

    return (
        <LeftNavBarPage
            heading="Settings"
            subheading={(
                <div>
                    <p className="p1">
                        Your public blog is accessible via:
                    </p>
                    <ul className="accessible-via">
                        {author.accessible_via.map((url) => (
                            <li key={url} className="p1">
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            sections={sections}
        />
    );
};

export default SettingsPage;
