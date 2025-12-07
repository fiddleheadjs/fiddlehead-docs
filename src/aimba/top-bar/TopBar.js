import {Logo} from '../pictogram';
import './TopBar.less';

export let TopBar = () => {
    return (
        <section class="TopBar">
            <div class="container">
                <Logo />
                <div class="nav">
                    <a>Giá trị</a>
                    <a>Cách học</a>
                    <a>Hệ sinh thái</a>
                    <a>Module</a>
                    <a>Ưu đãi</a>
                    <button class="login" type="button">Đăng nhập</button>
                    <button class="signup" type="button">Đăng ký</button>
                </div>
            </div>
        </section>
    );
};
