import Post from './Post';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Postview.css';
import ReactPaginate from "react-paginate";
export default function PostView() {

  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);


  let imageperpage = 1;
  const pagevisited = pageNumber * imageperpage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount =
  posts.length > 0 ? Math.ceil(posts.length / imageperpage) : 0;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/posts"); /////fetching data through server
      console.log(response)
      const data = await response.json(); /////converting fetched data to json file extention
      setPosts(data);
      // console.log(data);
    }
    fetchData()
  }, [])


  return (
    <div className="site-container">

      <Navbar />
      {posts.slice(pagevisited, pagevisited + imageperpage)
      .map((post, index) => (
        <Post key={index} details={post} />
      ))}
      <div className='pagination'>
        
       <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationbtns"}
        previousLinkClassName={"prevbtn"}
        nextLinkClassName={"nextbtn"}
        disabledClassName={"paginationdisabled"}
        activeClassName={"paginationactive"}
        
        />


      </div>

    </div>
  );
}
