import {Logo} from '../pictogram';
import './TopBar.less';

export let TopBar = () => {
    return (
        <section class="TopBar">
            <div class="container">
                <div class="brand">
                    <Logo />
                </div>
                <div class="nav">
                    <div class="links">
                        <a href="#CoreValues">Giá trị</a>
                        <a href="#LearningStrategy">Cách học</a>
                        <a href="#EcoSystem">Hệ sinh thái</a>
                        <a href="#Modules">Module</a>
                        <a href="#Enrollment">Ưu đãi</a>
                    </div>
                    <div class="actions">
                        <button class="login" type="button">Đăng nhập</button>
                        <button class="signup" type="button">Đăng ký</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
