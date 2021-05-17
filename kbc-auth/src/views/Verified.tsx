import React, { useEffect, useState } from 'react';
import { useIntl } from '@kano/kbc-intl';
import { KbcIcon, ClubNew } from '@kano/kbc-icons';
import KbcButton from '@kano/kbc-button';
import { IKbcAuthForm } from '..';

// @ts-ignore
import clubBackground from '../assets/club-background.png';

import messages from '../messages';

export const Verified = ({ loaded, userVerifyUrl, allowSharing, memberDashboardUrl, openClubCheckout, clubUrl, tracking } : IKbcAuthForm) => {
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        loaded();
    }, []);

    const updateShareSetting = () => {
        setLoading(true);

        allowSharing().then((res) => {
            setLoading(false);
            setAllowed(true);
        }).catch(err => {
            console.log('err', err);
        });
    }

    const openCheckout = () => {
        setCheckoutLoading(true);
        openClubCheckout();
    }

    const openMemberDashboard = () => {
        tracking.trackEvent({ event: 'auth_verify_open_member_dashboard' });
        window.open(`${memberDashboardUrl}/consent${userVerifyUrl}`);
    }

    const openClubSite = () => {
        tracking.trackEvent({ event: 'auth_verify_open_club_website' });
        window.open(clubUrl);
    }

    return (
        <div className="kbc-auth__container">
            <h2 className="kbc-auth__title"><KbcIcon name="Tick" color="green" size="base" classList="kbc-auth__verified-icon" />{intl.formatMessage({ ...messages.oneMoreThing })}</h2>

            <div className="kbc-auth__guardian-settings">
                <h3 className="kbc-auth__sub-title">{intl.formatMessage({ ...messages.grantPermission })}</h3>
                <p>{intl.formatMessage({ ...messages.sharingText })}</p>
                <div className="kbc-auth-signup__buttons">
                    <KbcButton classList={`kbc-auth__button${allowed ? ' kbc-auth__button--icon' : ''}`} icon={allowed && 'Tick'} color={allowed ? 'green' : 'orange'} onClick={!allowed && updateShareSetting} loading={loading} text={allowed ? intl.formatMessage({ ...messages.sharingAllowed }) : intl.formatMessage({ ...messages.allowSharing })} />

                    <KbcButton classList="kbc-auth__button kbc-auth__button--small" color="light" text={intl.formatMessage({ ...messages.allSettings })} onClick={openMemberDashboard} />
                </div>
            </div>

            <div className="kbc-auth__club-promo" style={{backgroundImage: `url(${clubBackground})`}}>
                <ClubNew width={64} height={83} className="kbc-auth__club-icon" />
                <h2 className="kbc-auth__club-promo-title">{intl.formatMessage({ ...messages.clubPromoTitle })}</h2>
                <p className="kbc-auth__club-promo-text">{intl.formatMessage({ ...messages.clubPromoText })}</p>

                <ul>
                    <li><KbcIcon name="Tick" color="green" classList="kbc-auth__icon-background" /> {intl.formatMessage({ ...messages.clubPromoBullet1 })}</li>
                    <li><KbcIcon name="Tick" color="green" classList="kbc-auth__icon-background" /> {intl.formatMessage({ ...messages.clubPromoBullet2 })}</li>
                    <li><KbcIcon name="Tick" color="green" classList="kbc-auth__icon-background" /> {intl.formatMessage({ ...messages.clubPromoBullet3 })}</li>
                </ul>

                <div className="kbc-auth-signup__buttons">
                    <KbcButton classList="kbc-auth__button" color="club-coral" onClick={openCheckout} loading={checkoutLoading} text={intl.formatMessage({ ...messages.subscribeToClub })} />

                    <KbcButton classList="kbc-auth__button kbc-auth__button--small" color="light" text={intl.formatMessage({ ...messages.learnMore })} onClick={openClubSite} />
                </div>
            </div>
        </div>
    );
};