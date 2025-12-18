import {useEffect, useRef, useState} from 'fiddlehead';
import {ArrowLeft, ArrowRight} from '../icons';
import './Slider.less';

export let Slider = ({
    slideItems,
    children = renderContent
}) => {
    let scrollViewRef = useRef(null);
    let dotNavigationRef = useRef(null);
    let [scrollable, setScrollable] = useState(false);
    let buffer = 2;

    let getSlidePadding = () => {
        let style = getComputedStyle(scrollViewRef.current);
        return parseFloat(style.paddingLeft);
    };

    let getScrollViewData = () => {
        let {clientWidth, scrollLeft} = scrollViewRef.current;
        let padX = getSlidePadding();
        let innerWidth = clientWidth - 2 * padX;
        let start = padX + scrollLeft;
        let end = start + innerWidth;
        let midpoint = start + innerWidth / 2;
        return { scrollLeft, innerWidth, start, end, midpoint };
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
        for (let item of slideItems) {
            let slide = getSlideById(item.id);
            let active = isSlideActive(slide);
            if (slide != null) {
                slide.dataset.active = String(active);
                slide.dataset.inView = String(isSlideInView(slide));
            }
            let dot = getDotById(item.id);
            if (dot != null) {
                dot.dataset.active = String(active);
            }
        }

        if (scrollViewRef.current != null) {
            let { scrollWidth, clientWidth } = scrollViewRef.current;
            setScrollable(scrollWidth > clientWidth);
        }
    };

    useEffect(() => {
        refreshSlideFlags();
    });

    useEffect(() => {
        if (typeof ResizeObserver === 'undefined') {
            return;
        }
        let scrollView = scrollViewRef.current;
        if (scrollView == null) {
            return;
        }
        let previousWidth = 0;
        let previousHeight = 0;
        let observer = new ResizeObserver(([ entry ]) => {
            if (entry.contentRect) {
                let {width, height} = entry.contentRect;
                let widthChange = Math.abs(width - previousWidth);
                let heightChange = Math.abs(height - previousHeight);
                let threshold = 2;
                if (widthChange > threshold || heightChange > threshold) {
                    refreshSlideFlags();
                    previousWidth = width;
                    previousHeight = height;
                }
            }
        });
        observer.observe(scrollView);
        return () => {
            observer.unobserve(scrollView);
        };
    }, []);

    let [scrolling, setScrolling] = useState(false);

    let scrollingEndDebounceRef = useRef(null);

    let onScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingEndDebounceRef.current);
        scrollingEndDebounceRef.current = setTimeout(() => {
            setScrolling(false);
        }, 200);
    };

    let getSlideById = (slideId) => {
        if (scrollViewRef.current == null) {
            return null;
        }
        return scrollViewRef.current.querySelector(`.SliderSlide[data-id="${slideId}"]`);
    };

    let getDotById = (slideId) => {
        if (dotNavigationRef.current == null) {
            return null;
        }
        return dotNavigationRef.current.querySelector(`button[data-id="${slideId}"]`);
    };

    let findNextSlide = () => {
        let activeSlideCount = 0;
        for (let item of slideItems) {
            let slide = getSlideById(item.id);
            let active = isSlideActive(slide);
            if (active) {
                activeSlideCount++;
            } else if (activeSlideCount > 0) {
                return slide;
            }
        }
        return getSlideById(slideItems[0]?.id);
    };

    let findPreviousSlide = () => {
        let activeSlideCount = 0;
        let pickedCount = 0;
        let previousSlide = null;
        for (let i = slideItems.length - 1; i >= 0; i--) {
            let slide = getSlideById(slideItems[i].id);
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
        return getSlideById(slideItems[slideItems.length - 1]?.id);
    };

    let scrollToSlide = (slide) => {
        if (slide == null) {
            return;
        }
        let scrollView = scrollViewRef.current;
        scrollView.scrollTo({
            left: slide.offsetLeft - getSlidePadding(),
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
                class="scroll-view"
                onScroll={onScroll}
            >
                {slideItems.map(item => {
                    let slide = getSlideById(item.id);
                    return (
                        <div
                            key={item.id}
                            class="SliderSlide"
                            data-id={item.id}
                            data-active={String(isSlideActive(slide))}
                            data-in-view={String(isSlideInView(slide))}
                        >
                            {item.render()}
                        </div>
                    );
                })}
            </div>
            <div class="aspect-ratio" />
        </div>
    );

    let backButton = () => (
        <button class="SliderBackButton" type="button" onClick={onBack}>
            <ArrowLeft />
        </button>
    );

    let nextButton = () => (
        <button class="SliderNextButton" type="button" onClick={onNext}>
            <ArrowRight />
        </button>
    );

    let dotNavigation = () => (
        <div ref={dotNavigationRef} class="SliderDotNavigation">
            {slideItems.map(item => (
                <button
                    key={item.id}
                    type="button"
                    data-id={item.id}
                    data-active={String(isSlideActive(getSlideById(item.id)))}
                    onClick={() => {
                        scrollToSlide(getSlideById(item.id));
                    }}
                >
                    <i />
                </button>
            ))}
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
