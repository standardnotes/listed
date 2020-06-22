import React from 'react';

export default ({ homeUrl }) => {
    return (
        <div id="footer">
            <div className="left">
                <a href={homeUrl} className="listed">
                    <p>Listed</p>
                </a>
            </div>
            <div className="right">
                <a href="https://standardnotes.org">
                    <p>via Standard Notes</p>
                </a>
            </div>
        </div>
    );
};
      