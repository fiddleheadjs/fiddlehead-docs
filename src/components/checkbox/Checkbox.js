import {SquareCheckIcon} from '../../icons/SquareCheckIcon';
import {SquareIcon} from '../../icons/SquareIcon';
import {Button} from '../button/Button';
import './Checkbox.less';

export let Checkbox = ({label, checked, setChecked, size, variant = 'textual'}) => {
    return (
        <Button
            class="Checkbox"
            onClick={() => setChecked(!checked)}
            size={size}
            variant={variant}
        >
            {checked ? <SquareCheckIcon /> : <SquareIcon />}
            <span>{label}</span>
        </Button>
    );
};
