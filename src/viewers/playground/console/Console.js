import './Console.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {Button} from '../../../components/button/Button';
import {TerminalIcon} from '../../../icons/TerminalIcon';
import {BanIcon} from '../../../icons/BanIcon';
import {Checkbox} from '../../../components/checkbox/Checkbox';
import {Section} from '../section/Section';

export let Console = ({items, clear, empty, preservesLog, setPreservesLog}) => {
    let [focusedItemRow, setFocusedItemRow] = useState(null);

    let scrollerRef = useRef();

    useEffect(() => {
        let scroller = scrollerRef.current;
        if (scroller === null) {
            return;
        }
        if (focusedItemRow !== null) {
            return;
        }
        scroller.scroll(0, scroller.scrollHeight);
    }, [items]);

    let handleFocusRow = (event) => {
        let row = event.target.getAttribute('data-row');
        if (row !== null) {
            row = Number(row);
        }
        setFocusedItemRow(row);
    };

    return (
        <Section
            class={`Console${empty ? ' empty' : ''}`}
            onMouseDown={handleFocusRow}
            onTouchStart={handleFocusRow}
            icon={<TerminalIcon/>}
            title={__('Console')}
            actions={(
                <>
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
                </>
            )}
        >
            <div class="console-output" ref={scrollerRef}>
                {items.map(([name, value], row) => (
                    <p
                        key={row}
                        class={[
                            focusedItemRow === row && 'focused',
                            value.includes('\n') && 'multiple-line',
                        ].filter(Boolean).join(' ')}
                        data-row={row}
                        data-command={name}
                    >
                        {value}
                    </p>
                ))}
                <p>&nbsp;</p>
            </div>
        </Section>
    );
};
