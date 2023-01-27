import {init, consol2} from './simulation';

let transplant = (methodName, consol1, handleCommand) => {
    let method1 = consol1[methodName].bind(consol1);
    let method2 = consol2[methodName].bind(consol1);

    consol1[methodName] = function (...args) {
        handleCommand(methodName, method2(...args));
        return method1(...args);
    };
};

export let consoleTransplant = (consol1, handleCommand) => {
    init(consol1);

    for (let methodName in consol2) {
        if (consol2.hasOwnProperty(methodName)) {
            transplant(methodName, consol1, handleCommand);
        }
    }
};
