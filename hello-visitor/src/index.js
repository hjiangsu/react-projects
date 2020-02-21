import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// React Component
class Visitor extends React.Component {
    
    // Constructor for the component (to store state properties)
    constructor(props) {
        super(props);
        this.state = {
            text: null
        }
    }

    // Updates the state variable based on the value of the input
    updateOutput() {
        this.setState ({
            text: document.getElementById('input-box').value
        });
    }
    
    render() {
        const text = this.state.text;

        return (
            <div className="parent">
                <div className="input-text-box">
                    <input 
                        id="input-box" 
                        onChange={() => this.updateOutput()}
                        placeholder="Input Text Here"
                    ></input>
                </div>
                <div className="output-text">
                    <h1>Output Text</h1>
                    <p>{text}</p>
                </div>
            </div>
        );
    }
}

ReactDOM.render (
    < Visitor />,
    document.getElementById('root')
)