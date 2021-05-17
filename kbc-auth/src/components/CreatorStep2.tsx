import React, { useState } from 'react';
import { KbcForm, KbcInput } from '@kano/kbc-forms';
import KbcButton from '@kano/kbc-button';
import { useIntl } from '@kano/kbc-intl';

import messages from '../messages';

interface CreatorStep2Props {
    setPassword: (password:string) => void;
    nextStep: (step:number) => void;
    password: string;
    username: string;
}

export const CreatorStep2 = ({ setPassword, nextStep, password, username } : CreatorStep2Props) => {
    const [tempPassword, setTempPassword] = useState(password || '');
    const [formError, setFormError] = useState(null);
    const intl = useIntl();

    const updatePassword = (e:React.FormEvent<HTMLInputElement>) => {
        if (formError) {
            setFormError(null);
        }

        setTempPassword(e.currentTarget.value);
    }

    const advance = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation - password must be >= 8 characters
        if (tempPassword.length < 8) {
            setFormError(intl.formatMessage({ ...messages.tooShort }));
            return;
        }

        setPassword(tempPassword);
        nextStep(3);
    }

    return (
        <>
            <h3 className="kbc-auth__sub-title">{intl.formatMessage({ ...messages.welcomeToKano })}</h3>
            <h4 className="kbc-auth-signup__username">{username}</h4>
            <p>{intl.formatMessage({ ...messages.creatorSetupPassword })}</p>

            <KbcForm onSubmit={advance} classList="kbc-auth-signup__form">
                <KbcInput
                    classList="kbc-auth__input"
                    name="password"
                    inputType="password"
                    label={intl.formatMessage({ ...messages.creatorPasswordLabel })}
                    placeholder={intl.formatMessage({ ...messages.creatorPasswordPlacedholder })}
                    value={tempPassword}
                    onChange={updatePassword}
                    feedback={formError}
                    feedbackType={formError !== null ? 'invalid' : null}
                />

                <div className="kbc-auth-signup__form-footer">
                    <KbcButton text={intl.formatMessage({ ...messages.continue })} type="submit" classList="kbc-auth__button" />
                </div>
            </KbcForm>
        </>
    );
};