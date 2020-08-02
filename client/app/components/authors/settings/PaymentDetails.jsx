import React from "react";

export default ({ author }) => {
    return (
        <div className="mt-30 form-box full">
            <strong>Payment Details</strong>
            <p>
                Listed allows authors to receive tips and donations in a platform-agnostic way. Readers can pay authors
                by clicking the 'Thank' option on the author profile. This will display the various ways you have
                indicated you can receive payments.
            </p>
            <p>
                Once a reader sends you a tip or donation, they are advised, but not required to, fill out your
                guestbook to notify you that they have made a payment.
            </p>
            <p>
                Below, you can add any custom payment "credential". For example, you can specify a key of "Bitcoin", and
                the value will be your BTC address. Or, you can specify a key of "PayPal", and the value will be your
                PayPal payment link.
            </p>
            <strong>Current Credentials</strong>
            {author.credentials.map(credential => (
                <p key={credential.id}>
                    <a
                        href={`/authors/${author.id}/credentials/${credential.id}/edit?secret=${author.secret}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong>{credential.key}:</strong>
                    </a>
                    {" "}{credential.value}
                </p>
            ))}
            <p>
                <a
                    href={`/authors/${author.id}/credentials/new?secret=${author.secret}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add New Credential
                </a>
            </p>
            <p>
                <i>To edit a credential, click it.</i>
            </p>
        </div>
    );
};
