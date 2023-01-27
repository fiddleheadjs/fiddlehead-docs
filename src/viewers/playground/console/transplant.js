import {consol2, createConsoleContext} from './simulation';

let contextMap = new WeakMap();

export let consoleTransplant = (consol1, commandHandle) => {
    let context = contextMap.get(consol1);
    if (context === undefined) {
        context = createConsoleContext();
        contextMap.set(consol1, context);
    }
    
    for (let methodName in consol2) {
        if (consol2.hasOwnProperty(methodName)) {
            transplant(context, methodName, consol1, commandHandle);
        }
    }
};

let transplant = (context, methodName, consol1, commandHandle) => {
    let method1 = consol1[methodName].bind(consol1);
    let method2 = consol2[methodName].bind(context);

    consol1[methodName] = function (...args) {
        commandHandle(methodName, method2(...args));
        return method1(...args);
    };
};
