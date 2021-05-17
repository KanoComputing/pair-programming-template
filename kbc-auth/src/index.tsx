import React, { Component } from 'react';
import { KbcLoader } from '@kano/kbc-loader';
import { track } from '@kano/kbc-telemetry';
import { SafeAppNames } from '@kano/kbc-utils';
import { Login, Signup, UsernameReminder, PasswordReset, Verified } from './views';

import './styles/main.scss';

type IAuthView = 'signup' | 'login' | 'password' | 'username' | 'verified';

export type ISignupUserType = 'parent' | 'creator';
export interface ISignupForm {
    username: string;
    password: string;
    email: string;
    region: 'row' | 'usa' | 'jpn' | 'eur' | '';
    userType: 'parent' | 'creator';
    app?: SafeAppNames;
}

export interface IAuthSession {
    duration: string;
    token: string;
    user: {
        id: string;
        isAdmin: boolean;
        modified: string;
        roles: {
            roles: number[];
        }
    }
}

interface IKbcAuthProps {
    view?: IAuthView;
    register: (form: ISignupForm) => Promise<IAuthSession>;
    checkUsernameAvailability: (username: string) => Promise<boolean | undefined>;
    login: (username: string, password: string) => Promise<IAuthSession>;
    passwordReset: (username: string) => Promise<void>;
    usernameReminder: (email: string) => Promise<void>;
    onAuthSuccess: (successMethod: string, session?: IAuthSession, closeAuth?: boolean) => Promise<void>;
    allowSharing: () => Promise<void>;
    resendConsentEmail: () => Promise<void>;
    resendVerifyEmail: () => Promise<void>;
    closeAuth: () => void;
    openClubCheckout: () => void;
    userVerifyUrl?: string;
    memberDashboardUrl: string;
    clubUrl: string;
    tracking?: any;
}

export interface IKbcAuthForm extends IKbcAuthProps {
    loaded: () => void;
    setView: (view: IAuthView) => void;
    closeAuth: () => void;
}

interface IKbcAuthState {
    loading: boolean;
    activeView: IAuthView;
    session?: any;
    signUpProgress?: {
        step: number;
        user?: ISignupUserType;
    }
}

@track({ module: 'kbc-auth' })
class KbcAuthComp extends Component<IKbcAuthProps, IKbcAuthState> {

    constructor(props: IKbcAuthProps) {
        super(props);

        this.state = {
            loading: true,
            activeView: props.view || 'login',
        }
    }

    componentDidMount() {
        this.props.tracking.trackEvent({ event: `auth_opened_${this.state.activeView}` });
    }

    loaded = () => {
        this.setState({ loading: false });
    }

    setView = (view: IAuthView) => {
        this.setState({ activeView: view });
    }

    setSession = (session: any) => {
        this.setState({ session });
    }

    closeAuthWithSuccess = () => {
        const { signUpProgress } = this.state;

        if (signUpProgress) {
            this.props.tracking.trackEvent({ event: `auth_closed`, data: { signUpStep: signUpProgress.step, userType: signUpProgress.user } });
        } else {
            this.props.tracking.trackEvent({ event: `auth_closed` });
        }

        this.props.closeAuth();
    }

    updateSignUpProgress = (step: number, user?: ISignupUserType) => {
        this.setState({
            signUpProgress: {
                step,
                user,
            }
        });
    }

    render() {
        const { loading, activeView } = this.state;

        return (
            <>
                <div className="kbc-auth-wrapper">
                    <div className={`kbc-auth kbc-auth--${activeView}`}>
                        {loading && <div className="kbc-auth__loading"><KbcLoader /></div>}

                        {activeView === 'login' && <Login loaded={this.loaded} setView={this.setView} {...this.props} />}
                        {activeView === 'signup' && <Signup loaded={this.loaded} setView={this.setView} closeAuthWithSuccess={this.closeAuthWithSuccess} setSession={this.setSession} updateProgress={this.updateSignUpProgress} {...this.props} />}
                        {activeView === 'password' && <PasswordReset loaded={this.loaded} setView={this.setView} {...this.props} />}
                        {activeView === 'username' && <UsernameReminder loaded={this.loaded} setView={this.setView} {...this.props} />}
                        {activeView === 'verified' && <Verified loaded={this.loaded} setView={this.setView} {...this.props} />}
                    </div>
                    <div className="kbc-auth-mask" onClick={this.closeAuthWithSuccess}></div>
                </div>
            </>
        );
    }
}

export const KbcAuth = KbcAuthComp;