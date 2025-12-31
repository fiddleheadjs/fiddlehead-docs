import './Dialog.less';
import {Times} from '../icons';
import {useRef} from 'fiddlehead';
import {useClickAwayListener} from '../utils';

export let Dialog = ({children, setDialog}) => {
    let dialogRef = useRef(null);

    let closeDialog = () => {
        setDialog(null);
    };

    useClickAwayListener(dialogRef, closeDialog);

    return (
        <div class="Dialog" role="dialog" ref={dialogRef}>
            <button
                type="button"
                class="dismiss x-button"
                tabIndex="0"
                onClick={closeDialog}
            >
                <Times />
            </button>
            <div class="content">
                {children}
            </div>
        </div>
    );
};
