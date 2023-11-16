// Gomoku
// Gomoku - team chess

import {render} from 'fiddlehead';
import {Gomoku} from '../gomoku/Gomoku';

let App = () => {
    return <Gomoku />;
};

render(<App/>, document.getElementById('root'));
