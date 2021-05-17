import React, { useEffect, useState } from 'react';
import { useIntl } from '@kano/kbc-intl';
import { KbcForm, KbcInput } from '@kano/kbc-forms';
import { KbcIcon } from '@kano/kbc-icons';
import KbcButton from '@kano/kbc-button';
import { generateNames, splitName } from '../utils/usernameGenerator';

import messages from '../messages';

interface SignupStep1Props {
    setUsername: (username:string) => void;
    nextStep: (step:number) => void;
    username: string;
    checkUsername: (username: string) => Promise<boolean | undefined>;
    user: 'creator' | 'parent';
}

const SignupStep1Comp = ({ setUsername, nextStep, username, checkUsername, user } : SignupStep1Props) => {
    const [names, setNames] = useState(null);
    const [newNames, setNewNames] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [tempUsername, setTempUsername] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [loading, setLoading] = useState(false);
    const intl = useIntl();

    let timeout : NodeJS.Timeout = null;

    const randomise = () => {
        if (timeout) clearTimeout(timeout);
        setUsernameError(null);
        setNewNames(generateNames());
    }

    useEffect(() => {
        if (newNames !== names) {
            setAnimating(true);
            setTempUsername(`${newNames.verb}${newNames.noun}${newNames.number}`);

            timeout = setTimeout(() => {
                setNames(newNames);
                setAnimating(false);
            }, 300);
        }

        return () => clearTimeout(timeout);
    }, [newNames, names]);

    useEffect(() => {
        if (!username) {
            setNewNames(generateNames());
            return;
        }

        const split = splitName(username);

        if (typeof split === 'object') {
            setNewNames(split);
        } else {
            setNewNames(null);
            setNames(null);
            setTempUsername(username);
        }
    }, []);

    const updateUsername = (e: React.FormEvent<HTMLInputElement>) => {
        // reset username error
        if (usernameError) {
            setUsernameError(null);
        }

        setTempUsername(e.currentTarget.value);
    }

    const advance = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        // Validation - username is not empty
        if (tempUsername === '') {
            setUsernameError(intl.formatMessage({ ...messages.usernameRequired }));
            setLoading(false);
            return;
        }

        // Validation - username is > 3 characters
        if (tempUsername.length < 4) {
            setLoading(false);
            setUsernameError(intl.formatMessage({ ...messages.tooShort }));
            return;
        }

        // Validation - username is not taken and valid (API call - reject has special case for invalid names)
        const usernameIsInvalid = await checkUsername(tempUsername)
            .catch((res : string) => {
                setLoading(false);
                setUsernameError(intl.formatMessage({ ...messages.usernameInvalid }));
                return true; // returns undefined if not caught
            });

        if (usernameIsInvalid) {
            setLoading(false);
            return;
        }

        setUsername(tempUsername);
        nextStep(2);
    }

    return (
        <>
            <h3 className="kbc-auth__sub-title">
                {user === 'creator' ?
                    intl.formatMessage({ ...messages.creator_usernameTitle }) :
                    intl.formatMessage({ ...messages.parent_usernameTitle })
                }
            </h3>
            <p>
                {user === 'creator' ?
                    intl.formatMessage({ ...messages.creator_usernameIntro }) :
                    intl.formatMessage({ ...messages.parent_usernameIntro })
                }
            </p>

            <KbcForm onSubmit={advance} classList="kbc-auth-signup__form">
                <div className="kbc-auth-username">
                    <KbcInput
                        name="username"
                        inputType="text"
                        label={user === 'creator' ? intl.formatMessage({ ...messages.creator_usernameLabel }) : intl.formatMessage({ ...messages.parent_usernameLabel })}
                        value={tempUsername}
                        onChange={updateUsername}
                        classList="kbc-auth__input kbc-auth__input--username"
                        feedback={usernameError}
                        feedbackType={usernameError !== null ? 'invalid' : null}
                        onFocus={() => setUsernameError(null)}
                    />

                    <div className="kbc-auth-username__randomiser">
                        <button type="button" onClick={randomise} className="kbc-auth-username__random">
                            <KbcIcon name="Reset" color="white" size="mid" />
                        </button>
                        {newNames &&
                        <>
                            <div className={`kbc-auth-username__part kbc-auth-username__part--verb${animating ? ' kbc-auth-username__part--animating' : ''}`}>
                                {newNames && <span className="name-new">{newNames.verb}</span>}
                                {names && <span className="name-old">{names.verb}</span>}
                            </div>
                            <div className={`kbc-auth-username__part kbc-auth-username__part--noun${animating ? ' kbc-auth-username__part--animating' : ''}`}>
                                {newNames && <span className="name-new">{newNames.noun}</span>}
                                {names && <span className="name-old">{names.noun}</span>}
                            </div>
                            <div className={`kbc-auth-username__part kbc-auth-username__part--number${animating ? ' kbc-auth-username__part--animating' : ''}`}>
                                {newNames && <span className="name-new">{newNames.number}</span>}
                                {names && <span className="name-old">{names.number}</span>}
                            </div>
                        </>}
                    </div>
                </div>
                <div className="kbc-auth-signup__form-footer">
                    <KbcButton text="Continue" type="submit" loading={loading} classList="kbc-auth__button" />
                </div>
            </KbcForm>
        </>
    );
};

export const SignupStep1 = SignupStep1Comp;