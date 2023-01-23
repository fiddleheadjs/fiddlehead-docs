import './Player.less';
import {useState, useRef, useEffect} from 'fiddlehead';
import {__} from '../../../modules/i18n';
import {CautionIcon} from '../../../icons/CautionIcon';
import {CircleCheckIcon} from './../../../icons/CircleCheckIcon';
import {PlayIcon} from '../../../icons/PlayIcon';

export let Player = ({entryFilename, files}) => {
    let Sandbox = useRef();

    let [isLoading, setIsLoading] = useState(false);

    let [error, setError] = useState(null);

    let playerRef = useRef(null);

    let startImport = () => {
        setError(null);
        setIsLoading(true);

        import('../fiddlehead-sandbox/FiddleheadSandbox')
            .then((exports) => {
                Sandbox.current = exports.FiddleheadSandbox;
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
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

        observer.observe(playerRef.current);

        return () => observer.disconnect();
    }, []);

    let [icon, title] = (() => {
        if (error !== null) {
            return [<CautionIcon />, __('Error')];
        }

        if (isLoading) {
            return [<PlayIcon />, __('Loading...')];
        }

        if (Sandbox.current === null) {
            return [<PlayIcon />, __('Compile')];
        }

        return [<CircleCheckIcon />, __('Result')];
    })();

    return (
        <div
            class="Player"
            ref={playerRef}
        >
            <div class="heading">
                {icon}
                <span>{title}</span>
            </div>
            <div class="body">
                {Sandbox.current !== null &&
                    <Sandbox.current
                        entryFilename={entryFilename}
                        files={files}
                        setError={setError}
                    />
                }
                {''}
                {
                    error !== null &&
                    <pre class="error">
                        {`${error.name}: ${error.message}`}
                    </pre>
                }
            </div>
        </div>
    );
};
