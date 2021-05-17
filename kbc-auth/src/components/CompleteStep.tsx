import React from 'react';
import KbcButton from '@kano/kbc-button';
import { useIntl } from '@kano/kbc-intl';
import { Email } from '@kano/kbc-icons';

import messages from '../messages';

interface CompleteStepProps {
    resendConsentEmail: () => void;
    resendVerifyEmail: () => void;
    closeAuth: (session: any) => void;
    user: 'creator' | 'parent';
}

export const CompleteStep = ({ closeAuth, resendConsentEmail, resendVerifyEmail, user } : CompleteStepProps) => {
    const intl = useIntl();

    const resendEmails = () => {
        if (user === 'creator') {
            resendConsentEmail();
        } else {
            resendVerifyEmail();
        }
    }

    return (
        <>
            <div className="kbc-auth-signup__success">
                <Email />
            </div>
            <h3 className="kbc-auth__sub-title">{intl.formatMessage({ ...messages.thanks })}</h3>
            <p className="kbc-auth-signup__ask-parents">{user === 'creator' ? intl.formatMessage({ ...messages.creatorCompleteText }) : intl.formatMessage({ ...messages.parentCompleteText })}</p>
            <div className="kbc-auth-signup__buttons">
                <KbcButton classList="kbc-auth__button" onClick={closeAuth} text={intl.formatMessage({ ...messages.startCreating })} />
                <KbcButton classList="kbc-auth__button kbc-auth__button--small" color="light" text={intl.formatMessage({ ...messages.resendEmail })} onClick={resendEmails} />
            </div>
        </>
    );
};