import React from "react";
import LeftNavBarPage from "../shared/LeftNavBarPage";
import { IcCode, IcBook, IcEarth, IcLifebuoy } from "../../assets/icons";
import "./NewAuthor.scss";

const NewAuthor = ({ secretUrl }) => {
    const sections = [
        {
            id: "getting-started",
            title: "Getting started",
            icon: IcCode
        },
        {
            id: "publishing",
            title: "Publishing on Listed",
            icon: IcEarth
        },
        {
            id: "managing",
            title: "Managing your blog",
            icon: IcBook
        },
        {
            id: "resources",
            title: "Resources",
            icon: IcLifebuoy
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
