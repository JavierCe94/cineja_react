import React from 'react';

const Loader = (props) => {
    return (
        <div className="spinner" style={props.withoutMargin ? {marginTop: 0, marginBottom: 0} : {}}>
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    );
}

export default Loader;
