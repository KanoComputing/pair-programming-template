import React, { useEffect, useState } from 'react';
import { KbcInput, KbcForm, kbcValidateEmail } from '@kano/kbc-forms';
import KbcButton from '@kano/kbc-button';
import { KbcIcon } from '@kano/kbc-icons';
import { useIntl } from '@kano/kbc-intl';
import { IKbcAuthForm } from '..';

import messages from '../messages';

const UsernameReminderComp = ({ loaded, setView, usernameReminder } : IKbcAuthForm) => {
    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState('');
    const intl = useIntl();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (kbcValidateEmail(email)) {
            setFormError(intl.formatMessage({ ...messages.validEmail }));
            return;
        }

        usernameReminder(email)
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
    }, [email]);

    useEffect(() => {
        loaded();
    }, []);

    return (
        <div className="kbc-auth__container">
            <h2 className="kbc-auth__title kbc-auth__title--indent">{intl.formatMessage({ ...messages.forgotYourUsername })}</h2>
            <p>{intl.formatMessage({ ...messages.forgotUsernameText })}</p>

            <KbcForm onSubmit={submit}>
                <KbcInput
                    name="email"
                    label={intl.formatMessage({ ...messages.enterEmail })}
                    placeholder={intl.formatMessage({ ...messages.emailPlaceholder })}
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
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


export const UsernameReminder = UsernameReminderComp;