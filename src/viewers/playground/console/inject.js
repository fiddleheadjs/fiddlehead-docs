import { format } from 'pretty-format';

let log = (...values) => {
    return values.map(value => format(value)).join(' ');
};

let error = (...values) => {
    return values.map(value => format(value)).join(' ');
};

let info = (...values) => {
    return values.map(value => format(value)).join(' ');
};

let clear = () => {
    return;
};

let consol2 = {
    log,
    error,
    info,
    clear,
};

let inject = (methodName, consol1, handleCommand) => {
    let originalMethod = consol1[methodName].bind(consol1);
    consol1[methodName] = function (...args) {
        handleCommand(methodName, consol2[methodName](...args));
        originalMethod(...args);
    };
};

export let consoleInject = (consol1, handleCommand) => {
    for (let methodName in consol2) {
        if (consol2.hasOwnProperty(methodName)) {
            inject(methodName, consol1, handleCommand);
        }
    }
};
