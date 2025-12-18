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
                        <a>Giá trị</a>
                        <a>Cách học</a>
                        <a>Hệ sinh thái</a>
                        <a>Module</a>
                        <a>Ưu đãi</a>
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
