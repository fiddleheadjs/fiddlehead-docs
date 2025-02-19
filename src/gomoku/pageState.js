// Reference: https://developer.chrome.com/blog/page-lifecycle-api/

let listeners = new Set();

export let addWindowStateChangeListener = (callback) => {
    listeners.add(callback);
};

export let removeWindowStateChangeListener = (callback) => {
    listeners.delete(callback);
};

export const STATE_HIDDEN = 'hidden';
export const STATE_ACTIVE = 'active';
export const STATE_PASSIVE = 'passive';
export const STATE_FROZEN = 'frozen';
export const STATE_TERMINATED = 'terminated';

let getState = () => {
    if (document.visibilityState === 'hidden') {
        return STATE_HIDDEN;
    }
    if (document.hasFocus()) {
        return STATE_ACTIVE;
    }
    return STATE_PASSIVE;
};

// Stores the initial state using the `getState()` function (defined above).
let state = getState();

// Accepts a next state and, if there's been a state change, logs the
// change to the console. It also updates the `state` value defined above.
let logStateChange = (nextState) => {
    if (nextState !== state) {
        listeners.forEach((callback) => {
            callback(nextState);
        });
        state = nextState;
    }
};

// Options used for all event listeners.
let options = {capture: true};

// These lifecycle events can all use the same listener to observe state
// changes (they call the `getState()` function to determine the next state).
['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach((type) => {
    window.addEventListener(type, () => logStateChange(getState()), options);
});

// The next two listeners, on the other hand, can determine the next
// state from the event itself.
window.addEventListener('freeze', () => {
    // In the freeze event, the next state is always frozen.
    logStateChange(STATE_FROZEN);
}, options);

window.addEventListener('pagehide', (event) => {
    // If the event's persisted property is `true` the page is about
    // to enter the back/forward cache, which is also in the frozen state.
    // If the event's persisted property is not `true` the page is
    // about to be unloaded.
    logStateChange(event.persisted ? STATE_FROZEN : STATE_TERMINATED);
}, options);
