import React, { useState, useEffect } from 'react';
import { KbcForm, KbcInput, kbcValidateEmail } from '@kano/kbc-forms';
import KbcButton from '@kano/kbc-button';
import { useIntl } from '@kano/kbc-intl';
import { RegionSelect } from './RegionSelect';
import messages from '../messages';

interface CreatorStep3Props {
    setEmail: (email:string) => void;
    setRegion: (region:string) => void;
    nextStep: (step:number) => void;
}

export const CreatorStep3 = ({ setEmail, nextStep, setRegion } : CreatorStep3Props) => {
    const [tempEmail, setTempEmail] = useState('');
    const [tempRegion, setTempRegion] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [regionError, setRegionError] = useState(null);

    const intl = useIntl();

    useEffect(() => {
        if (emailError || regionError) {
            setEmailError(null);
            setRegionError(null);
        }
    }, [tempEmail, tempRegion]);

    const advance = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation - email is valid
        if (kbcValidateEmail(tempEmail)) {
            setEmailError(intl.formatMessage({ ...messages.validEmail }));
            return;
        }

        // Validation - a region has been selected
        if (!tempRegion) {
            setRegionError(intl.formatMessage({ ...messages.regionError }));
            return;
        }

        setRegion(tempRegion);
        setEmail(tempEmail);
        nextStep(4);
    }

    return (
        <>
            <h3 className="kbc-auth__sub-title">{intl.formatMessage({ ...messages.parentsEmailTitle })}</h3>
            <p>{intl.formatMessage({ ...messages.parentsEmailText })}</p>

            <KbcForm onSubmit={advance} classList="kbc-auth-signup__form">
                <KbcInput
                    classList="kbc-auth__input"
                    name="email"
                    inputType="text"
                    label={intl.formatMessage({ ...messages.parentsEmailLabel })}
                    placeholder={intl.formatMessage({ ...messages.emailPlaceholder })}
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.currentTarget.value) }
                    feedback={emailError}
                    feedbackType={emailError !== null ? 'invalid' : null}
                    onFocus={() => setEmailError(null)}
                />

                <RegionSelect region={tempRegion} setRegion={setTempRegion} regionError={regionError} />

                <div className="kbc-auth-signup__form-footer">
                    <KbcButton classList="kbc-auth__button" text={intl.formatMessage({ ...messages.continue })} type="submit" />
                </div>
            </KbcForm>
        </>
    );
};