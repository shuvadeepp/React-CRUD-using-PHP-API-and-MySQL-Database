import React from "react";
import Child1 from './Child1';
import Child2 from './Child2';

export default function Parent() {
    const [data, setData] = React.useState('');
    const parentToChild = () => {
        setData("This is data from Parent Component to the Child Component.");
    }
    return(
       <>
            <h1>hello parent</h1>
            <a primary onClick={() => parentToChild()} > Click Here </a>
            <Child1 hello={data}/>
            <Child2 hello2={data}/>
       </>
    );
}
