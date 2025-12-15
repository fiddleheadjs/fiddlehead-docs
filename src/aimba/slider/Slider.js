import {useEffect, useRef, useState} from 'fiddlehead';
import {ArrowLeft, ArrowRight} from '../icons';
import './Slider.less';

export let Slider = ({slideItems, slideWidth, slideHeight, gap = '0px', padX = '0px'}) => {
    let scrollViewRef = useRef(null);

    let valueInPixels = (value) => {
        // Currently, only 'px' is supported
        return parseFloat(value);
    };

    let getSlideById = (slideId) => {
        if (scrollViewRef.current == null) {
            return null;
        }
        return scrollViewRef.current.querySelector(`.slide[data-id="${slideId}"]`);
    };

    let isSlideActive = (slide) => {
        if (slide == null) {
            return false;
        }
        let { offsetLeft, offsetWidth } = slide;
        let { clientWidth, scrollLeft } = scrollViewRef.current;
        let pad = valueInPixels(padX);
        let buffer = 10;
        return (
            offsetLeft >= pad + scrollLeft - buffer &&
            offsetLeft + offsetWidth <= scrollLeft + clientWidth + pad + buffer
        );
    };

    let setActiveStatusForSlides = () => {
        for (let item of slideItems) {
            let slide = getSlideById(item.id);
            let active = isSlideActive(slide);
            slide.dataset.active = String(active);
        }
    };

    useEffect(() => {
        setActiveStatusForSlides();
    });

    let [scrolling, setScrolling] = useState(false);

    let scrollingEndDebounceRef = useRef(null);

    let onScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingEndDebounceRef.current);
        scrollingEndDebounceRef.current = setTimeout(() => {
            setScrolling(false);
        }, 100);
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
        scrollViewRef.current.scrollTo({
            left: slide.offsetLeft - valueInPixels(padX),
            behavior: 'smooth'
        });
    };

    let onBack = () => {
        scrollToSlide(findPreviousSlide());
    };

    let onNext = () => {
        scrollToSlide(findNextSlide());
    };

    return (
        <div class="Slider" data-scrolling={String(scrolling)}>
            <div
                ref={scrollViewRef}
                class="scroll-view"
                style={{gap, padding: `0px ${padX}`}}
                onScroll={onScroll}
            >
                {slideItems.map(item => (
                    <div
                        key={item.id}
                        class="slide"
                        data-id={item.id}
                        data-active={String(isSlideActive(getSlideById(item.id)))}
                        style={{width: slideWidth, height: slideHeight}}
                    >
                        {item.render()}
                    </div>
                ))}
            </div>
            <button class="back" type="button" onClick={onBack}>
                <ArrowLeft />
            </button>
            <button class="next" type="button" onClick={onNext}>
                <ArrowRight />
            </button>
        </div>
    );
};
