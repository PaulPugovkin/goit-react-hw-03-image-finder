import React, { Component } from 'react';

import './App.css';

class App extends Component {
    state = {};

    componentDidMount() {
        console.log('This is mount');
    }

    componentDidUpdate() {
        console.log('This is update');
    }

    render() {
        return <>123</>;
    }
}

export default App;
