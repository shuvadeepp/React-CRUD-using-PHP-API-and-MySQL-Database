import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



export default function EditStudent() {

    // let history = useNavigate();
    let [errormsg, seterrormsg] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOldFile, setSelectedOldFile] = useState(null);
    const [studentdata, setstudentdata] = useState([]);
    
    let { id } = useParams();
    const navigate = useNavigate();

    const handleFileInput = (e) => {
        // handle validations
        setSelectedFile(e.target.files[0])
    }

    useEffect(() =>{
        selectUser();
    },[]);

    const [student, setStudent] = useState([]);
    const [filepath, setfilepath] = useState('http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/img');
    
    const selectUser = async () => {

        const parameter = { id: id };
        const headers = { 
            "Content-Type": "application/json"
        };
        const result = await axios.post('http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/all-users.php', parameter, {headers})
          .then((res) => {
            setstudentdata(res.data.users[0]);

          });
        
        
    }
    

    /* Update */
    const updateUsers = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", document.getElementById('name').value);
        formData.append("email", document.getElementById('email').value);
        formData.append("mobile", document.getElementById('mobile').value);
        formData.append("fileUpload", selectedFile);
        formData.append("oldFile", document.getElementById('hiddenFile').value);
        //console.log(selectedFile)
        formData.append("id", id);
        // for (var pair of formData.entries()) {
        //         console.log(pair[0]+ ' - ' + pair[1]); 
        //     }
        e.preventDefault();
        const headers = { 
            "Content-Type": "multipart/form-data"
        };
        await axios.post("http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/update-users.php", formData, {headers})
        .then(response => {
            return response.data
         })
         .then(data => {
            //console.log(data)
            //navigate('/list-student');
            if(data.success === 1){
                localStorage.setItem('msg', 'Record Updated Successfully.');
                navigate('/list-student');
            }else{
                seterrormsg(data.msg)
            }
         })
         .catch(error => {
            console.log(error.response.data.error)
         });
    }
    

    return(
        <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>Add Student</h1>
                </div>
            </div>

            <div className="row">
                <form  onSubmit={ e => updateUsers(e) }>
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
                                defaultValue={studentdata.name}
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
                                defaultValue={studentdata.email}
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
                                defaultValue={studentdata.mobile}
                            />
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
                            <input type="hidden" name="hiddenFile" id="hiddenFile" defaultValue={studentdata.fileUpload}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img width="120" height="120" src ={filepath + '/' + studentdata.fileUpload} />
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