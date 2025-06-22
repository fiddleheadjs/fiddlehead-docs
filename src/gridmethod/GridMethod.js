import './GridMethod.less';
import {useEffect, useMemo, useState} from 'fiddlehead';

/**
 * @type {WakeLockSentinel}
 */
let screenWakeLock = null;
let requestScreenWakeLock = (callback = () => undefined) => {
    if (!('wakeLock' in navigator)) {
        callback(false);
        return;
    }
    if (screenWakeLock != null && !screenWakeLock.released) {
        callback(!screenWakeLock.released);
        return;
    }
    navigator.wakeLock.request('screen').then((sentinel) => {
        screenWakeLock = sentinel;
    }).finally(() => {
        if (screenWakeLock == null) {
            callback(false);
            return;
        }
        callback(!screenWakeLock.released);
        screenWakeLock.onrelease = () => {
            callback(!screenWakeLock.released);
        };
    });
};
let releaseScreenWakeLock = (callback = () => undefined) => {
    if (screenWakeLock == null) {
        callback(false);
        return;
    }
    screenWakeLock.release().finally(() => {
        callback(!screenWakeLock.released);
    });
};

let gridColumns = new Array(99).fill().map((_, i) => i + 2);
let limitedPercentages = new Array(11).fill().map((_, i) => 10 * i);
let unlimitedPercentages = new Array(31).fill().map((_, i) => 10 * i);
let defaultGridOptions = {
    grid: true,
    columns: 12,
    color: 'white',
    opacity: 10,
};
let defaultPhotoOptions = {
    grayscale: 0,
    brightness: 100,
    saturate: 100,
    contrast: 100,
    blur: 0
};
let defaultAspectRatio = 12 / 5;

export let GridMethod = () => {
    let [options, setOptions] = useState(() => {
        try {
            let jsonInvalidValue = '';
            return JSON.parse(
                sessionStorage.getItem('gridmethod:options') ?? jsonInvalidValue
            );
        } catch (thrown) {
            return {
                ...defaultGridOptions,
                ...defaultPhotoOptions,
            };
        }
    });

    const {
        grid,
        columns,
        color,
        opacity,
        grayscale,
        saturate,
        brightness,
        contrast,
        blur
    } = options;

    let handleOptionInputChange = (event) => {
        let {name, value, checked} = event.target;
        let normalizedValue;
        switch (name) {
            case 'color':
                normalizedValue = value;
                break;
            case 'grid':
                normalizedValue = checked;
                break;
            default:
                normalizedValue = Number(value);
        }
        setOptions(options => ({
            ...options,
            [name]: normalizedValue
        }));
    };

    let [imageData, setImageData] = useState(
        sessionStorage.getItem('gridmethod:imageData') ?? ''
    );
    let [aspectRatio, setAspectRatio] = useState(
        Number(sessionStorage.getItem('gridmethod:aspectRatio')) || defaultAspectRatio
    );

    let reader = useMemo(() => {
        let reader = new FileReader();
        reader.onload = (event) => {
            setImageData(event.target.result);
        };
        return reader;
    }, []);

    let handleFileInputChange = (event) => {
        let [file] = event.target.files;
        if (file != null && file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        }
    };

    let handleImageLoad = (event) => {
        const {naturalWidth, naturalHeight} = event.target;
        setAspectRatio(naturalWidth / naturalHeight);
    };

    let rows = Math.ceil(columns / aspectRatio);

    useEffect(() => {
        sessionStorage.setItem('gridmethod:options', JSON.stringify(options));
    }, [options]);

    useEffect(() => {
        if (imageData.length <= 4 * 1024 * 1024) {
            sessionStorage.setItem('gridmethod:imageData', imageData);
            sessionStorage.setItem('gridmethod:aspectRatio', aspectRatio.toString());
        }
    }, [imageData, aspectRatio]);

    let handleResetGrid = () => {
        setOptions(options => ({
            ...options,
            ...defaultGridOptions,
        }));
    };

    let handleResetPhoto = () => {
        setOptions(options => ({
            ...options,
            ...defaultPhotoOptions,
        }));
        setImageData('');
        setAspectRatio(defaultAspectRatio);
    };

    let [wakeLockEnabled, setWakeLockEnabled] = useState(false);

    let handleToggleWakeLock = () => {
        if (wakeLockEnabled) {
            releaseScreenWakeLock(setWakeLockEnabled);
        } else {
            requestScreenWakeLock(setWakeLockEnabled);
        }
    };

    return (
        <div class="GridMethod">
            <div class="canvas">
                {imageData === '' && (
                    <h1>Grid Method</h1>
                )}
                {imageData !== '' && (
                    <img
                        src={imageData}
                        onLoad={handleImageLoad}
                        style={{
                            filter: [
                                `grayscale(${grayscale}%)`,
                                `saturate(${saturate}%)`,
                                `brightness(${brightness}%)`,
                                `contrast(${contrast}%)`,
                                `blur(${blur}px)`,
                            ].join(' ')
                        }}
                    />
                )}
                <table
                    style={{
                        color: color,
                        visibility: grid ? 'visible' : 'hidden',
                        opacity: opacity / 100,
                    }}
                >
                    <tbody>
                        {new Array(rows).fill().map(() => (
                            <tr>
                                {new Array(columns).fill().map(() => (
                                    <td>
                                        <svg viewBox="0 0 1 1" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div class="controls">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <strong># Grid</strong>
                            </th>
                            <td>
                                <label class="button">
                                    <input name="grid" type="checkbox" checked={grid} onChange={handleOptionInputChange} />
                                    <span class={grid ? null : 'faded'}>visible</span>
                                    {' '}
                                    <span class="faded">&middot;</span>
                                    {' '}
                                    <span class={grid ? 'faded' : null}>hidden</span>
                                </label>
                                {' '}
                                <button type="button" class="button" onClick={handleResetGrid}>reset</button>
                            </td>
                        </tr>
                        <tr>
                            <th>Columns:</th>
                            <td>
                                <select
                                    name="columns"
                                    onChange={handleOptionInputChange}
                                >
                                    {gridColumns.map(value => (
                                        <option value={value} selected={value === columns}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Rows:</th>
                            <td>
                                <input name="rows" type="text" value={rows} readonly />
                            </td>
                        </tr>
                        <tr>
                            <th>Color:</th>
                            <td>
                                <select
                                    name="color"
                                    onChange={handleOptionInputChange}
                                >
                                    {['black', 'white', 'red', 'green', 'blue'].map(value => (
                                        <option value={value} selected={value === color}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Opacity:</th>
                            <td>
                                <select
                                    name="opacity"
                                    onChange={handleOptionInputChange}
                                >
                                    {limitedPercentages.map(value => (
                                        <option value={value} selected={value === opacity}>
                                            {value}%
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <th>
                                <strong># Photo</strong>
                            </th>
                            <td>
                                <label class="button">
                                    <input name="photo" type="file" accept="image/*" onChange={handleFileInputChange} />
                                    <span>browse file</span>
                                </label>
                                {' '}
                                <button type="button" class="button" onClick={handleResetPhoto}>reset</button>
                            </td>
                        </tr>
                        <tr>
                            <th>Grayscale:</th>
                            <td>
                                <select
                                    name="grayscale"
                                    onChange={handleOptionInputChange}
                                >
                                    {limitedPercentages.map(value => (
                                        <option value={value} selected={value === grayscale}>
                                            {value}%
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Brightness:</th>
                            <td>
                                <select
                                    name="brightness"
                                    onChange={handleOptionInputChange}
                                >
                                    {unlimitedPercentages.map(value => (
                                        <option value={value} selected={value === brightness}>
                                            {value}%
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Saturate:</th>
                            <td>
                                <select
                                    name="saturate"
                                    onChange={handleOptionInputChange}
                                >
                                    {unlimitedPercentages.map(value => (
                                        <option value={value} selected={value === saturate}>
                                            {value}%
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Contrast:</th>
                            <td>
                                <select
                                    name="contrast"
                                    onChange={handleOptionInputChange}
                                >
                                    {unlimitedPercentages.map(value => (
                                        <option value={value} selected={value === contrast}>
                                            {value}%
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Blur:</th>
                            <td>
                                <select
                                    name="blur"
                                    onChange={handleOptionInputChange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(value => (
                                        <option value={value} selected={value === blur}>
                                            {value}px
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <th>
                                <strong># Other</strong>
                            </th>
                        </tr>
                        <tr>
                            <th>Wake lock:</th>
                            <td>
                                <button type="button" class="button" onClick={handleToggleWakeLock}>
                                    <span class={wakeLockEnabled ? null : 'faded'}>enabled</span>
                                    {' '}
                                    <span class="faded">&middot;</span>
                                    {' '}
                                    <span class={wakeLockEnabled ? 'faded' : null}>disabled</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};
