import React from 'react';
import axios from 'axios';
import HowTo from './HowTo';

export default ({ usage, secretUrl, authenticityToken, activeAuthors }) => {
    const generateAuthorLink = (event) => {
        event.preventDefault();

        axios
            .post("/authors", null, {
                headers: {
                    "X-CSRF-Token": authenticityToken,
                },
            })
            .then((response) => {
                window.location.href = response.request.responseURL;
            });
    };

    return (
        <div>
            <p>
                <i>Welcome to your new public journal.</i>
            </p>
            <p>
                Listed is a free blogging platform that allows you to create a public journal published directly from
                your notes. This unique approach to keeping a public blog on the internet using just a
                <a href="https://standardnotes.org" target="_blank" rel="noopener noreferrer">
                    {" "}
                    notes app{" "}
                </a>
                yields two surprising effects:
            </p>
            <ol>
                <li>
                    You discover a better form of your writing. You worry less about how others will perceive your
                    words, and more about feeling fulfilled that you shared your experience in its truest form. Honest
                    writing, in our experience, is better writing.
                </li>
                <li>
                    The privacy of writing in the
                    <a href="https://standardnotes.org" target="_blank" rel="noopener noreferrer">
                        {" "}
                        Standard Notes{" "}
                    </a>
                    app combined with the ease of publishing on Listed encourages free flow and expansion of thought.
                    You’ll probably publish on Listed more than you do any other platform. It’s not uncommon that Listed
                    authors publish a new journal entry to their blog every day.
                </li>
            </ol>
            <p>
                <a
                    href="https://listed.to/@Listed/5063/what-will-you-write-about"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn more about Listed →
                </a>
            </p>
            <p>
                <a
                    href="https://listed.to/@Listed/5202/100-day-writing-challenge"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Take the #100Days Writing Challenge →
                </a>
            </p>
            <div className="mt-40">
                <h3>New Author?</h3>
                {!secretUrl ? (
                    <form onSubmit={(e) => generateAuthorLink(e)}>
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
            </div>
            <div className="active-authors mt-40">
                <h3>Recent Authors</h3>
                {activeAuthors.map(author =>
                    <div key={author.id} className="author">
                        <a href={author.url}>{author.featured && <span>✪</span>} {author.title}</a>
                        {author.bio && (
                            <div className="bio">{author.bio}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
