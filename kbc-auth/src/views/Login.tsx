import React, { useEffect, useState } from 'react';
import { KbcForm, KbcInput } from '@kano/kbc-forms';
import KbcButton from '@kano/kbc-button';
import { useIntl } from '@kano/kbc-intl';
import { IKbcAuthForm, IAuthSession } from '..';

import messages from '../messages';

const LoginComp = ({ loaded, setView, login, onAuthSuccess } : IKbcAuthForm) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [formError, setFormError] = useState(null);
    const intl = useIntl();

    const loginSubmit = (e:any) => {
        e.preventDefault();
        setLoading(true);

        // Validation - username is not empty
        if (username === '') {
            setUsernameError(intl.formatMessage({ ...messages.usernameRequired }));
            setLoading(false);
            return;
        }

        // Validation - username is not empty
        if (password === '') {
            setPasswordError(intl.formatMessage({ ...messages.passwordRequired }));
            setLoading(false);
            return;
        }

        login(username, password)
            .then((session: IAuthSession) => {
                setLoading(false);
                onAuthSuccess('login', session, true);
            })
            .catch((err) => {
                setLoading(false);
                setFormError(err.message);
            });
    }

    useEffect(() => {
        if (passwordError || usernameError || formError) {
            setPasswordError(null);
            setUsernameError(null);
            setFormError(null);
        }
    }, [username, password]);

    useEffect(() => {
        loaded();
    }, []);

    return (
        <div className="kbc-auth__container">
            <h2 className="kbc-auth__title">{intl.formatMessage({ ...messages.login })}</h2>
            <KbcForm onSubmit={loginSubmit} feedback={formError} feedbackType={formError !== null ? 'invalid' : null}>
                <KbcInput
                    label={intl.formatMessage({ ...messages.username })}
                    name="username"
                    placeholder={intl.formatMessage({ ...messages.enterYourUsername })}
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    classList="kbc-auth__input"
                    feedback={usernameError}
                    feedbackType={usernameError !== null ? 'invalid' : null}
                />

                <KbcInput
                    label={intl.formatMessage({ ...messages.password })}
                    name="password"
                    placeholder={intl.formatMessage({ ...messages.enterYourPassword })}
                    inputType="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    classList="kbc-auth__input"
                    feedback={passwordError}
                    feedbackType={passwordError !== null ? 'invalid' : null}
                />

                <KbcButton text={intl.formatMessage({ ...messages.login })} type="submit" loading={loading} classList="kbc-auth__button kbc-auth__button--login" />
            </KbcForm>

            <p className="kbc-auth__forgot-text">{intl.formatMessage({ ...messages.forgotYour })} <button className="kbc-auth__button-link kbc-auth__button-link--inline" onClick={() => setView('username')}>{intl.formatMessage({ ...messages.username })}</button> {intl.formatMessage({ ...messages.or })} <button className="kbc-auth__button-link kbc-auth__button-link--inline" onClick={() => setView('password')}>{intl.formatMessage({ ...messages.password })}</button>?</p>

            <div className="kbc-auth__login-text">
                <p>{intl.formatMessage({ ...messages.noAccount })} <button className="kbc-auth__button-link" onClick={() => setView('signup')}>{intl.formatMessage({ ...messages.signUp })}</button></p>
            </div>
        </div>
    )
};


export const Login = LoginComp;