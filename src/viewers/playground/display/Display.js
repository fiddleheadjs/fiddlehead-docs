import './Display.less';
import {useState, useRef, useMemo, useEffect} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {CautionIcon} from '../../../icons/CautionIcon';
import {Section} from '../section/Section';
import {DisplayIcon} from '../../../icons/DisplayIcon';
import {Loading} from '../../../components/loading/Loading';
import {PlayIcon} from '../../../icons/PlayIcon';

export let Display = ({
    entryFilename,
    files,
    consoleCommandHandle,
    onConsoleTransplanted,
    forcesClose,
}) => {
    let containerRef = useRef(null);

    let [error, setError] = useState(null);

    let Sandbox = useRef(null);
    
    let [isLoadingSandbox, setIsLoadingSandbox] = useState(false);

    let [showsLoadingIndicator, setShowsLoadingIndicator] = useState(false);

    let startImport = () => {
        setError(null);
        setIsLoadingSandbox(true);

        import('../fiddlehead-sandbox/FiddleheadSandbox')
            .then((exports) => {
                Sandbox.current = exports.FiddleheadSandbox;
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

    useEffect(() => {
        if (!isLoadingSandbox) {
            setShowsLoadingIndicator(false);
            return;
        }

        let timeoutId = setTimeout(() => {
            setShowsLoadingIndicator(true);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [isLoadingSandbox]);

    let [icon, title] = useMemo(() => {
        if (isLoadingSandbox) {
            return [<PlayIcon />, __('Sandbox processing...')];
        }

        if (error !== null) {
            return [<CautionIcon />, __('Sandbox failed')];
        }
        
        return [<DisplayIcon />, __('Display result')];
    }, [isLoadingSandbox, error]);

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
                {Sandbox.current !== null &&
                    <div class={`sandbox${error !== null ? ' hidden' : ''}`}>
                        <Sandbox.current
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
                {showsLoadingIndicator && (
                    <div class="loading">
                        <Loading />
                    </div>
                )}
            </div>
        </Section>
    );
};
