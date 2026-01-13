export let trackPageViewEvent = () => {
    fbqEmit('track', 'PageView');
};

export let trackLeadEvent = () => {
    fbqEmit('track', 'Lead');
};

export let trackSubscribeEventIfAny = () => {
    // Track payment success notification page
    // https://aimba.vn/payment-success?payment_success=true&orderCode=3532837057757&package=Pro%20730&amount=600000
    try {
        let url = new URL(location.href);
        if (url.pathname !== '/payment-success') {
            return;
        }
        let amount = url.searchParams.get('amount');
        if (amount === null) {
            return;
        }
        amount = amount.replace(/\D/g, '');
        let flag = sessionStorage.getItem('fbq.track.subscribe');
        if (flag === amount) {
            return;
        }
        fbqEmit('track', 'Subscribe', {
            currency: 'VND',
            value: amount,
            predicted_ltv: amount
        });
        sessionStorage.setItem('fbq.track.subscribe', amount);
    } catch (error) {
        console.error(error);
    }
};

let fbqEmit = (...args) => {
    if (window.fbq) {
        window.fbq(...args);
    } else {
        console.info('no.fbq', ...args);
    }
}
