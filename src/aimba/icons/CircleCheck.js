export let CircleCheck = ({ circleColor = 'currentColor', checkColor = 'white' }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z" fill={circleColor} />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.63471 13.6819L15.5262 8L17.3335 9.82576L9.63471 17.3333L5.3335 13.1231L7.1408 11.2973L9.63471 13.6819Z" fill={checkColor} />
        </svg>
    );
};
