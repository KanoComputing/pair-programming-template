import React from 'react';
import KbcButton from '@kano/kbc-button';
import { useIntl } from '@kano/kbc-intl';

import messages from '../messages';

interface CreatorStep5Props {
    resendConsentEmail: () => void;
    closeAuth: () => void;
}

export const CreatorStep5 = ({ closeAuth, resendConsentEmail } : CreatorStep5Props) => {
    const intl = useIntl();

    return (
        <>
            <div className="kbc-auth-signup__success"></div>
            <h3 className="kbc-auth__sub-title">{intl.formatMessage({ ...messages.thanks })}</h3>
            <p className="kbc-auth-signup__ask-parents">{intl.formatMessage({ ...messages.askParents })}</p>
            <div className="kbc-auth-signup__buttons">
                <KbcButton classList="kbc-auth__button" onClick={closeAuth} text={intl.formatMessage({ ...messages.startCreating })} />
                <KbcButton classList="kbc-auth__button kbc-auth__button--small" color="light" text={intl.formatMessage({ ...messages.resendEmail })} onClick={resendConsentEmail} />
            </div>
        </>
    );
};