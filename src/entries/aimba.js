// lang: vi-VN
// title: AI MBA
// description: AI MBA
// themeColor: white
// inlinesJs: prod
// inlinesCss: prod
// cssClassPrefix: lP-

import {render} from 'fiddlehead';
import {AiMBA} from '../aimba/AiMBA';
import {sampleConfig} from '../aimba/sampleConfig';
import '../aimba/common.less';

render(<AiMBA {...sampleConfig} />, document.getElementById('root'));
