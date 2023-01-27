import './Console.less';
import {useState} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {Button} from '../../../components/button/Button';
import {TerminalIcon} from '../../../icons/TerminalIcon';
import {BanIcon} from '../../../icons/BanIcon';

export let Console = ({items, clear}) => {
    let [focusedItemRow, setFocusedItemRow] = useState(null);

    let handleFocusRow = (event) => {
        let row = event.target.getAttribute('data-row');
        if (row !== null) {
            row = Number(row);
        }
        setFocusedItemRow(row);
    };

    return (
        <div
            class="Console"
            onMouseDown={handleFocusRow}
            onTouchStart={handleFocusRow}
        >
            <div class="heading">
                <div class="title">
                    <TerminalIcon />
                    <span>{__('Console')}</span>
                </div>
                <div class="actions">
                    <Button
                        variant="textual"
                        size="small"
                        onClick={clear}
                        title={__('Clear console')}
                    >
                        <BanIcon />
                    </Button>
                </div>
            </div>
            <div class="body">
                {items.map(([name, value], row) => (
                    <p
                        key={row}
                        class={[
                            focusedItemRow === row && 'focused',
                            value.includes('\n') && 'multiple-line'
                        ].filter(Boolean).join(' ')}
                        data-row={row}
                        data-command={name}
                    >
                        {value}
                    </p>
                ))}
            </div>
        </div>
    );
};
