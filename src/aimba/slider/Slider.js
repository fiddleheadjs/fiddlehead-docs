import {useRef} from 'fiddlehead';
import {ArrowLeft, ArrowRight} from '../icons';
import './Slider.less';

export let Slider = ({slideItems, slideWidth, slideHeight, gap}) => {
    let slidesRef = useRef(null);

    let valueInPixels = (value) => {
        // Currently, only 'px' is supported
        return parseFloat(value);
    };

    let onBack = () => {
        slidesRef.current.scrollTo({
            left: slidesRef.current.scrollLeft - valueInPixels(slideWidth),
            behavior: 'smooth'
        });
    };

    let onNext = () => {
        slidesRef.current.scrollTo({
            left: slidesRef.current.scrollLeft + valueInPixels(slideWidth),
            behavior: 'smooth'
        });
    };

    return (
        <div class="Slider">
            <div class="slides" style={{gap, padding: `0 ${gap}`}} ref={slidesRef}>
                {slideItems.map(item => (
                    <div class="slide" key={item.id} style={{width: slideWidth, height: slideHeight}}>
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
