import PropTypes from "prop-types";
import React from "react";
import AuthorsList from "./authors_list/AuthorsList";
import StartWriting from "../shared/StartWriting";
import "./Usage.scss";

const Usage = ({ activeAuthors, featuredAuthors }) => (
    <div className="usage page-container">
        <div className="usage__column-layout">
            <div className="usage__column">
                <h1 className="h1 usage__header">Welcome to your new public journal.</h1>
                <p className="p1">
                    Listed is a free blogging platform that allows you to create
                    a public journal published directly from your notes.
                    This unique approach to keeping a public blog on the internet using just a
                    {" "}
                    <a href="https://standardnotes.com" target="_blank" rel="noopener noreferrer">
                        notes app
                    </a>
                    {" "}
                    yields two surprising effects.
                </p>
            </div>
            <div className="usage__column">
                <ol className="usage__list">
                    <li>
                        <p className="p2">
                            You discover a better form of your writing.
                            You worry less about how others will perceive your words,
                            and more about feeling fulfilled that you shared your experience
                            in its truest form.
                            Honest writing, in our experience, is better writing.
                        </p>
                    </li>
                    <li>
                        <p className="p2">
                            The privacy of writing in
                            {" "}
                            <a href="https://standardnotes.com" target="_blank" rel="noopener noreferrer">
                                Standard Notes
                            </a>
                            {" "}
                            combined with the ease of publishing on Listed
                            encourages free flow and expansion of thought.
                            You’ll probably publish on Listed more than you do any other platform.
                            It’s not uncommon that Listed authors
                            publish a new journal entry to their blog every day.
                        </p>
                    </li>
                </ol>
            </div>
        </div>
        <StartWriting className="button--start-writing" />
        <AuthorsList authors={featuredAuthors} type="featured" />
        <AuthorsList authors={activeAuthors} type="recent" />
    </div>
);

Usage.propTypes = {
    activeAuthors: PropTypes.arrayOf(
        PropTypes.shape({}),
    ).isRequired,
    featuredAuthors: PropTypes.arrayOf(
        PropTypes.shape({}),
    ).isRequired,
};

export default Usage;
