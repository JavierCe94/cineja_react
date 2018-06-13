import React from 'react';

const Legend = (props) => {
    return (
        <div className={props.className}>
            <div>
                <span className="float-left">Butaca: </span>
                <div className="seat-select margin-right-10 float-left">&#x2713;</div>
            </div>
            <div>
                <span className="float-left">Selecionada: </span>
                <div className="seat-select-sel margin-right-10 float-left">&#x2713;</div>
            </div>
            {
                'admin' === props.typeLegend ?
                <div>
                    <span className="float-left">Espacio: </span>
                    <div className="seat-select-space float-left">&#x2713;</div>
                </div> : 
                <div>
                    <span className="float-left">No disponible: </span>
                    <div className="seat-select-not-available float-left">X</div>
                </div>
            }
        </div>
    );
}

export default Legend;
