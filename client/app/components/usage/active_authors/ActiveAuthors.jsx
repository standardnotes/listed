import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import ActiveAuthorItem from "./ActiveAuthorItem";
import "./ActiveAuthors.scss";

const ActiveAuthors = ({ activeAuthors }) => {
    const [authors, setAuthors] = useState(activeAuthors);

    const getItems = isDesktop =>
        authors.map(author => (
            <ActiveAuthorItem key={`${author.id}${isDesktop ? "-desktop" : "-mobile"}`} author={author} />
        ));

    useEffect(() => {
        const easterEggIndex = parseInt(Math.random() * activeAuthors.length - 1);

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
            ...activeAuthors.slice(easterEggIndex, activeAuthors.length - 1),
        ];

        setAuthors(authorsPlusEasterEgg);
    }, []);

    return (
        <div className="active-authors">
            <div className="active-authors__headline">
                <h3 className="h3">Listed authors</h3>
                <div className="active-authors__headline-separator"></div>
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
