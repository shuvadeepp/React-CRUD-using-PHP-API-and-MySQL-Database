import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import './Paginate.css';
//import PaginatedItems from './PaginatedItems';


const NewsCard = (props) => {
	return (
		<div style={{ padding: '20' }}>
			<a href={props.url}>
				{props.title} by {props.author}
			</a>
		</div>
	);
};

export default function Paginate () {
    const [hits, setHits] = useState([]);
    const [pageCount, setPageCount] = useState(1); 
    const [isLoaded, setisLoaded] = useState(false);
    const [currentPage, setcurrentPage] = useState(0); 
    const [query, setQuery] = useState('startups'); 

    const URL = `https://hn.algolia.com/api/v1/search?query=${query}&page=${currentPage}`;

    const handleFetch = () => {
		fetch(URL)
			.then(response => response.json())
			.then(body => {
                console.log(body.hits)
				setHits([...body.hits]);
                                setPageCount(body.nbPages); 
                                setisLoaded(true); 
			})
			.catch(error => console.error('Error', error));
	};

      
	const handlePageChange = (selectedObject) => {
        // alert(selectedObject.selected);
		setcurrentPage(selectedObject.selected);
		handleFetch();
	};
    return (
       <>
            <div>
                <label>Search</label>
                <input type="text" onChange={(event) => setQuery(event.target.value)} />
                <button onClick={handleFetch}>Get Data</button>

                    {isLoaded ? (
                        hits.map((item) => {
                            return (
                                <NewsCard
                                    url={item.url}
                                    title={item.title}
                                    author={item.author}
                                    key={item.objectID}
                                />
                            );
                        })
                    ) : (
                        <div></div>
                    )}    
                            
                    {isLoaded ? (
                        <ReactPaginate
                            pageCount={pageCount}
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
                        <div>Nothing to display</div>
                    )} 

            </div>
       </>
    )
}


