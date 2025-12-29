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
        let style = getComputedStyle(scrollViewRef.current);
        return parseFloat(style.paddingLeft);
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
                let slide = findSlide(item, area);
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
        }, 200);
    };

    let findSlide = (slideItem, area = 'body') => {
        if (slideItem == null || scrollViewRef.current == null) {
            return null;
        }
        let selector = `[data-slide="${slideItem.id}"][data-area="${area}"]`;
        return scrollViewRef.current.querySelector(selector);
    };

    let findNextSlide = () => {
        let activeSlideCount = 0;
        for (let item of slideItems) {
            let slide = findSlide(item);
            let active = isSlideActive(slide);
            if (active) {
                activeSlideCount++;
            } else if (activeSlideCount > 0) {
                return slide;
            }
        }
        return findSlide(slideItems[0], 'tail');
    };

    let findPreviousSlide = () => {
        let activeSlideCount = 0;
        let pickedCount = 0;
        let previousSlide = null;
        for (let i = slideItems.length - 1; i >= 0; i--) {
            let slide = findSlide(slideItems[i]);
            let active = isSlideActive(slide);
            if (active) {
                activeSlideCount++;
            } else if (pickedCount < activeSlideCount) {
                previousSlide = slide;
                pickedCount++;
            }
        }
        if (previousSlide != null) {
            return previousSlide;
        }
        return findSlide(slideItems[slideItems.length - 1], 'head');
    };

    let scrollToSlide = (slide) => {
        if (slide == null) {
            return;
        }
        let scrollView = scrollViewRef.current;
        let snapAlign = getComputedStyle(slide).scrollSnapAlign;
        let surrounding = scrollView.clientWidth - slide.offsetWidth - 2 * getSlideMargin();
        let scrollLeft = slide.offsetLeft - getSlideMargin();
        if (snapAlign === 'center') {
            scrollLeft -= surrounding / 2;
        } else if (snapAlign === 'end') {
            scrollLeft -= surrounding;
        }
        scrollView.scrollTo({
            left: scrollLeft,
            behavior: 'auto'
        });
    };

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
                            scrollToSlide(findSlide(item));
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
