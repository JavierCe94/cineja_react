import React from 'react';

const Legend = (props) => {
    return (
        <div className={props.className}>
            <span>Butaca: </span>
            <button className="seat-select margin-right-10" type="button">&#x2713;</button>
            <span>Selecionada: </span>
            <button className="seat-select-sel margin-right-10" type="button">&#x2713;</button>
            <span>Espacio: </span>
            <button className="seat-select-space" type="button">&#x2713;</button>
        </div>
    );
}

export default Legend;
