import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import EditStudent from './EditStudent';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ChildModal from './reactModal/ChildModal';

export default function ListStudent() {
    const params = useParams()
    const productId = params.id;
    const search = useLocation().search;
    const msg = new URLSearchParams(search).get('msg');

    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(abc => !abc);


    const [student, setStudent] = useState([]);
    const [filepath, setfilepath] = useState('http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/img');
    useEffect(() =>{
        loadUser();
    },[]);

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/all-users.php");
        // console.log(result.data);
        setStudent(result.data.users);
    }
        return(
        <div>
        <div className="row">
            <div className="col-md-12 text-center">
            </div>
        </div>
        
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                <div className="alert-success">{(localStorage.getItem('msg'))?localStorage.getItem('msg'):''}</div>
                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sl#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Image</th>
                            <th scope="col">View Details</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                         {student.map((student, index) => (
                            <tr key={Math.random()}>
                                <th scope="row">{index+1}</th>
                                <td> {student.name} </td>
                                <td> {student.email} </td>
                                <td> {student.mobile} </td>
                                <td> <img width="60" height="60" src ={filepath+'/'+student.fileUpload} style={{'borderRadius':'50%'}} /> </td>
                                <td> <a className="btn btn-success" onClick={toggleShow}>View Details</a> </td>
                                <td>
                                    <Link to={`/edit-student-file/${student.id}`}> Edit </Link>
                                </td>
                                <ChildModal message="hei you" show={show} toggleShow={toggleShow} studentid={student.id} header="info" />
                            </tr>
                        ))} 
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}

localStorage.removeItem('msg');