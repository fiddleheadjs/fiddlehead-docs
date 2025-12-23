// cssClassPrefix: lP-

import {render} from 'fiddlehead';
import {AiMBA} from '../aimba/AiMBA';

window.aimbaLP = {
    render(root, props) {
        render(<AiMBA {...props} />, root);
    }
};
