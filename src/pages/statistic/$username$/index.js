import React from 'react';
import Overview from './components/Overview';
import ProblemDetail from './components/ProblemDetail';
import LazyLoad from 'react-lazyload';

export default function (props) {
    return (<div>
        <Overview {...props}/>
        <ProblemDetail {...props}/>
    </div>);
}