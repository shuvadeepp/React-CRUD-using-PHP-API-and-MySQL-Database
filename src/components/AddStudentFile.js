import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddStudentFile() {

    // let history = useNavigate();
    let [errormsg, seterrormsg] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selCountry, setselCountry] = useState([]);
    const [selState, setselState] = useState([]);
    const [selectedCountry, setselectedCountry] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        loadcountry();
    },[]);

    const handleFileInput = (e) => {
        // handle validations
        setSelectedFile(e.target.files[0])
    }

    const loadstates = async (countryval) => {
        setselectedCountry(countryval);
        const parameter = { method: "getallstates", country : countryval};
        const headers = { 
            "Content-Type": "application/json"
        };
        const resultArr = await axios.post("http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/state-city.php", parameter , {headers})
        .then(response => {
            return response.data
        })
        .then(data => {
            console.log(data.result)
            setselState(data.result)
         })
         .catch(error => {
            console.log(error.response.data.error)
         });

    }
    
    const submitForm = async (e) => {

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("fileUpload", selectedFile);
        formData.append("country", selectedCountry);
        formData.append("state", selectedState);
        // console.log(country)
         for (var pair of formData.entries()) {
            console.log(pair[0]+ ' - ' + pair[1]); 
        } 

        e.preventDefault();
        const headers = { 
            "Content-Type": "multipart/form-data"
        };
        await axios.post("http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/index.php", formData, {headers})
        // .then((result) => {
        //     console.log(result); 
        //     if (result.data.status == 'valid') {
        //         history('/list-student');
        //     }
        // });
        .then(response => {
            return response.data
         })
         .then(data => {
            console.log(data)

            if(data.status == 1) {
                
                localStorage.setItem('msg', 'Record Added Successfully.');
                navigate('/list-student');
                
            } else {
                seterrormsg(data.msg)
            }
         })
         .catch(error => {
            console.log(error.response.data.error)
         });
        
    }


    const loadcountry = async () => {
        const parameter = { method: "getallcountry" };
        const headers = { 
            "Content-Type": "application/json"
        };
        const resultArr = await axios.post("http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/state-city.php", parameter , {headers})
        .then(response => {
            return response.data
        })
        .then(data => {
            //console.log(data.result)
            setselCountry(data.result)
         })
         .catch(error => {
            console.log(error.response.data.error)
         });
    }

//console.log(selCountry)
    return(
        <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>Add Student</h1>
                </div>
            </div>

            <div className="row">
                <form onSubmit={ e => submitForm(e) } >
                    <table cellSpacing="10" >
                    <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">Name: </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                className="form-control" 
                                onChange={(e) => setName(e.target.value)}  
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">Email: </label>
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                className="form-control"  
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mobile">Mobile: </label>
                            <input 
                                type="text" 
                                name="mobile" 
                                id="mobile" 
                                maxLength={10} 
                                onChange={(e) => setMobile(e.target.value)} 
                                className="form-control" 
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="Country">Country: </label>
                            <select className="form-control" name='country' id='country' onChange={(e) => loadstates(e.target.value)}>
                                <option value="">--select--</option>  
                                {selCountry.map((selCountry, index) => (
                                    <option value={selCountry} key={index}>{selCountry}</option>
                                ))}                             
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="state">State: </label>
                            <select className="form-control" name='state' id='state' onChange={(e) => setSelectedState(e.target.value)}  >
                                <option value="">--select--</option>   
                                {selState.map((selState, idx) => (
                                    <option value={selState} key={idx}> {selState} </option>
                                ))}                               
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mobile"> Upload File: </label>
                            <input 
                                type="file" 
                                name="fileUpload"
                                id="fileUpload"
                                className="form-control" 
                                onChange={handleFileInput}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span></span>
                            <button className="btn btn-success"> Save </button>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </form>  
            </div>
        </>
    )
}