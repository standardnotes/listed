import React from "react";
import EditAuthor from "./settings/EditAuthor";
import PaymentDetails from "./settings/PaymentDetails";
import CustomDomain from "./settings/CustomDomain";
import GuestbookEntries from "./settings/GuestbookEntries";
import AllPosts from "./settings/AllPosts";
import DeleteBlog from "./settings/DeleteBlog";
import HowTo from "../usage/HowTo";

export default ({ author, authenticityToken, customDomainIP, guestbookEntries, posts, deleteAllDataError }) => {
    return (
        <div id="settings" className="sn-component single-post-show">
            <h3>Settings</h3>
            <div className="urls">
                <p className="header">
                    Your public blog is accessible via:
                </p>
                {author.accessible_via.map(url => (
                    <p key={url} className="url">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </p>
                ))}
            </div>
            <EditAuthor author={author} authenticityToken={authenticityToken} />
            <PaymentDetails author={author} />
            <CustomDomain author={author} authenticityToken={authenticityToken} customDomainIP={customDomainIP} />
            <hr className="mt-30" />
            <GuestbookEntries guestbookEntries={guestbookEntries} />
            <hr className="mt-30" />
            <AllPosts posts={posts} author={author} />
            <hr className="mt-30" />
            <DeleteBlog deleteAllDataError={deleteAllDataError} author={author} authenticityToken={authenticityToken} />
            <hr className="mt-30" />
            <HowTo />
        </div>
    );
};
