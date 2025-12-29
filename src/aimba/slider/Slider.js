import './Slider.less';
import {Fragment, useEffect, useRef, useState} from 'fiddlehead';
import {ArrowLeft, ArrowRight} from '../icons';
import {useResizeObserver} from '../utils';

export let Slider = ({
    slideItems,
    children = renderContent
}) => {
    let slideAreas = ['head', 'body', 'tail'];

    let [slideStates, setSlideStates] = useState(() => {
        let states = {};
        for (let area of slideAreas) {
            states[area] = {};
            for (let item of slideItems) {
                states[area][item.id] = {
                    active: false,
                    inView: false,
                };
            }
        }
        return states;
    });

    let scrollViewRef = useRef(null);

    let [scrollable, setScrollable] = useState(false);

    let [scrolling, setScrolling] = useState(false);

    let scrollingEndDebounceRef = useRef(null);

    let buffer = 2;

    let getSlideMargin = () => {
        let scrollView = scrollViewRef.current;
        if (scrollView == null) {
            return 0;
        }
        let style = getComputedStyle(scrollView);
        return parseFloat(style.paddingLeft) || 0;
    };

    let getScrollViewData = () => {
        let {clientWidth, scrollLeft} = scrollViewRef.current;
        let padX = getSlideMargin();
        let innerWidth = clientWidth - 2 * padX;
        let start = padX + scrollLeft;
        let end = start + innerWidth;
        let midpoint = start + innerWidth / 2;
        return {scrollLeft, innerWidth, start, end, midpoint};
    };

    let isSlideActive = (slide) => {
        if (slide == null) {
            return false;
        }
        let {offsetLeft, offsetWidth} = slide;
        let {innerWidth, start, end, midpoint} = getScrollViewData();
        if (innerWidth >= offsetWidth - buffer) {
            return (
                offsetLeft >= start - buffer &&
                offsetLeft + offsetWidth <= end + buffer
            );
        }
        return (
            offsetLeft <= midpoint + buffer &&
            offsetLeft + offsetWidth >= end - buffer
            ||
            offsetLeft <= start + buffer &&
            offsetLeft + offsetWidth >= midpoint - buffer
            ||
            offsetLeft <= start + buffer &&
            offsetLeft + offsetWidth >= end - buffer
        );
    };

    let isSlideInView = (slide) => {
        if (slide == null) {
            return false;
        }
        let {offsetLeft, offsetWidth} = slide;
        let {start, end} = getScrollViewData();
        return (
            offsetLeft + offsetWidth > start - buffer &&
            offsetLeft < end + buffer
        );
    };

    let refreshSlideFlags = () => {
        if (scrollViewRef.current != null) {
            let {scrollWidth, clientWidth} = scrollViewRef.current;
            setScrollable(scrollWidth > clientWidth);
        }

        let newStates = {};
        let hasChanges = false;
        for (let area of slideAreas) {
            newStates[area] = {...slideStates[area]};
            for (let item of slideItems) {
                let slide = querySlide(item, area);
                let active = isSlideActive(slide);
                let inView = isSlideInView(slide);
                let current = slideStates[area][item.id];
                if (active !== current.active || inView !== current.inView) {
                    newStates[area][item.id] = {active, inView};
                    hasChanges = true;
                }
            }
        }
        if (hasChanges) {
            setSlideStates(newStates);
        }
    };

    useEffect(refreshSlideFlags, [slideItems]);

    useResizeObserver(scrollViewRef, {
        callback: refreshSlideFlags
    });

    let onScroll = () => {
        refreshSlideFlags();
        setScrolling(true);
        clearTimeout(scrollingEndDebounceRef.current);
        scrollingEndDebounceRef.current = setTimeout(() => {
            setScrolling(false);
        }, 100);
    };

    let querySlide = (slideItem, area = 'body') => {
        if (slideItem == null || scrollViewRef.current == null) {
            return null;
        }
        let selector = `[data-slide="${slideItem.id}"][data-area="${area}"]`;
        return scrollViewRef.current.querySelector(selector);
    };

    let findNextSlide = () => {
        let activeSlideCount = 0;
        let iMax = slideItems.length - 1;
        for (let i = 0; i <= iMax; i++) {
            let slide = querySlide(slideItems[i]);
            let active = isSlideActive(slide);
            if (active) {
                activeSlideCount++;
                continue;
            }
            if (activeSlideCount > 0) {
                let lastCycleStartIndex = slideItems.length - activeSlideCount;
                if (i <= lastCycleStartIndex) {
                    return slide;
                }
                return querySlide(slideItems[lastCycleStartIndex]);
            }
        }
        return querySlide(slideItems[0], 'tail');
    };

    let findPreviousSlide = () => {
        let activeSlideCount = 0;
        let pickedCount = 0;
        let previousSlide = null;
        let iMax = slideItems.length - 1;
        for (let i = iMax; i >= 0; i--) {
            let slide = querySlide(slideItems[i]);
            let active = isSlideActive(slide);
            if (active) {
                activeSlideCount++;
                continue;
            }
            if (pickedCount < activeSlideCount) {
                previousSlide = slide;
                pickedCount++;
            }
        }
        if (previousSlide != null) {
            return previousSlide;
        }
        let lastCycleStartIndex = slideItems.length - activeSlideCount;
        return querySlide(slideItems[lastCycleStartIndex], 'head');
    };

    let scrollToSlide = (slide, behavior = 'auto') => {
        if (slide == null) {
            return;
        }
        let scrollView = scrollViewRef.current;
        let scrollLeft = slide.offsetLeft - getSlideMargin();
        scrollView.scrollTo({
            left: scrollLeft,
            behavior
        });
    };

    let scrollToBodyIfNeeded = () => {
        for (let area of ['body', 'head', 'tail']) {
            for (let item of slideItems) {
                let state = slideStates[area][item.id];
                if (state.active) {
                    if (area !== 'body') {
                        let slide = querySlide(item, 'body');
                        scrollToSlide(slide, 'instant');
                    }
                    return;
                }
            }
        }
    };

    useEffect(() => {
        if (!scrolling) {
            scrollToBodyIfNeeded();
        }
    }, [scrolling, slideStates]);

    let onBack = () => {
        scrollToSlide(findPreviousSlide());
    };

    let onNext = () => {
        scrollToSlide(findNextSlide());
    };

    let slideShow = () => (
        <div class="SliderSlideShow">
            <div
                ref={scrollViewRef}
                class="SliderScrollView"
                tabIndex="0"
                onScroll={onScroll}
            >
                {slideAreas.map(area => (
                    <Fragment key={area}>
                        {slideItems.map(item => {
                            let {active, inView} = slideStates[area][item.id];
                            return (
                                <div
                                    key={item.id}
                                    class="SliderSlide"
                                    data-slide={item.id}
                                    data-area={area}
                                    data-active={String(active)}
                                    data-in-view={String(inView)}
                                >
                                    {item.render({active, inView})}
                                </div>
                            );
                        })}
                    </Fragment>
                ))}
            </div>
            <div class="aspect">
                <div class="ratio" />
            </div>
        </div>
    );

    let backButton = () => (
        <button
            class="SliderBackButton x-button"
            type="button"
            tabIndex="0"
            aria-label="Back"
            onClick={onBack}
        >
            <ArrowLeft />
        </button>
    );

    let nextButton = () => (
        <button
            class="SliderNextButton x-button"
            type="button"
            tabIndex="0"
            aria-label="Next"
            onClick={onNext}
        >
            <ArrowRight />
        </button>
    );

    let dotNavigation = () => (
        <div class="SliderDotNavigation">
            {slideItems.map(item => {
                let {active} = slideStates['body'][item.id];
                return (
                    <button
                        key={item.id}
                        type="button"
                        tabIndex="0"
                        class="x-button"
                        aria-label={`Scroll to ${item.id}`}
                        data-active={String(active)}
                        onClick={() => {
                            scrollToSlide(querySlide(item));
                        }}
                    >
                        <i />
                    </button>
                );
            })}
        </div>
    );

    return (
        <div class="Slider" data-scrollable={String(scrollable)} data-scrolling={String(scrolling)}>
            {children({slideShow, backButton, nextButton, dotNavigation})}
        </div>
    );
};

let renderContent = ({slideShow, backButton, nextButton, dotNavigation}) => {
    return (
        <>
            {slideShow()}
            {backButton()}
            {nextButton()}
        </>
    );
};
