import React from 'react';
import { useIntl } from '@kano/kbc-intl';
import { ISignupUserType } from '../';

import messages from '../messages';

interface SignupStep0Props {
    nextStep: (step:number) => void;
    setUser: (user: ISignupUserType) => void;
}

export const SignupStep0 = ({ nextStep, setUser } : SignupStep0Props) => {
    const intl = useIntl();

    const advance = (user: ISignupUserType) => {
        setUser(user);
        nextStep(1);
    }

    return (
        <>
            <button className="kbc-auth__big-button" onClick={() => advance('creator')}>
                <span className="kbc-auth__big-button-text">{intl.formatMessage({ ...messages.imA })}</span>
                <span className="kbc-auth__big-button-text kbc-auth__big-button-text--large">{intl.formatMessage({ ...messages.creator })}</span>
            </button>

            <button className="kbc-auth__big-button kbc-auth__big-button--last" onClick={() => advance('parent')}>
                <span className="kbc-auth__big-button-text">{intl.formatMessage({ ...messages.imA })}</span>
                <span className="kbc-auth__big-button-text kbc-auth__big-button-text--large">{intl.formatMessage({ ...messages.parent })}</span>
            </button>
        </>
    );
};