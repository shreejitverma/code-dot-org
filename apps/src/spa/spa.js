require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDom from 'react-dom';

var SPAReact = require('./spa.jsx');

console.log('Hello Dayne and Anna');

// console.log(SPAReact);
ReactDom.render(<SPAReact />);
