import {useMemo, useState} from 'fiddlehead';
import './GridMethod.less';

let percentageOptions = new Array(31).fill().map((_, i) => 10 * i);
let percentageOver100Options = new Array(31).fill().map((_, i) => 10 * i);

export let GridMethod = () => {
    let [
        {
            grid,
            rows,
            columns,
            color,
            opacity,
            grayscale,
            saturate,
            brightness,
            contrast,
        },
        setOptions
    ] = useState(
        {
            grid: true,
            rows: 6,
            columns: 10,
            color: 'white',
            opacity: 20,
            grayscale: 0,
            brightness: 100,
            saturate: 100,
            contrast: 100,
        }
    );

    let handleOptionInputChange = (event) => {
        let { type, name, value, checked } = event.target;
        let normalizedValue;
        switch (type) {
            case 'number':
                normalizedValue = Number(value);
                break;
            case 'checkbox':
            case 'radio':
                normalizedValue = checked;
                break;
            case 'text':
            case 'select-one':
            default:
                normalizedValue = value;
        }
        setOptions(options => ({
            ...options,
            [name]: normalizedValue
        }));
    };

    let [imageData, setImageData] = useState(null);

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
        const defaultRows = Math.ceil(columns * naturalHeight / naturalWidth);
        setOptions(options => ({
            ...options,
            rows: defaultRows
        }));
    };

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
                            <td colspan="2">
                                <input name="photo" type="file" accept="image/*" onChange={handleFileInputChange} />
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
                            <th>Rows:</th>
                            <td>
                                <input name="rows" type="number" value={rows} onChange={handleOptionInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Columns:</th>
                            <td>
                                <input name="columns" type="number" value={columns} onChange={handleOptionInputChange} />
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
                                    {percentageOptions.map(value => (
                                        <option value={value} selected={value === opacity}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <strong># Photo options</strong>
                            </td>
                        </tr>
                        <tr>
                            <th>Grayscale:</th>
                            <td>
                                <select
                                    name="grayscale"
                                    onChange={handleOptionInputChange}
                                >
                                    {percentageOptions.map(value => (
                                        <option value={value} selected={value === grayscale}>
                                            {value}
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
                                    {percentageOver100Options.map(value => (
                                        <option value={value} selected={value === brightness}>
                                            {value}
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
                                    {percentageOver100Options.map(value => (
                                        <option value={value} selected={value === saturate}>
                                            {value}
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
                                    {percentageOver100Options.map(value => (
                                        <option value={value} selected={value === contrast}>
                                            {value}
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
