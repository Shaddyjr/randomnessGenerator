import React, { Component } from 'react';
import Words from "../generateRandom/lib/words";

class Names extends Component {
    constructor(props){
        super(props);
        this.slider = React.createRef();
    }

    generator = new Words();
    state = {
        words  : [""],
        length : 1
    }

    handleSubmit = () => {
        this.setState({words: this.generator.words(this.state.length)});
    }

    handleSlider = () => {
        this.setState({length : this.slider.current.valueAsNumber});
    }

    render() { 
        return (
            <div>
                <button onClick={this.handleSubmit}>Generate Word</button>
                <label htmlFor="length">{this.state.length}</label>
                <input ref={this.slider} onChange={this.handleSlider} type="range" name="length" min="1" max="100" value={this.state.length}/>
                {this.state.words.map((word,i) => <div key={i} className="container">{word}</div>)}
            </div>
        );
    }
}
 
export default Names;