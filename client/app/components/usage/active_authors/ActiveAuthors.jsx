import React from "react";
import MasonryLayout from "./MasonryLayout";
import ActiveAuthorItem from "./ActiveAuthorItem";
import "./ActiveAuthors.scss";

const ActiveAuthors = ({ activeAuthors }) => {
    const easterEggIndex = parseInt(Math.random() * (activeAuthors.length - 1));

    const easterEgg = {
        id: "easter-egg",
        title: "This could be you :)",
        bio: "Share your experience in its truest form. Start writing now.",
        url: "#",
        featured: false,
        easterEgg: true,
    };

    const authorsPlusEasterEgg = [
        ...activeAuthors.slice(0, easterEggIndex),
        easterEgg,
        ...activeAuthors.slice(easterEggIndex, activeAuthors.length),
    ];

    const getItems = isDesktop =>
        authorsPlusEasterEgg && authorsPlusEasterEgg.map(author => (
            <ActiveAuthorItem key={`${author.id}${isDesktop ? "-desktop" : "-mobile"}`} author={author} />
        ));

    return (
        <div className="active-authors">
            <div className="active-authors__headline">
                <h3 className="h3">Listed authors</h3>
                <div className="headline-separator"></div>
            </div>
            <MasonryLayout>
                {getItems(true)}
            </MasonryLayout>
            <div className="active-authors--mobile">
                {getItems(false)}
            </div>
        </div>
    );
};

export default ActiveAuthors;
