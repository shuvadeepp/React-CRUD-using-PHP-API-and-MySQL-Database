import {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Paginate.css';


const StudentCard = (props) => {
	return (
		<tr key={Math.random()}>
            <th scope="row">{props.idx}</th>
            <td> {props.name} </td>
            <td> {props.email} </td>
            <td> {props.mobile} </td>
            <td> <img width="60" height="60" src ={props.filepath+'/'+props.fileUpload} style={{'borderRadius':'50%'}} /> </td>
            
            <td>
                <Link to={`/edit-student-file/${props.id}`}> Edit </Link>
            </td>
        </tr>
	);
};

export default function ListStudentPaginate () {
    const params = useParams()
    const productId = params.id;
    const search = useLocation().search;
    const msg = new URLSearchParams(search).get('msg');

    /***************Pagination Variables********************* */
    const [pageCount, setPageCount]        = useState(1); 
    const [isLoaded, setisLoaded]          = useState(false);
    const [currentPage, setcurrentPage]    = useState(0); 
    const [offset, setoffsetRec]           = useState(0); 
    const [perPage, setperPage]            = useState(2); 
    const [query, setQuery]                = useState(''); 
    /***************Pagination Variables********************* */


    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(abc => !abc);


    const [student, setStudent] = useState([]);
    const [filepath, setfilepath] = useState('http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/img');
    useEffect(() =>{
        loadUser();
    },[]);

    // const handlePageChange = (selectedObject) => {
    //     console.log(offsetRec)
    //     setoffsetRec(selectedObject.selected*2)
	// 	setcurrentPage(selectedObject.selected);
	// 	loadUser();
	// };

    const handlePageChange = (e) => {
        const selectedPage = e.selected+1;
        const offset = (selectedPage * perPage)-perPage;
        setcurrentPage(selectedPage)
        setoffsetRec(offset)
        loadUser(offset)

    };

    const loadUser = async (offsetval='') => {
        const result = await axios.get(`http://localhost:8181/test/ReactCrud/phpreactcrud_app/api/all-users.php?&offset=${offsetval}`);
        // console.log(result.data);
        setPageCount(result.data.totalRec/perPage);
        setStudent(result.data.users);
        setisLoaded(true);
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
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoaded ? (
                            student.map((student, index) => {
                                return (
                                    <StudentCard
                                        name        ={student.name}
                                        email       ={student.email}
                                        mobile      ={student.author}
                                        filepath    ={filepath}
                                        fileUpload  ={student.fileUpload}
                                        id          ={student.id}
                                        idx         ={index+1}
                                    />
                                );
                            })
                        ) : (
                            <tr><td colSpan={6}>Sorry Something went wrong!!</td></tr>
                        )}    

                        
                         
                    </tbody>
                        
                    </table>
                    {isLoaded ? (
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                pageRangeDisplayed={5}
                                pageRange={2}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                containerClassName={'page-container'}
                                previousLinkClassName={'page-page'}
                                breakClassName={'page-page'}
                                nextLinkClassName={'page-page'}
                                pageClassName={'page-page'}
                                disabledClassNae={'page-disabled'}
                                activeClassName={'page-active'}
                            />
                        ) : (
                            <div>Sorry Something went wrong!!</div>
                        )} 
                </div>
            </div>
        </div>
        </div>
    )
}

localStorage.removeItem('msg');