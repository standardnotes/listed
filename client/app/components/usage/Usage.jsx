import React from 'react';
import axios from 'axios';
import ActiveAuthors from './active_authors/ActiveAuthors';
import "./Usage.scss";

const Usage = ({ usage, secretUrl, authenticityToken, activeAuthors }) => {
    const generateAuthorLink = event => {
        event.preventDefault();

        axios
            .post("/authors", null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
            })
            .then(response => {
                window.location.href = response.request.responseURL;
            });
    };

    return (
        <div className="usage__container">
            <div className="usage__column-layout">
                <div className="usage__column">
                    <h1 className="h1 usage__header">Welcome to your new public journal.</h1>
                    <p className="p1">
                        Listed is a free blogging platform that allows you to create a public journal published directly from
                        your notes. This unique approach to keeping a public blog on the internet using just a{" "}
                        <a href="https://standardnotes.org" target="_blank" rel="noopener noreferrer">
                            notes app
                        </a>
                        {" "}yields two surprising effects.
                    </p>
                </div>
                <div className="usage__column">
                    <ol className="usage__list">
                        <li>
                            <p className="p2">
                                You discover a better form of your writing. You worry less about how others will perceive your
                                words, and more about feeling fulfilled that you shared your experience in its truest form. Honest
                                writing, in our experience, is better writing.
                            </p>
                        </li>
                        <li>
                            <p className="p2">
                                The privacy of writing in the{" "}
                                <a href="https://standardnotes.org" target="_blank" rel="noopener noreferrer"> 
                                    Standard Notes
                                </a>
                                {" "}app combined with the ease of publishing on Listed encourages free flow and expansion of thought.
                                You’ll probably publish on Listed more than you do any other platform. It’s not uncommon that Listed
                                authors publish a new journal entry to their blog every day.
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
            <button className="button button--primary usage__button--start-writing">
                Start writing
            </button>
            <ActiveAuthors activeAuthors={activeAuthors} />
            
            {/* <div className="mt-40">
                <h3>New Author?</h3>
                {!secretUrl ? (
                    <form onSubmit={e => generateAuthorLink(e)}>
                        <button className="black mt-20" type="submit">
                            Generate Author Link
                        </button>
                    </form>
                ) : (
                    <div>
                        <p>Your author account is now ready. Follow these steps to get started with publishing.</p>
                        <ol>
                            <li>
                                Open the
                                <a href="https://standardnotes.org" target="_blank" rel="noopener noreferrer">
                                    {" "}
                                    Standard Notes web or desktop app.
                                </a>
                            </li>
                            <li>
                                In the lower left corner of the app, click <strong>Extensions</strong>.
                            </li>
                            <li>
                                In the lower right corner, click <strong>Import Extension</strong>.
                            </li>
                            <li>
                                Paste in the code below in the input box that appears, then press enter on your keyboard.
                            </li>
                            <li>
                                Create a new note, or publish an existing note, by clicking <strong>Actions</strong> in the
                                note editor pane, and choosing <strong>Publish to Blog</strong>.
                            </li>
                            <li>
                                That's it! Your public journal is now live and ready to go! Be sure to explore the{" "}
                                <strong>Settings</strong> option to customize your blog's settings.
                            </li>
                        </ol>
                        <div className="sn-component">
                            <div className="sk-notification info dashed">
                                <div className="info-contrast wrap center-text selectable">{secretUrl}</div>
                            </div>
                        </div>
                        <p>
                            <strong>Note: </strong>
                            This code serves as your access credentials to Listed. After importing it, you are advised to
                            store it somewhere safe.
                        </p>
                    </div>
                )}
                {usage && (
                    <div className="mt-40">
                        <HowTo />
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default Usage;
