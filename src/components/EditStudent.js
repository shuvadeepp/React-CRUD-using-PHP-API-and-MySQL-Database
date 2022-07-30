import axios from "axios";
import { useNavigate } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function EditStudent(prop) {

    const [update, setUpdate] = useState([]);
    let [studentdata, setstudentdata] = useState([]);
    let { id } = useParams();

    const navigate = useNavigate();
    let [errormsg, seterrormsg] = useState([]);
    const [allValues, setAllValues] = useState({
        name: '',
        email: '',
        mobile: ''
     });

    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }
    //console.log(id)

    useEffect(() =>{
        selectUser();
    },[]);

    const selectUser = async () => {
        const parameter = { id: id };
        const headers = { 
            "Content-Type": "application/json"
        };
        const result = await axios.post('http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/all-users.php', parameter, {headers})
          .then((res) => {
            setstudentdata(res.data.users[0])
          })
          
    }

    const updateUsers = async (updateparameter) => {
        //console.log(updateparameter)
        // navigate('/list-student');
        // BrowserHistory.push('/list-student');
        //alert(22222)

        let res = await axios({
            method: 'post',
            url: 'http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/update-users.php',
            data: updateparameter,
            header : {
                "Content-Type": "application/json"
            }
        }).then(response => {
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


    // const handleNameChange = event => {
    //     setName(event.target.value);
    // };


    /* Update user */
    const updateData = (e) => {
        //abc = document.getElementById('name').value;
        //alert(allValues.name)
        e.preventDefault();
        allValues.name = document.getElementById('name').value;
        allValues.email = document.getElementById('email').value;
        allValues.mobile = document.getElementById('mobile').value;
        const updateparameter = {   
            id: id, 
            name: allValues.name, 
            email: allValues.email, 
            mobile:allValues.mobile
        };
        
        updateUsers(updateparameter);
        //return false;
    }

    return(
        <>
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>Edit Student</h1>
            </div>
        </div>
        <div className="alert-danger">{errormsg}</div>
        <div className="row">
            <form>
                <table cellSpacing="10" >
                    <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">Name: </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                defaultValue={studentdata.name} 
                                className="form-control"  
                                onChange={e => changeHandler(e)}
                            /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" id="email" defaultValue={studentdata.email}  className="form-control" onChange={e => changeHandler(e)}/><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mobile">Mobile: </label>
                            <input type="text" name="mobile" id="mobile" maxLength={10}  defaultValue={studentdata.mobile} className="form-control" onChange={e => changeHandler(e)}/><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className="btn btn-success" onClick={updateData}> Save </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>  
        </div>
        </>
        
    )
}