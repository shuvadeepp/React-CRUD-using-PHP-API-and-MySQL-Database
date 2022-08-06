import { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// alert(1111);
export default function Ckeditortest() {
    const [isLoad, setLoad] = useState(false);

    useEffect(()=>{
        setLoad(true);
    });
    
    return (
        <>  
            
            <CKEditor editor={ ClassicEditor }/>
                  
        </>
    );
}