// lang: vi-VN
// title: AI MBA
// description: AI MBA
// themeColor: white

import {render} from 'fiddlehead';
import {AiMBA} from '../aimba/AiMBA';

globalThis.aimbaLP = {
    render(root, props) {
        render(<AiMBA {...props} />, root);
    }
};
