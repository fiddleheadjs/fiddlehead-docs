import './Demo.less';

export let Demo = () => {
    return (
        <div class="Demo">
            <iframe
                src="https://codesandbox.io/embed/fiddlehead-simple-example-d5pg76?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark"
                style={{width: '100%', height: '600px', border: 0, borderRadius: '4px', overflow: 'hidden'}}
                title="Fiddlehead - Stateful Component"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
        </div>
    );
};
