import {useMemo, useState} from 'fiddlehead';
import './GridMethod.less';

export let GridMethod = () => {
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

    let [grid, setGrid] = useState(true);
    let [color, setColor] = useState('black');
    let [rows, setRows] = useState(10);
    let [cols, setCols] = useState(10);

    let handleGridCheckboxChange = (event) => {
        setGrid(event.target.checked);
    };

    let handleColorInputChange = (event) => {
        setColor(event.target.value);
    };

    let handleRowsInputChange = (event) => {
        setRows(Number(event.target.value));
    };

    let handleColsInputChange = (event) => {
        setCols(Number(event.target.value));
    };

    return (
        <div class="GridMethod">
            <div class="canvas">
                {imageData != null && (
                    <img src={imageData} />
                )}
                <table style={{color: color, visibility: grid ? 'visible' : 'hidden'}}>
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
                            <th>Color:</th>
                            <td>
                                <input name="color" type="text" value={color} onChange={handleColorInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Rows:</th>
                            <td>
                                <input name="rows" type="number" value={rows} onChange={handleRowsInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Columns:</th>
                            <td>
                                <input name="cols" type="number" value={cols} onChange={handleColsInputChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};
