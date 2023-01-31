import './DocumentViewer.less';
import {useCallback, useEffect, useRef} from 'fiddlehead';
import {MarkdownViewer} from '../markdown/MarkdownViewer';
import {__} from '../../modules/i18n';
import {useSelect} from '../../modules/store';
import {Link} from '../../modules/router';
import {Button} from '../../components/button/Button';
import {LeftArrowIcon} from '../../icons/LeftArrowIcon';
import {RightArrowIcon} from '../../icons/RightArrowIcon';
import {AltGithubIcon} from '../../icons/AltGithubIcon';
import {PlaygroundViewer} from '../playground/PlaygroundViewer';
import {SidebarPortal} from '../../layout/sidebar/Sidebar';
import {TableOfContents} from './TableOfContents';
import {getHeadingMixins, highlightTocItems} from './tocHighlight';

const MIN_HEADINGS_TO_SHOW_TOC = 2;

export let DocumentViewer = ({
    headings = [],
    contents = [],
    contentPath,
    previous,
    next,
}) => {
    let tocRef = useRef(null);
    let contentsRef = useRef(null);

    let layoutScroll = useSelect(data => data.layoutScroll);

    // Scroll into the heading which matches the requested hash
    useEffect(() => {
        if (window.location.hash) {
            let heading = document.getElementById(
                window.location.hash.slice(1)
            );

            if (heading) {
                heading.scrollIntoView();
            }
        }
    }, []);

    // When the user is scrolling contents,
    // table-of-contents needs to indicate what contents are displaying in the viewport
    useEffect(() => {
        if (layoutScroll === null || contentsRef.current === null || tocRef.current === null) {
            return;
        }

        let {scrollee, scroller, topShift} = layoutScroll;

        let headingMixins = getHeadingMixins(headings, tocRef.current);
        
        let handleEvent = () => {
            highlightTocItems(headingMixins, contentsRef.current, scrollee, topShift);
        };

        handleEvent();

        let listenOptions = {passive: true};

        scroller.addEventListener('scroll', handleEvent, listenOptions);
        window.addEventListener('resize', handleEvent, listenOptions);

        return () => {
            scroller.removeEventListener('scroll', handleEvent, listenOptions);
            window.removeEventListener('resize', handleEvent, listenOptions);
        };
    }, [layoutScroll]);

    let getContents = () => {
        let headingPosRef = {current: -1};

        return contents.map((content, index) => {
            if (typeof content === 'string') {
                return (
                    <MarkdownViewer
                        key={index}
                        content={content}
                        headings={headings}
                        headingPosRef={headingPosRef}
                    />
                );
            }

            if (content.playground !== undefined) {
                const {fileList} = content.playground;

                return (
                    <PlaygroundViewer
                        fileList={fileList}
                    />
                );
            }
        });
    };

    let showsToc = headings.length >= MIN_HEADINGS_TO_SHOW_TOC;

    return (
        <div class="DocumentViewer">
            <div class="contents" ref={contentsRef}>
                {
                    getContents()
                }
                {(previous !== null || next !== null) && (
                    <div class="quick-nav">
                        {previous !== null ? (
                            <Link href={previous.path}>
                                <Button>
                                    <LeftArrowIcon />
                                    <span>{previous.label}</span>
                                </Button>
                            </Link>
                        ) : <span />}
                        {next !== null ? (
                            <Link href={next.path}>
                                <Button>
                                    <span>{next.label}</span>
                                    <RightArrowIcon />
                                </Button>
                            </Link>
                        ) : <span />}
                    </div>
                )}
            </div>
            <div class="bottom">
                <a
                    href={`https://github.com/fiddleheadjs/fiddlehead-docs/blob/master/src/contents/${contentPath}/index.md`}
                    target="_blank"
                >
                    <Button variant="textual" size="small">
                        <span>{__('Edit this page')}</span>
                        <span>&middot;</span>
                        <AltGithubIcon size="1.2em" />
                    </Button>
                </a>
            </div>
            {
                showsToc &&
                <SidebarPortal>
                    <TableOfContents
                        headings={headings}
                        ref={tocRef}
                    />
                </SidebarPortal>
            }
        </div>
    );
}
