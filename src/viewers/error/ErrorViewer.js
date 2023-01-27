import './ErrorViewer.less';

export let ErrorViewer = ({title, detail}) => {
    return (
        <div class="ErrorViewer">
            <h1>{title}</h1>
            {
                detail != null &&
                <p>{detail}</p>
            }
        </div>
    );
};
