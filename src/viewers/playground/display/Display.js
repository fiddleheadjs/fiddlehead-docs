import './Display.less';
import {useState, useRef, useEffect} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {CautionIcon} from '../../../icons/CautionIcon';
import {PlayIcon} from '../../../icons/PlayIcon';
import {Section} from '../section/Section';
import {DisplayIcon} from '../../../icons/DisplayIcon';

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
            }, 1000);

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

    let [icon, title] = (() => {
        if (error !== null) {
            return [<CautionIcon />, __('Sandbox failed')];
        }

        if (isLoadingSandbox) {
            return [<PlayIcon />, __('Processing...')];
        }

        if (Sandbox.current === null) {
            return [<PlayIcon />, __('Compile')];
        }

        return [<DisplayIcon />, __('Display Result')];
    })();

    return (
        <Section
            class="Display"
            icon={icon}
            title={title}
            defaultOpen={true}
            forcesClose={forcesClose}
            usesCssToClose={true}
            ref={containerRef}
        >
            <div class="display-output">
                {Sandbox.current !== null &&
                    <Sandbox.current
                        entryFilename={entryFilename}
                        files={files}
                        errorHandle={setError}
                        consoleCommandHandle={consoleCommandHandle}
                        onConsoleTransplanted={onConsoleTransplanted}
                    />
                }
                {
                    error !== null &&
                    <pre class="error">
                        {`${error.name}: ${error.message}`}
                    </pre>
                }
            </div>
        </Section>
    );
};
