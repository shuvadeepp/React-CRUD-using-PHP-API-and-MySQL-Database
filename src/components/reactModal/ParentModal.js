import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ChildModal from './ChildModal'


export default function ParentModal() {

    const [show, setShow] = useState(false);


    // const toggleShow = () => setShow(abc => !abc);
    const toggleShow = () => setShow(!show);

    const [commonArray, setcommonArray] = useState({'name':'samir','age':'25'});
    console.log('hello'+show)
    
    return (
        <>
            <Button variant="primary" onClick={toggleShow}>Add new</Button>
            <ChildModal message="hei you" show={show} toggleShow={toggleShow} header="info" newarray ={commonArray} />
        </>
    )    
}