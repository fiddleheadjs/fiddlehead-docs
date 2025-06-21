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

    let [rows, setRows] = useState(10);
    let [cols, setCols] = useState(10);
    let [color, setColor] = useState('gray');

    let handleRowsInputChange = (event) => {
        setRows(Number(event.target.value));
    };

    let handleColsInputChange = (event) => {
        setCols(Number(event.target.value));
    };

    let handleColorInputChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <div class="GridMethod">
            <div class="canvas">
                {imageData != null && (
                    <img src={imageData} />
                )}
                <table style={{color: color}}>
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
                <div class="control">
                    <input type="file" accept="image/*" onChange={handleFileInputChange} />
                </div>
                <div class="control">
                    <label>Rows:</label>
                    <input type="number" value={rows} onChange={handleRowsInputChange} />
                </div>
                <div class="control">
                    <label>Columns:</label>
                    <input type="number" value={cols} onChange={handleColsInputChange} />
                </div>
                <div class="control">
                    <label>Color:</label>
                    <input type="text" value={color} onChange={handleColorInputChange} />
                </div>
            </div>
        </div>
    )
};
