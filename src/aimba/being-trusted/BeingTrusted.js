import './BeingTrusted.less';
import {Slider} from '../slider';
import {ImageView} from '../image-view';

export let BeingTrusted = ({
    contents: {
        beingTrusted: {
            testimonials
        }
    }
}) => {
    return (
        <section class="BeingTrusted" id="BeingTrusted">
            <div class="heading">
                <h2 class="title">
                    Được tin tưởng bởi hơn 1.024 <com-word>chuyên gia</com-word>/<com-word>managers</com-word>/<com-word>CEOs</com-word>
                </h2>
                <div class="description">Truy cập mở đến kho tàng tri thức kinh doanh</div>
            </div>
            <div class="testimonials">
                <Slider
                    slideItems={testimonials.map(({avatar, name, title, message}) => ({
                        id: `${name}, ${avatar}`,
                        render: () => (
                            <div class="card">
                                <div class="avatar">
                                    <ImageView>
                                        <img src={avatar} alt={name} loading="lazy" />
                                    </ImageView>
                                </div>
                                <div class="name">{name}</div>
                                <div class="title">{title}</div>
                                <div class="message">{message}</div>
                            </div>
                        )
                    }))}
                />
            </div>
        </section>
    );
};
