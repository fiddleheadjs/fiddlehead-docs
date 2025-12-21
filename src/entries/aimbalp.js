// cssClassPrefix: lP-

import {render} from 'fiddlehead';
import {AiMBA} from '../aimba/AiMBA';

globalThis.aimbaLP = {
    render(root, props) {
        render(<AiMBA {...props} />, root);
    }
};
