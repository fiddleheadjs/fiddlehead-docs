import {Logo} from '../logo/Logo';
import './TopBar.less';

export let TopBar = () => {
    return (
        <div class="TopBar">
            <div class="container">
                <Logo />
                <div class="nav">
                    <a>Giá trị</a>
                    <a>Cách học</a>
                    <a>Hệ sinh thái</a>
                    <a>Module</a>
                    <a>Ưu đãi</a>
                    <button class="login">Đăng nhập</button>
                    <button class="signup">Đăng ký</button>
                </div>
            </div>
        </div>
    );
};
