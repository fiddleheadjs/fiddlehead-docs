import {Logo} from '../pictogram';
import './TopBar.less';

export let TopBar = () => {
    return (
        <header class="TopBar">
            <div class="container">
                <div class="brand">
                    <a role="button" tabIndex="0" title="AiMBA" class="x-button" href="#">
                        <Logo />
                    </a>
                </div>
                <nav class="navigation" role="navigation">
                    <div class="links">
                        <a role="button" tabIndex="0" class="x-button" href="#CoreValues">Giá trị</a>
                        <a role="button" tabIndex="0" class="x-button" href="#LearningStrategy">Cách học</a>
                        <a role="button" tabIndex="0" class="x-button" href="#EcoSystem">Hệ sinh thái</a>
                        <a role="button" tabIndex="0" class="x-button" href="#Modules">Module</a>
                        <a role="button" tabIndex="0" class="x-button" href="#Enrollment">Ưu đãi</a>
                    </div>
                    <div class="actions">
                        <button type="button" tabIndex="0" class="x-button login">Đăng nhập</button>
                        <button type="button" tabIndex="0" class="x-button register">Đăng ký</button>
                    </div>
                </nav>
            </div>
        </header>
    );
};
