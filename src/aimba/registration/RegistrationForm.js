import './RegistrationForm.less';
import {useState} from 'fiddlehead';
import {fbqEmit} from '../tracking';

export let RegistrationForm = ({onSubmit}) => {
    let [feedback, setFeedback] = useState(null);

    let handleSubmit = (event) => {
        event.preventDefault();
        setFeedback(null);
        let form = event.target;
        let formData = new FormData(form);
        let onFeedback = (feedback) => {
            setFeedback(feedback);
            if (feedback.type === 'success') {
                form.reset();
            }
        };
        onSubmit({formData, onFeedback});
        fbqEmit('track', 'Lead');
    };

    let handleChange = () => {
        setFeedback(null);
    };

    return (
        <form
            class="RegistrationForm"
            method="POST"
            onSubmit={handleSubmit}
            onChange={handleChange}
        >
            <div class="fields">
                <input
                    type="text"
                    name="name"
                    placeholder="Họ và tên *"
                    autocomplete="off"
                    required
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email *"
                    autocomplete="email"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại *"
                    autocomplete="tel"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    autocomplete="off"
                />
            </div>
            {feedback !== null && ['success', 'error'].includes(feedback.type) && (
                <div class="feedback" data-type={feedback.type}>
                    {feedback.message}
                </div>
            )}
            <button
                type="submit"
                class="x-button"
                tabIndex="0"
            >
                Đăng ký
            </button>
        </form>
    );
};
