import React, { useState, useEffect } from 'react';
import { KbcForm, KbcInput, kbcValidateEmail } from '@kano/kbc-forms';
import KbcButton from '@kano/kbc-button';
import { useIntl } from '@kano/kbc-intl';
import { RegionSelect } from './RegionSelect';

import messages from '../messages';

interface ParentStep2Props {
    setPassword: (password:string) => void;
    nextStep: (step:number) => void;
    password: string;
    email: string;
    setEmail: (email: string) => void;
    setRegion: (region: string) => void;
}

export const ParentStep2 = ({ setPassword, setEmail, setRegion, nextStep, password, email } : ParentStep2Props) => {
    const [tempPassword, setTempPassword] = useState(password || '');
    const [tempEmail, setTempEmail] = useState(email || '');
    const [tempRegion, setTempRegion] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [regionError, setRegionError] = useState(null);
    const [loading, setLoading] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        if (passwordError || emailError || regionError) {
            setPasswordError(null);
            setEmailError(null);
            setRegionError(null);
        }
    }, [tempEmail, tempRegion, tempPassword]);

    const updatePassword = (e:React.FormEvent<HTMLInputElement>) => {
        setTempPassword(e.currentTarget.value);
    }

    const updateEmail = (e:React.FormEvent<HTMLInputElement>) => {
        setTempEmail(e.currentTarget.value);
    }

    const advance = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        // Validation - password must be >= 8 characters
        if (tempPassword.length < 8) {
            setPasswordError(intl.formatMessage({ ...messages.tooShort }));
            setLoading(false);
            return;
        }

        // Validation - email is valid
        if (kbcValidateEmail(tempEmail)) {
            setEmailError(intl.formatMessage({ ...messages.validEmail }));
            setLoading(false);
            return;
        }

        // Validation - a region has been selected
        if (!tempRegion) {
            setRegionError(intl.formatMessage({ ...messages.regionError }));
            setLoading(false);
            return;
        }

        setPassword(tempPassword);
        setRegion(tempRegion);
        setEmail(tempEmail);
        setLoading(false);
        nextStep(4);
    }

    return (
        <>
            <h3 className="kbc-auth__sub-title">{intl.formatMessage({ ...messages.oneMoreStep })}</h3>
            <p>{intl.formatMessage({ ...messages.parentSetupAccountText })}</p>

            <KbcForm onSubmit={advance} classList="kbc-auth-signup__form">
                <KbcInput
                    classList="kbc-auth__input"
                    name="password"
                    inputType="password"
                    label={intl.formatMessage({ ...messages.theirPassword })}
                    placeholder={intl.formatMessage({ ...messages.theirPasswordPlaceholder })}
                    value={tempPassword}
                    onChange={updatePassword}
                    feedback={passwordError}
                    feedbackType={passwordError !== null ? 'invalid' : null}
                    onFocus={() => setPasswordError(null)}
                />
                <KbcInput
                    classList="kbc-auth__input"
                    name="email"
                    label={intl.formatMessage({ ...messages.yourEmailAddress })}
                    placeholder={intl.formatMessage({ ...messages.emailPlaceholder })}
                    value={tempEmail}
                    onChange={updateEmail}
                    feedback={emailError}
                    feedbackType={emailError !== null ? 'invalid' : null}
                    onFocus={() => setEmailError(null)}
                />

                <RegionSelect region={tempRegion} setRegion={setTempRegion} regionError={regionError} />

                <div className="kbc-auth-signup__form-footer">
                    <KbcButton text={intl.formatMessage({ ...messages.continue })} type="submit" loading={loading} classList="kbc-auth__button" />
                </div>
            </KbcForm>
        </>
    );
};