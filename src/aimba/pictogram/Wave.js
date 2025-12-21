export let Wave = ({active}) => {
    let waveCurve = 'M396.468 48.7473C184.485 52.9502 41.9966 93.9364 -1 118.471V150L1921 150C1920.5 150 1921.2 73.7821 1920.2 0C1878.7 27.6989 1725.86 55.7314 1554.88 73.0847C1336.89 94.7764 1028.42 81.094 924.426 73.0847C590.453 50.3917 446.964 47.7462 396.468 48.7473Z';
    let waveFlat = 'M396.468 60C184.485 60 41.9966 60 -1 60V150L1921 150C1920.5 150 1921.2 60 1920.2 60C1878.7 60 1725.86 60 1554.88 60C1336.89 60 1028.42 60 924.426 60C590.453 60 446.964 60 396.468 60Z';

    return (
        <svg viewBox="0 0 1920 150">
                <path
                    fill="url(#wave-background-gradient)"
                    d={active ? waveCurve : waveFlat}
                />
            <defs>
                <linearGradient
                    id="wave-background-gradient"
                    x1="0"
                    y1="150"
                    x2="1920"
                    y2="150"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.25" stop-color="#1E469E" />
                    <stop offset="1" stop-color="#28A7DF" />
                </linearGradient>
            </defs>
        </svg>
    );
};
