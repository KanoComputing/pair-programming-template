import React, { useEffect, useState } from 'react';
import { KbcInput, KbcForm } from '@kano/kbc-forms';
import KbcButton from '@kano/kbc-button';
import { KbcIcon } from '@kano/kbc-icons';
import { useIntl } from '@kano/kbc-intl';
import { IKbcAuthForm } from '..';

import messages from '../messages';

const PasswordResetComp = ({ loaded, setView, passwordReset } : IKbcAuthForm) => {
    const [username, setUsername] = useState('');
    const [formError, setFormError] = useState('');
    const intl = useIntl();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === '') {
            setFormError(intl.formatMessage({ ...messages.usernameRequired }));
            return;
        }

        passwordReset(username)
            .then(() => {
                // Switch to login dialog...
                setView('login');
            })
            .catch(() => {
                setFormError(intl.formatMessage({ ...messages.tryAgain }));
            });
    };

    useEffect(() => {
        if (formError) {
            setFormError(null);
        }
    }, [username]);

    useEffect(() => {
        loaded();
    }, []);

    return (
        <div className="kbc-auth__container">
            <h2 className="kbc-auth__title kbc-auth__title--indent">{intl.formatMessage({ ...messages.forgotYourPassword })}</h2>
            <p>{intl.formatMessage({ ...messages.forgotPasswordText })}</p>

            <KbcForm onSubmit={submit}>
                <KbcInput
                    name="username"
                    label={intl.formatMessage({ ...messages.enterYourUsername })}
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    classList="kbc-auth__input"
                    feedback={formError}
                    feedbackType={formError !== null ? 'invalid' : null}
                    onFocus={() => setFormError(null)}
                />

                <KbcButton text={intl.formatMessage({ ...messages.continue })} type="submit" classList="kbc-auth__button" />
            </KbcForm>

            <button onClick={() => setView('login')} className={`kbc-auth__back-button`}><KbcIcon name="ArrowCircleLeft" size="base" /><span className="sr-only">{intl.formatMessage({ ...messages.back })}</span></button>
        </div>
    );
};


export const PasswordReset = PasswordResetComp;