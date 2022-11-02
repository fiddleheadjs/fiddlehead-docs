import './DocumentTemplate.less';
import {useEffect, useRef} from 'fiddlehead';
import {MarkdownViewer} from '../../viewers/markdown/MarkdownViewer';
import {DemoViewer} from '../../viewers/demo/DemoViewer';
import {__} from '../../i18n';
import * as marked from 'marked';
import {useSelect} from '../../store';

export let DocumentTemplate = ({headings = [], contents = [], demos = {}}) => {
    let tocRef = useRef(null);
    let contentsRef = useRef(null);

    let scroller = useSelect(data => data.layoutScrollElement);

    // Scroll into the heading which matches the requested hash
    useEffect(() => {
        if (window.location.hash) {
            let heading = document.getElementById(window.location.hash.slice(1));

            if (heading) {
                heading.scrollIntoView();
            }
        }
    }, []);

    // When the user is scrolling contents,
    // table-of-contents needs to indicate what contents are displaying in the viewport
    useEffect(() => {
        let getScrolling = () => {
            if (scroller !== null) {
                let scrollerRect = scroller.getBoundingClientRect();

                return {
                    height: scrollerRect.height,
                    top: scrollerRect.top,
                    scrollHeight: scroller.scrollHeight,
                    scrollTop: scroller.scrollTop,
                };
            }

            return {
                height: window.innerHeight,
                top: 0,
                scrollHeight: document.body.offsetHeight,
                scrollTop: window.scrollY,
            };
        };

        let mixins = headings.map(({id, level}) => ({
            heading: document.getElementById(id),
            tocItem: tocRef.current.querySelector(`li[data-id="${id}"]`),
            level: level,
        })).filter(({id, heading}) => {
            if (heading === null) {
                console.log('Missing heading: ', id);
                return false;
            }

            return true;
        });

        let handler = () => {
            if (contentsRef.current === null) {
                return;
            }

            let scrolling = getScrolling();

            mixins.map(({heading, tocItem, level}, index) => {
                let headingRect = heading.getBoundingClientRect();

                // Find next heading with the same or lower level
                // h2 (current) -> h3 (skip) -> h2 (found)
                // h3 (current) -> h3 (skip) -> h2 (found)
                let nextHeading;
                for (let i = index + 1; i < mixins.length; i++) {
                    if (mixins[i].level <= level) {
                        nextHeading = mixins[i].heading;
                        break;
                    }
                }

                // We expect the content appear at the center area of the screen
                // not too close to top or bottom
                // so 30% of viewport height at top and bottom will be ignore
                // except the case it reaches the top or bottom of scroller
                let marginTop = Math.min(
                    0.3 * scrolling.height,
                    scrolling.scrollTop
                );
                let marginBottom = Math.min(
                    0.3 * scrolling.height,
                    scrolling.scrollHeight - scrolling.height - scrolling.scrollTop
                );

                // Check if current section is active
                // and calculate section height
                let active, sectionHeight;
                // If there is next heading, we will use the top of the next heading as the bottom border of current section
                if (nextHeading) {
                    let nextHeadingRect = nextHeading.getBoundingClientRect();
                    sectionHeight = nextHeadingRect.top - headingRect.top - 1;
                    active = (
                        headingRect.bottom < scrolling.height + scrolling.top - Math.min(marginBottom, sectionHeight)
                        && nextHeadingRect.top > scrolling.top + Math.min(marginTop, sectionHeight)
                    );
                }
                // If no next heading, we will use the bottom of whole content area instead
                else {
                    let contentsRect = contentsRef.current.getBoundingClientRect();
                    sectionHeight = contentsRect.bottom - headingRect.top - 1;
                    active = (
                        headingRect.bottom < scrolling.height + scrolling.top - Math.min(marginBottom, sectionHeight)
                        && contentsRect.bottom > scrolling.top + Math.min(marginTop, sectionHeight)
                    );
                }

                tocItem.setAttribute('data-active', active);

                // Check if current section is focused
                // The difference between focused and active, is that focused is used for child sections
                // If, one of child sections is focused, then parent section is active
                if (!active) {
                    tocItem.setAttribute('data-focused', false);
                } else {
                    if (index === mixins.length - 1) {
                        tocItem.setAttribute('data-focused', true);
                    } else {
                        let siblingHeading = mixins[index + 1].heading;
                        let siblingHeadingRect = siblingHeading.getBoundingClientRect();

                        tocItem.setAttribute('data-focused',
                            headingRect.bottom < scrolling.height + scrolling.top - Math.min(marginBottom, sectionHeight)
                            && siblingHeadingRect.top > scrolling.top + Math.min(marginTop, sectionHeight)
                        );
                    }
                }
            });
        };

        handler();

        scroller.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);

        return () => {
            scroller.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        };
    }, [scroller]);

    let getContents = () => {
        let headingPosRef = {current: -1};

        return contents.map((content, index) => {
            if (typeof content === 'string') {
                return <MarkdownViewer
                    key={index}
                    content={content}
                    headings={headings}
                    headingPosRef={headingPosRef}
                />;
            }

            let {Component, code} = demos[content.demo];
            return <DemoViewer
                key={index}
                Component={Component}
                code={code}
            />;
        });
    };

    return <div className="DocumentTemplate">
        <main>
            <div className="contents" ref={contentsRef}>
                {
                    getContents()
                }
            </div>
        </main>
        <nav>
            <div className="table-of-contents" ref={tocRef}>
                <div className="title">{__('Table of contents')}</div>
                <ul className="list">
                    {
                        headings.map(({text, level, id}) => {
                            return <li key={id} data-id={id} data-level={level}>
                                <a href={'#'.concat(id)} innerHTML={marked.parseInline(text)}/>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </nav>
    </div>;
}
