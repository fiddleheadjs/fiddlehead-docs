import './Console.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {Button} from '../../../components/button/Button';
import {TerminalIcon} from '../../../icons/TerminalIcon';
import {BanIcon} from '../../../icons/BanIcon';
import {Checkbox} from '../../../components/checkbox/Checkbox';

export let Console = ({items, clear, preservesLog, setPreservesLog}) => {
    let [focusedItemRow, setFocusedItemRow] = useState(null);

    let bodyRef = useRef();

    useEffect(() => {
        let body = bodyRef.current;
        if (body === null) {
            return;
        }
        if (focusedItemRow !== null) {
            return;
        }
        body.scroll(0, body.scrollHeight);
    }, [items]);

    let handleFocusRow = (event) => {
        let row = event.target.getAttribute('data-row');
        if (row !== null) {
            row = Number(row);
        }
        setFocusedItemRow(row);
    };

    return (
        <div
            class={`Console${items.length === 0 ? ' empty' : ''}`}
            onMouseDown={handleFocusRow}
            onTouchStart={handleFocusRow}
        >
            <div class="heading">
                <div class="title">
                    <TerminalIcon />
                    <span>{__('Console')}</span>
                </div>
                <div class="actions">
                    <Checkbox
                        label={__('Preserve log')}
                        checked={preservesLog}
                        setChecked={setPreservesLog}
                        size="small"
                    />
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
            <div class="body" ref={bodyRef}>
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
                <p>&nbsp;</p>
            </div>
        </div>
    );
};
