import React from "react";
import LeftNavBarPage from "../shared/LeftNavBarPage";
import {
    IcCode, IcBook, IcEarth, IcLifebuoy,
} from "../../assets/icons";
import { GettingStarted, GifSection } from "./new_author";
import Resources from "../shared/Resources";
import { PublishGif, SettingsGif } from "../../assets/gifs";
import "./NewAuthor.scss";

const NewAuthor = ({ secretUrl }) => {
    const sections = [
        {
            id: "getting-started",
            title: "Getting started",
            icon: IcCode,
            collapsed: false,
            renderContent: () => <GettingStarted secretUrl={secretUrl} />,
        },
        {
            id: "publishing",
            title: "Publishing on Listed",
            icon: IcEarth,
            collapsed: true,
            renderContent: () => (
                <GifSection
                    text="Create a new note, or publish an existing note, by clicking Actions in the note editor pane, and choosing Publish to Blog."
                    gifSource={PublishGif}
                />
            ),
        },
        {
            id: "managing",
            title: "Managing your blog",
            icon: IcBook,
            collapsed: true,
            renderContent: () => (
                <GifSection
                    text="Be sure to explore the Settings option to customize your blog's settings."
                    gifSource={SettingsGif}
                />
            ),
        },
        {
            id: "resources",
            title: "Resources",
            icon: IcLifebuoy,
            collapsed: true,
            renderContent: () => <Resources />,
        },
    ];

    return (
        <LeftNavBarPage
            heading="New author?"
            subheading={(
                <p className="p1">
                    Follow these steps to get started with publishing.
                </p>
            )}
            sections={sections}
        />
    );
};

export default NewAuthor;
