import './Console.less';
import {__} from '../../../modules/i18n';
import {Button} from '../../../components/button/Button';
import {TerminalIcon} from '../../../icons/TerminalIcon';
import {BanIcon} from '../../../icons/BanIcon';

export let Console = ({items, clear}) => {

    return (
        <div class="Console">
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
                <pre>
                    {items.map(([name, value], index) => (
                        <p key={index} class={name}>{value}</p>
                    ))}
                </pre>
            </div>
        </div>
    );
};
