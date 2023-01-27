import {format} from 'pretty-format';

// Helpers:

let stringify = (values) => {
    if (values.length > 0) {
        return [].map.call(values, value => format(value)).join(' ');
    }
    return format(undefined);
};

let normalizeLabel = (rawLabel) => {
    if (rawLabel === undefined) {
        return 'default';
    }
    return String(rawLabel);
};

// Console context:

export let createConsoleContext = () => ({
    timers: new Map(),
    counters: new Map(),
});

let clearConsoleContext = (context) => {
    context.timers.clear();
    context.counters.clear();
};

// Console methods:
// Use 'function' to access the context via 'this' pointer
// Use 'arguments' to keep the fn.length is zero as the browsers' implementations

function log() {
    return stringify(arguments);
}

function error() {
    return stringify(arguments);
}

function warn() {
    return stringify(arguments);
}

function info() {
    return stringify(arguments);
}

function table() {
    return stringify([arguments[0]]);
}

function assert() {
    let [passed, ...tags] = arguments;
    if (passed) {
        return;
    }
    if (tags.length === 0) {
        return 'Assertion failed';
    }
    return `Assertion failed: ${stringify(tags)}`;
}

function time() {
    let label = normalizeLabel(arguments[0]);
    if (this.timers.has(label)) {
        return `Timer '${label}' already exists`;
    }
    this.timers.set(label, performance.now());
}

function timeEnd() {
    let label = normalizeLabel(arguments[0]);
    let startTime = this.timers.get(label);
    if (startTime === undefined) {
        return `Timer '${label}' does not exist`;
    }
    this.timers.delete(label);
    return `${label}: ${performance.now() - startTime}ms`;
}

function count() {
    let label = normalizeLabel(arguments[0]);
    let currentCount = this.counters.get(label);
    if (currentCount === undefined) {
        currentCount = 0;
    }
    currentCount++;
    this.counters.set(label, currentCount);
    return `${label}: ${currentCount}`;
}

function countReset() {
    let label = normalizeLabel(arguments[0]);
    if (!this.counters.has(label)) {
        return `Count for '${label}' does not exist`;
    }
    this.counters.delete(label);
    return `${label}: 0`;
}

function clear() {
    clearConsoleContext(this);
    return 'Console was cleared';
}

export let consol2 = {
    log,
    error,
    warn,
    info,
    table,
    assert,
    time,
    timeEnd,
    count,
    countReset,
    clear,
};
