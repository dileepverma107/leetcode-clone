import React, { useState } from 'react';

function CardComponent(props) {
    const [text, setText] = useState('Some quick example text to build on the card title and make up the bulk of the card');

    const handleClick = () => {
        setText('Modified Content');
    };

    const changeHandle = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="container">
            <header className="my-4">
                <h1 className="display-4">Bootstrap in React</h1>
                <button className="btn btn-primary" onClick={handleClick}>Primary Button</button>
            </header>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card Title</h5>
                            <p className="card-text">{text}</p> {/* This <p> tag will display the text */}
                            <a href="https://dileep.com" className="btn btn-secondary">Go somewhere</a>
                            <textarea
                                rows={4}
                                value={text} // Set value to control the content
                                onChange={changeHandle} // Use onChange for updating state
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
