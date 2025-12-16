import {useEffect, useRef, useState} from 'fiddlehead';
import {ArrowLeft, ArrowRight} from '../icons';
import './Slider.less';

let renderContent = ({slides, backButton, nextButton, dotNavigation}) => {
    return (
        <>
            {slides()}
            {backButton()}
            {nextButton()}
        </>
    );
};

export let Slider = ({
    slideItems,
    slideHeight,
    gap = '0px',
    padX = '0px',
    children = renderContent
}) => {
    let scrollViewRef = useRef(null);
    let dotNavigationRef = useRef(null);

    let valueInPixels = (value) => {
        // Currently, only 'px' is supported
        return parseFloat(value);
    };

    let padXPx = valueInPixels(padX);

    let getSlideById = (slideId) => {
        if (scrollViewRef.current == null) {
            return null;
        }
        return scrollViewRef.current.querySelector(`.slide[data-id="${slideId}"]`);
    };

    let getDotById = (slideId) => {
        if (dotNavigationRef.current == null) {
            return null;
        }
        return dotNavigationRef.current.querySelector(`button[data-id="${slideId}"]`);
    };

    let isSlideActive = (slide) => {
        if (slide == null) {
            return false;
        }
        let {offsetLeft, offsetWidth} = slide;
        let {clientWidth, scrollLeft} = scrollViewRef.current;
        let buffer = 10;
        return (
            offsetLeft >= padXPx + scrollLeft - buffer &&
            offsetLeft + offsetWidth <= scrollLeft + clientWidth + padXPx + buffer
        );
    };

    let isSlideInView = (slide) => {
        if (slide == null) {
            return false;
        }
        let {offsetLeft, offsetWidth} = slide;
        let {clientWidth, scrollLeft} = scrollViewRef.current;
        let buffer = 10;
        return (
            offsetLeft + offsetWidth > padXPx + scrollLeft - buffer &&
            offsetLeft + padXPx < scrollLeft + clientWidth + buffer
        );
    };

    let refreshActiveStatusForSlides = () => {
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
    };

    useEffect(() => {
        refreshActiveStatusForSlides();
    });

    let [scrolling, setScrolling] = useState(false);

    let scrollingEndDebounceRef = useRef(null);

    let onScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingEndDebounceRef.current);
        scrollingEndDebounceRef.current = setTimeout(() => {
            setScrolling(false);
        }, 200);
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
        let scrollSnapType = scrollView.style.scrollSnapType;
        scrollView.style.scrollSnapType = 'none';
        scrollView.scrollTo({
            left: slide.offsetLeft - padXPx,
            behavior: 'auto'
        });
        setTimeout(() => {
            scrollView.style.scrollSnapType = scrollSnapType;
        }, 200);
    };

    let onBack = () => {
        scrollToSlide(findPreviousSlide());
    };

    let onNext = () => {
        scrollToSlide(findNextSlide());
    };

    let slides = () => (
        <div class="slides" style={{height: slideHeight}}>
            <div
                ref={scrollViewRef}
                class="scroll-view"
                style={{gap, padding: `0px ${padX}`}}
                onScroll={onScroll}
            >
                {slideItems.map(item => {
                    let slide = getSlideById(item.id);
                    return (
                        <div
                            key={item.id}
                            class="slide"
                            data-id={item.id}
                            data-active={String(isSlideActive(slide))}
                            data-in-view={String(isSlideInView(slide))}
                            style={{height: slideHeight}}
                        >
                            {item.render()}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    let backButton = () => (
        <button class="back" type="button" onClick={onBack}>
            <ArrowLeft />
        </button>
    );

    let nextButton = () => (
        <button class="next" type="button" onClick={onNext}>
            <ArrowRight />
        </button>
    );

    let dotNavigation = () => (
        <div ref={dotNavigationRef} class="dot-navigation">
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
        <div class="Slider" data-scrolling={String(scrolling)}>
            {children({slides, backButton, nextButton, dotNavigation})}
        </div>
    );
};
