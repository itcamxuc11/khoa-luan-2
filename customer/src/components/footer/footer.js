import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="content">
                    <div className="footer__top-part">
                        <div className="footer__main">
                            <div className="footer__logo-container"><a href="/"><img className="footer__logo" src="/images/logo_web.png" alt="Doof Tsaf" /></a>
                                <div className="select"><select name="language" className="select__input">
                                    <option value="vi">Tiếng Việt</option>
                                </select><img className="select__icon" src="/images/world.svg" alt="select icon" /><img className="select__arrow" src="/images/if_icon-ios7-arrow-back_211686.svg" alt="arrow down" /></div>
                            </div>
                            <div className="footer__mobile-apps"><a href="https://play.google.com/store/apps/details?id=com .ubercab.eats&referrer=mat_click_id%3D7056afe65227473 9b3ef74d2aa740491-20191103-7336%26link_click_id%3D719 550996128553076&mat_click_id=7056afe652274739b3ef74d2 aa740491-20191103-7336 " className="footer__mobile-app"><img src="/images/Google.svg" alt="App Store" /></a><a href="https://play.google.com/store/apps/details?id=com .ubercab.eats&referrer=mat_click_id%3D7056afe65227473 9b3ef74d2aa740491-20191103-7336%26link_click_id%3D719 550996128553076&mat_click_id=7056afe652274739b3ef74d2 aa740491-20191103-7336 " className="footer__mobile-app"><img src="/images/Apple.svg" alt="Google Play" /></a></div>
                        </div>
                        <div className="footer__top-links links"><a href="#" className="links__link links__link--intended">Giới thiệu</a><a href="#" className="links__link">Blog</a><a href="#" className="links__link">Đăng ký shipper</a><a href="#" className="links__link">Đăng ký mở quán</a></div>
                        <div className="footer__top-links links"><a href="#" className="links__link links__link--intended">Trợ giúp</a><a href="#" className="links__link">FAQs</a></div>
                    </div>
                    <div className="footer__bottom-part">
                        <p className="footer__copyright">- 2020 Doof Tsaf.</p>
                        <div className="footer__misc">
                            <div className="footer__bottom-links links"><a href="#" className="links__link">Privacy policy</a><a href="#" className="links__link">Terms of use</a><a href="#" className="links__link">Pricing</a></div>
                            <div className="footer__social social"><a href="#" className="social__link"><img src="/images/twitter.svg" alt="facebook" /></a><a href="#" className="social__link"><img src="/images/instagram.svg" alt="twitter" /></a><a href="#" className="social__link"><img src="/images/Group (4).svg" alt="instagram" /></a></div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
