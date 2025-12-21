import {useState} from 'fiddlehead';
import './RegistrationForm.less';

export let RegistrationForm = ({onSubmit}) => {
    let [error, setError] = useState(null);

    let onFeedback = (error) => {
        setError(error);
    };

    return (
        <form
            class="RegistrationForm"
            method="POST"
            onSubmit={(event) => {
                event.preventDefault();
                let formData = new FormData(event.target);
                onSubmit({
                    formData,
                    onFeedback
                });
            }}
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
