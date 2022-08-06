import React, {useState} from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Studentadd() {
    
    
    const [boardName, setBoardName]             = useState("");
    const [percentage, setPersentage]           = useState("");
    const [startDate, setStartDate]             = useState(new Date());
    const [uploadfile, setUpdatefile]           = useState(null);

    //console.log(new Date().toISOString().slice(0, 10))
    const [inputlist, setInputlist] = useState([
        { boardName: '', percentage: '', stuDate: new Date().toISOString().slice(0, 10), uploadfile: '' }
    ]);

    // handle input change
    const handleChangeInput = (e, index, type=0,isfile=0) => {
        let data = [...inputlist];
        
        if(type == 1){
            let formattedDate = e.toISOString().slice(0, 10)
            data[index]['stuDate'] = formattedDate;
        }else{
            data[index][e.target.name] = e.target.value;
        }

        if(isfile == 1){
            let fileData = e.target.files[0]
            data[index]['uploadfile'] = fileData;
        }
        
        setInputlist(data);
        
    };

    //Add More
    const handleAddClk = () => { 
        // alert(111); 
        let addmore = { boardName: '', percentage: '', stuDate: '', uploadfile: '' }
        setInputlist([...inputlist, addmore]);
    }

    //Remove
    const handleRemoveClk = index => {
        const list = [...inputlist];
            list.splice(index, 1);
            setInputlist(list);
    }

    const handleDateChange = (e,i) => {
        //const valueOfInput = date.format();
        ///...
        //console.log(e)
        setStartDate(e)
        handleChangeInput(e,i,1)
      };

      
    const handleFileInput = (e) => {
        setUpdatefile(e.target.files[0]);
    }

    //Submit Form
    const submit = async(e) => {
        e.preventDefault();
        //const files = e.target.files;
        //console.log(files);
    /* for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    } */ 
    const formData = new FormData();
     //console.log(inputlist);

    /* const formData = new FormData();
    formData.append("fileUpload", uploadfile); */
    /* for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    } */ 
    for(let i = 0; i < inputlist.length; i++){
        formData.append("boardName[]", inputlist[i].boardName);
        formData.append("percentage[]", inputlist[i].percentage);
        formData.append("stuDate[]", inputlist[i].stuDate);
        formData.append("fileUpload[]", inputlist[i].uploadfile);
    }
    //formData.append("allfields",inputlist);

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ' - ' + pair[1]); 
    }
    // console.log(formData);
    //return false;
        const postArray = {
            "method": "insert",
            "multipleadd": inputlist

        }
        console.log(postArray)

        let res = await axios({
            method: 'post',
            url: 'http://localhost:8181/practice_shuvadeep/samirSirAPI/api.php',
            data:formData,
            header : {
                "Content-Type": "application/json",
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            return response.data
         })
         .then(data => {
            console.log(data)
         })
         .catch(error => {
            console.log(error.response.data.error)
         }); 
        
    }
    

    // Date Picker:
    return (
        <>
            <div className="row">
                <div className="col-sm012">

                    <h5></h5>
                    <form onSubmit={submit}>
                    {inputlist.map((x, i) => {
                       return ( 
                    <div className="row mb-3" key={i}>
                        <div className="form-group col-md-4">
                            <label htmlFor="name" className="Form-label"> Board Name: </label>
                            <input 
                                type="text" 
                                className="form-control"  
                                name="boardName"
                                id="boardName" 
                               onChange={ e => handleChangeInput(e, i) }
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="name" className="Form-label"> Persentage: </label>
                            <input 
                                type="text" 
                                className="form-control"  
                                name="percentage"
                                id="percentage" 
                                onChange={ e => handleChangeInput(e, i) }
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="name" className="Form-label"> Date: </label>
                            <DatePicker 
                                dateFormat="dd/MM/yyyy"
                                selected={startDate} 
                                //onChange={(date:Date) => setStartDate(date)} 
                                onChange={e => handleDateChange(e,i)}
                                //onChange={ e => handleChangeInput(e, i) } 
                                className="form-control"  
                                name="stuDate"
                                id="stuDate"
                            />
                            
                            
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="mobile"> Upload File: </label>
                                <input 
                                    type="file" 
                                    name="fileUpload"
                                    id="fileUpload"
                                    className="form-control" 
                                    onChange={e => handleChangeInput(e, i, 0, 1)}
                                />
                        </div>
                        

                        <div className="btn-box">
                            {
                                inputlist.length - 1 === i && 
                                <button onClick={handleAddClk}>Add</button>
                            }
                            {
                                inputlist.length - 1 !== i && 
                                <button className="mr10"
                                onClick={() => handleRemoveClk(i)}>Remove</button>
                            }
                        </div>
                    </div>

                       )
                    })}
                    
                    <button onClick={submit}> SUBMIT </button>

                    </form>
                </div>
            </div>
        </>
    )
}