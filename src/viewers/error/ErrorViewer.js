import './ErrorViewer.less';

export let ErrorViewer = ({title, detail}) => {
    return (
        <div class="ErrorViewer">
            <h1>{title}</h1>
            <p>{detail}</p>
        </div>
    );
};
