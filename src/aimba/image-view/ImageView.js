import {Aspect} from '../aspect';
import './ImageView.less';

export let ImageView = ({ children }) => {
    return (
        <div class="ImageView">
            <Aspect>
                {children}
            </Aspect>
        </div>
    );
};
