import React from 'react'
import './Postfooter.css';
import { useState } from "react";
// import {format} from 'date-fns'
import moment from 'moment';
export default function PostFooter({ details }) {

  let [likecount, setLikeCount] = useState(parseInt(details.likes));

  const handleLikeCount = (id) => {
    // likecount=likecount+1
    // setLikeCount(likecount)
    fetch("http://localhost:3001/like", {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        postId: id
      })

    }).then(res =>
      res.json()).then(result =>
        setLikeCount(result.likes)).catch(err => console.log(err))
  }

  return (
    <div className='PostFooter'>
      <div className="PostFooter">
        <div className="likebtn">
          {/* <button className="wpO6b  " type="button" onClick={handleLikeCount} > */}
          <div className='likesharebtn'>
            <div className='likesbtn' >
              <button className="wpO6b  " type="button" onClick={() => handleLikeCount(details._id)} >
                <div className="QBdPU rrUvL">
                  <span className="">
                    <svg
                      aria-label="Like"
                      className="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                    </svg>
                  </span>
                </div>
              </button>
            </div>
            <div className='sharebtn'>
              <button className="wpO6b  " type="button">
                <div className="QBdPU rrUvL">
                  <svg
                    aria-label="Share Post"
                    className="_8-yf5 "
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <line
                      fill="none"
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="2"
                      x1="22"
                      x2="9.218"
                      y1="3"
                      y2="10.083"
                    ></line>
                    <polygon
                      fill="none"
                      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></polygon>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="date">{moment(details.date).format('D MMMM YYYY')}</div>
          {/* <div className="date">{details.date.split('T')[0]}</div> */}
        </div>

        <div className="likeinfo">
          {likecount}
          <span className="like">Likes</span>
        </div>
        <b><div className="discription">{details.description}</div></b>

      </div>
    </div>
  )
}