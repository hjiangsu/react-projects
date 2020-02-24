import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Output extends React.Component {
    render() {
        return (
            <div className="outputComponent" >
                <h1>Result</h1>
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}

class Input extends React.Component {
    render() {
        return (
            <div className="inputComponent">
                <button onClick = {this.props.onDecrease}>Decrease</button>
                <button onClick = {this.props.onIncrease}>Increase</button>
            </div>
        );
    }
}

class FizzBuzz extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            current_number: 0,
            current_text: null
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.updateText = this.updateText.bind(this)
    }

    updateText() {
        const number = this.state.current_number;

        if (number % 3 === 0 && number % 5 === 0) {
            this.setState((state) => {
                return {current_text: "FizzBuzz"}
            })
        }
        else if (number % 3 === 0) {
            this.setState((state) => {
                return {current_text: "Fizz"}
            })
        }
        else if (number % 5 === 0) {
            this.setState((state) => {
                return {current_text: "Buzz"}
            })
        }
        else {
            this.setState((state) => {
                return {current_text: this.state.current_number}
            })
        }
    }

    increment() {
        this.setState((state) => {
            return {current_number: state.current_number + 1}
        });
    }

    decrement() {
        this.setState((state) => {
            return {current_number: state.current_number - 1}
        });
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.current_number != prevState.current_number){
            this.updateText()
        }
    }

    render() {
        const current_number = this.state.current_number
        const current_text = this.state.current_text

        return (
            <div className="parentComponent">
                <h1>Input Number</h1>
                <p>{current_number}</p>
                <Input onIncrease={this.increment} onDecrease={this.decrement}/>
                <Output text={current_text}/>
            </div>

        );
    }
}

ReactDOM.render (
    <FizzBuzz />,
    document.getElementById('root')
);