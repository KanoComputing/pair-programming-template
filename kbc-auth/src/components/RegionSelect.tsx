import React from 'react';
import { KbcIcon } from '@kano/kbc-icons';
import { useIntl } from '@kano/kbc-intl';

import messages from '../messages';

interface RegionSelectProps {
    setRegion: (region:string) => void;
    region: string;
    regionError: string;
}

export const RegionSelect = ({ setRegion, region, regionError } : RegionSelectProps) => {
    const intl = useIntl();

    return (
        <>
            <h4 className="kbc-auth-signup__label">{intl.formatMessage({ ...messages.region })}</h4>

            <div className="kbc-auth-signup__region kbc-input">
                <input type="radio" id="region-us" name="region" value="usa" checked={region === 'usa'} onChange={(e) => setRegion(e.target.value)} />
                <label className="kbc-auth__radio" htmlFor="region-us">{region === 'usa' && <KbcIcon name="Tick" color="green" />}{intl.formatMessage({ ...messages.usa })}</label>

                <input type="radio" id="region-jp" name="region" value="jpn" checked={region === 'jpn'} onChange={(e) => setRegion(e.target.value)} />
                <label className="kbc-auth__radio" htmlFor="region-jp">{region === 'jpn' && <KbcIcon name="Tick" color="green" />}{intl.formatMessage({ ...messages.japan })}</label>

                <input type="radio" id="region-eu" name="region" value="eur" checked={region === 'eur'} onChange={(e) => setRegion(e.target.value)} />
                <label className="kbc-auth__radio" htmlFor="region-eu">{region === 'eur' && <KbcIcon name="Tick" color="green" />}{intl.formatMessage({ ...messages.europe })}</label>

                <input type="radio" id="region-other" name="region" value="row" checked={region === 'row'} onChange={(e) => setRegion(e.target.value)} />
                <label className="kbc-auth__radio" htmlFor="region-other">{region === 'row' && <KbcIcon name="Tick" color="green" />}{intl.formatMessage({ ...messages.other })}</label>

                <span className={`control__feedback control__feedback--invalid${regionError ? ' control__feedback--show' : ''}`}>{regionError}</span>
            </div>
        </>
    );
};