import {format} from 'pretty-format';

let formatAll = (values) => {
    if (values.length === 0) {
        return format(undefined);
    }

    return values.map(value => format(value)).join(' ');
};

const context = new WeakMap();

export let init = (consol1) => {
    context.set(consol1, {
        timers: new Map(),
    });
};

function log(...values) {
    return formatAll(values);
}

function error(...values) {
    return formatAll(values);
}

function info(...values) {
    formatAll(values);
}

function table(value) {
    return format(value);
}

function time(label = 'default') {
    let timers = context.get(this).timers;
    if (timers.has(label)) {
        return `Timer ${label} already exists`;
    }
    timers.set(label, performance.now());
    return format(undefined);
}

function timeEnd(label = 'default') {
    let timers = context.get(this).timers;
    let startTime = timers.get(label);
    if (startTime === undefined) {
        return `Timer ${label} does not exist`;
    }
    timers.delete(label);
    return `${label}: ${performance.now() - startTime}ms`;
}

function clear() {
    let timers = context.get(this).timers;
    timers.clear();
    return 'Console was cleared';
}

export let consol2 = {
    log,
    error,
    info,
    table,
    time,
    timeEnd,
    clear,
};
