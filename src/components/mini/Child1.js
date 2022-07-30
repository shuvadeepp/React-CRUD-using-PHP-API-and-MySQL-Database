import React from "react";

export default function Child1({hello}) {
    return(
       <>
            <h1>hello child1</h1>
            parent record render here :- {hello}
       </>
    );
}