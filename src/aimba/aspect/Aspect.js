import './Aspect.less';

export let Aspect = ({children}) => {
    return (
        <div class="Aspect">
            <div class="ratio">
                {children}
            </div>
        </div>
    );
};
