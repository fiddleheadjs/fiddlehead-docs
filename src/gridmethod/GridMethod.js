import {useEffect, useMemo, useState} from 'fiddlehead';
import './GridMethod.less';

let gridColumns = new Array(29).fill().map((_, i) => i + 2);
let limitedPercentages = new Array(11).fill().map((_, i) => 10 * i);
let unlimitedPercentages = new Array(31).fill().map((_, i) => 10 * i);

export let GridMethod = () => {
    let [options, setOptions] = useState(() => {
        try {
            let jsonInvalidValue = '';
            return JSON.parse(
                sessionStorage.getItem('gridmethod:options') ?? jsonInvalidValue
            );
        } catch (thrown) {
            return {
                grid: true,
                columns: 10,
                color: 'white',
                opacity: 20,
                grayscale: 0,
                brightness: 100,
                saturate: 100,
                contrast: 100,
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

    let [imageData, setImageData] = useState(sessionStorage.getItem('gridmethod:imageData'));
    let [aspectRatio, setAspectRatio] = useState(Number(sessionStorage.getItem('gridmethod:aspectRatio') ?? '1.618'));

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

    return (
        <div class="GridMethod">
            <div class="canvas">
                {imageData != null && (
                    <img
                        src={imageData}
                        onLoad={handleImageLoad}
                        style={{
                            filter: [
                                `grayscale(${grayscale}%)`,
                                `saturate(${saturate}%)`,
                                `brightness(${brightness}%)`,
                                `contrast(${contrast}%)`,
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
                            <th>Photo:</th>
                            <td>
                                <label class="browse-file">
                                    <input name="photo" type="file" accept="image/*" onChange={handleFileInputChange} />
                                    <span>browse file</span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <strong># Grid options</strong>
                            </td>
                        </tr>
                        <tr>
                            <th>Grid:</th>
                            <td>
                                <label>
                                    <input name="grid" type="checkbox" checked={grid} onChange={handleOptionInputChange} />
                                    {' '}
                                    <span>{grid ? '(visible)' : '(hidden)'}</span>
                                </label>
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
                            <td colspan="2">
                                <strong># Photo filters</strong>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
};
