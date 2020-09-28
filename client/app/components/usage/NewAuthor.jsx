import React from "react";
import LeftNavBarPage from "../shared/LeftNavBarPage";
import { IcCode, IcBook, IcEarth, IcLifebuoy } from "../../assets/icons";
import { GettingStarted, GifSection } from "./new_author";
import Resources from "../shared/Resources";

const NewAuthor = ({ secretUrl }) => {
    const sections = [
        {
            id: "getting-started",
            title: "Getting started",
            icon: IcCode,
            collapsed: false,
            renderContent: () => (<GettingStarted secretUrl={secretUrl} />)
        },
        {
            id: "publishing",
            title: "Publishing on Listed",
            icon: IcEarth,
            collapsed: true,
            renderContent: () => (<GifSection />)
        },
        {
            id: "managing",
            title: "Managing your blog",
            icon: IcBook,
            collapsed: true,
            renderContent: () => (<GifSection />)
        },
        {
            id: "resources",
            title: "Resources",
            icon: IcLifebuoy,
            collapsed: true,
            renderContent: () => (<Resources />)
        }
    ];

    return(
        <LeftNavBarPage
            heading="New author?"
            subheading="Follow these steps to get started with publishing."
            sections={sections}
        />
    );
};

export default NewAuthor;
