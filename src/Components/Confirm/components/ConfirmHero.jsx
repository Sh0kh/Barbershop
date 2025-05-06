import { NavLink } from "react-router-dom";
import ConfirmSer from "./ConfrimSer";
import ConfirmAdress from "./ConfrimAdress";
import { useTranslation } from 'react-i18next';

export default function ConfrimHero() {
    const { t, i18n } = useTranslation();

    return (
        <section>
            <div className="logo_end">
                <div className="confrim_firts">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path fill="currentColor" d="m14.83 4.89l1.34.94l-5.81 8.38H9.02L5.78 9.67l1.34-1.25l2.57 2.4z" />
                    </svg>
                    {t('done3')}
                </div>

                <div className="confrim_content">
                    <h1>{t('day-after')} </h1>
                    <h2>10:30 - 11:30</h2>
                </div>

                <NavLink to="/barberinfo">
                    <div className="confrim_acc">
                        <div className="w-[48px] h-[48px]">
                            <img
                                className="end_foto w-[100%] h-[100%]"
                                src="https://assets.alteg.io/masters/origin/c/c7/c7b84d425a2b8eb_20250410181807.png"
                                alt=""
                            />
                        </div>
                        <div>
                            <h1>Farxad (Farxad)</h1>
                            <p>{t('Barber')}</p>
                        </div>
                    </div>
                </NavLink>
            </div>

            <ConfirmSer />

            <div className="buy_pin">
                <div>
                    <h1>
                    {t('service1')}
                    </h1>
                    <p>
                    {t('service-2')}
                    </p>
                    <span>1 {t('hour')}</span>
                </div>
                <p>180 000 so'm</p>
            </div>

            <ConfirmAdress />
        </section>
    );
}