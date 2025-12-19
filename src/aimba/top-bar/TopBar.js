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
                        <a class="x-button" href="#CoreValues">Giá trị</a>
                        <a class="x-button" href="#LearningStrategy">Cách học</a>
                        <a class="x-button" href="#EcoSystem">Hệ sinh thái</a>
                        <a class="x-button" href="#Modules">Module</a>
                        <a class="x-button" href="#Enrollment">Ưu đãi</a>
                    </div>
                    <div class="actions">
                        <button type="button" class="x-button login">Đăng nhập</button>
                        <button type="button" class="x-button signup">Đăng ký</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
