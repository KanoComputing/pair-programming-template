import React, { useEffect, useState } from 'react';
import { KbcIcon } from '@kano/kbc-icons';
import { SignupStep0, SignupStep1, CreatorStep2, CreatorStep3, ParentStep2, CompleteStep } from '../components';
import { KbcLoader } from '@kano/kbc-loader';
import { useIntl } from '@kano/kbc-intl';
import { IKbcAuthForm, ISignupUserType } from '..';

import messages from '../messages';

interface ISignupComp extends IKbcAuthForm {
    setSession: (session: any) => void;
    closeAuthWithSuccess: (session: any) => void;
    updateProgress: (step: number, user: ISignupUserType) => void;
}

const SignupComp = ({ loaded, setSession, setView, closeAuthWithSuccess, register, checkUsernameAvailability, resendConsentEmail, resendVerifyEmail, tracking, updateProgress, onAuthSuccess } : ISignupComp) => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [region, setRegion] = useState(null);
    const [registering, setRegistering] = useState(false);
    const [user, setUser] = useState(null);
    const intl = useIntl();

    const registerSubmit = () => {
        setRegistering(true);
        register({username, password, email, region, userType: user})
            .then((res: any) => {
                setSession(res);
                onAuthSuccess('signup', res);
                tracking.trackEvent({ event: 'auth_signup_registered', data: { username }});
                setStep(5);
                setRegistering(false);
            });
    }

    useEffect(() => {
        updateProgress(step, user);

        if (step === 4 && !registering) {
            registerSubmit();
            return;
        }

        tracking.trackEvent({ event: 'auth_signup_step', data: { stepNumber: step, userType: user, username: username }});
    }, [step, registering, username, user]);

    useEffect(() => {
        loaded();
    }, []);

    const back = () => {
        if (step !== 0) {
            setStep(step - 1);
        }
    }

    return (
        <div className={`kbc-auth-signup${step !== 0 ? ' kbc-auth-signup--fixed-height' : ''}`}>
            <h2 className="kbc-auth__title kbc-auth__title--indent">
                {step !== 5 ? intl.formatMessage({ ...messages.signUp }) : user === 'creator' ? intl.formatMessage({ ...messages.complete }) : intl.formatMessage({ ...messages.confirmEmail })}
            </h2>
            {registering && <KbcLoader />}

            {step === 0 && <SignupStep0 nextStep={setStep} setUser={setUser} />}
            {step === 1 && <SignupStep1 setUsername={setUsername} nextStep={setStep} username={username} checkUsername={checkUsernameAvailability} user={user} />}

            {user === 'creator' && step === 2 && <CreatorStep2 setPassword={setPassword} nextStep={setStep} username={username} password={password} />}
            {user === 'creator' && step === 3 && <CreatorStep3 setEmail={setEmail} nextStep={setStep} setRegion={setRegion} />}

            {user === 'parent' && step === 2 && <ParentStep2 setPassword={setPassword} nextStep={setStep} email={email} password={password} setEmail={setEmail} setRegion={setRegion} />}

            {step === 5 && <CompleteStep closeAuth={closeAuthWithSuccess} resendConsentEmail={resendConsentEmail} resendVerifyEmail={resendVerifyEmail} user={user} />}

            {step !== 5 &&
                <div className="kbc-auth__login-text">
                    <p>{intl.formatMessage({ ...messages.alreadyHaveAccount })} <button className="kbc-auth__button-link" onClick={() => setView('login')}>{intl.formatMessage({ ...messages.login })}</button></p>
                </div>
            }

            {step !== 5 ?
                <button onClick={back} className={`kbc-auth__back-button ${step === 0 ? 'kbc-auth__back-button--inactive' : ''}`} disabled={step === 0}><KbcIcon name="ArrowCircleLeft" size="base" /><span className="sr-only">{intl.formatMessage({ ...messages.back })}</span></button>
                : <KbcIcon name="Tick" color="green" size="base" classList={`kbc-auth__back-button`} />}


            <a href="https://world.kano.me/privacy-policy" className="kbc-auth__privacy-link" style={{ display: step === 0 || step === 5 ? 'none' : 'block'}}>{intl.formatMessage({ ...messages.privacyPolicy })}</a>
        </div>
    )
}

export const Signup = SignupComp;