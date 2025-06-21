import {useMemo, useState} from 'fiddlehead';
import './GridMethod.less';

export let GridMethod = () => {
    let [grid, setGrid] = useState(true);
    let [rows, setRows] = useState(6);
    let [cols, setCols] = useState(10);
    let [color, setColor] = useState('white');
    let [opacity, setOpacity] = useState(20);

    let handleGridCheckboxChange = (event) => {
        setGrid(event.target.checked);
    };

    let handleRowsInputChange = (event) => {
        setRows(Number(event.target.value));
    };

    let handleColsInputChange = (event) => {
        setCols(Number(event.target.value));
    };

    let handleColorInputChange = (event) => {
        setColor(event.target.value);
    };

    let handleOpacityInputChange = (event) => {
        setOpacity(Number(event.target.value));
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
        const defaultRows = Math.ceil(cols * naturalHeight / naturalWidth);
        setRows(defaultRows);
    };

    return (
        <div class="GridMethod">
            <div class="canvas">
                {imageData != null && (
                    <img
                        src={imageData}
                        onLoad={handleImageLoad}
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
                                {new Array(cols).fill().map(() => (
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
                                <input name="photo" type="file" accept="image/*" onChange={handleFileInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Grid:</th>
                            <td>
                                <label>
                                    <input name="grid" type="checkbox" checked={grid} onChange={handleGridCheckboxChange} />
                                    {' '}
                                    <span>{grid ? '(visible)' : '(hidden)'}</span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th>Rows:</th>
                            <td>
                                <input name="rows" type="number" value={rows} onChange={handleRowsInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Cols:</th>
                            <td>
                                <input name="cols" type="number" value={cols} onChange={handleColsInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Color:</th>
                            <td>
                                <select
                                    name="color"
                                    onChange={handleColorInputChange}
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
                                    onChange={handleOpacityInputChange}
                                >
                                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(value => (
                                        <option value={value} selected={value === opacity}>
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
