import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// alert(1111);
export default function AddStudent() {
    // let history = useNavigate();
    let [errormsg, seterrormsg] = useState([]);
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        
        name: "",
        email: "",
        mobile: ""

    });
    const {name,email,mobile} = student;

    const handleChange = (e) => {
        setStudent({ ...student,[e.target.name]: e.target.value })
    }
    const submitForm = async (e) => {
        // alert("1111");  
        // console.log(student)
        e.preventDefault();
        await axios.post("http://localhost:8181/test/php_react_crud/api/index.php", student)
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

            if(data.success == 1) {

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
                            <input type="text" name="name" id="name" className="form-control" value={name} onChange={e => handleChange(e)} /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" id="email" className="form-control" value={email} onChange={e => handleChange(e)} /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="mobile">Mobile: </label>
                            <input type="text" name="mobile" id="mobile" maxLength={10} className="form-control" value={mobile} onChange={e => handleChange(e)} /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className="btn btn-success">Save</button>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </form>  
            </div>
        </>
    )
}