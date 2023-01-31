import './Display.less';
import {useState, useRef, useMemo, useEffect} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {CautionIcon} from '../../../icons/CautionIcon';
import {Section} from '../section/Section';
import {DisplayIcon} from '../../../icons/DisplayIcon';
import {PlayIcon} from '../../../icons/PlayIcon';
import {BreathRing} from '../../../components/breath-ring/BreathRing';

export let Display = ({
    entryFilename,
    files,
    consoleCommandHandle,
    onConsoleTransplanted,
    forcesClose,
}) => {
    let containerRef = useRef(null);

    let [error, setError] = useState(null);

    let [Sandbox, setSandbox] = useState(null);
    
    let [isLoadingSandbox, setIsLoadingSandbox] = useState(false);

    let startImport = () => {
        setError(null);
        setIsLoadingSandbox(true);

        import('../fiddlehead-sandbox/FiddleheadSandbox')
            .then((exports) => {
                setSandbox(() => exports.FiddleheadSandbox);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoadingSandbox(false);
            });
    };

    useEffect(() => {
        if (window.IntersectionObserver === undefined) {
            let timeoutId = setTimeout(() => {
                startImport();
            }, 2000);

            return () => clearTimeout(timeoutId);
        }

        let observer = new IntersectionObserver(([entry]) => {
            if (entry.intersectionRatio > 0) {
                startImport();
                observer.disconnect();
            }
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    let [icon, title] = useMemo(() => {
        if (isLoadingSandbox) {
            return [<PlayIcon />, __('Sandbox processing...')];
        }

        if (error !== null) {
            return [<CautionIcon />, __('Sandbox failed')];
        }
        
        if (Sandbox === null) {
            return [<PlayIcon />, __('Sandbox pending')];
        }

        return [<DisplayIcon />, __('Display result')];
    }, [isLoadingSandbox, error, Sandbox]);

    return (
        <Section
            class="Display"
            icon={icon}
            title={<span style={{textTransform: 'capitalize'}}>{title}</span>}
            defaultOpen={true}
            forcesClose={forcesClose}
            usesCssToClose={true}
            ref={containerRef}
        >
            <div class="display-output">
                {Sandbox !== null &&
                    <div class={`sandbox${error !== null ? ' hidden' : ''}`}>
                        <Sandbox
                            entryFilename={entryFilename}
                            files={files}
                            errorHandle={setError}
                            consoleCommandHandle={consoleCommandHandle}
                            onConsoleTransplanted={onConsoleTransplanted}
                        />
                    </div>
                }
                {error !== null && (
                    <pre class="error">
                        <code>
                            {`${error.name}: ${error.message}`}
                        </code>
                    </pre>
                )}
                {isLoadingSandbox && (
                    <BreathRing />
                )}
            </div>
        </Section>
    );
};
