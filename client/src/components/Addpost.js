import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Navbar from "./Navbar";

const Addpost = () => {

    let navigate = useNavigate();
    const [addPostState, setAddPosyState] = useState({});
    
    const isEnabled = (addPostState.name !== undefined) && (addPostState.location !== undefined) && (addPostState.description !== undefined) && (addPostState.PostImage !== undefined)

    if (isEnabled) {

    }
    const handleUserAdd = () => {
        console.log(addPostState);
        axios({
            url: "http://localhost:3001/addpost",
            method: "POST",
            headers: {
                "content-type": "multipart/form-data"
            },
            data: addPostState
        }).then((res) => {
            // window.location.href='/post'
            navigate("/post", { replace: true });
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleInputChange = (e, id) => {
        setAddPosyState({ ...addPostState, [id]: e.target.value })

    }


    const handleInputChangeImage = (e, name) => {
        setAddPosyState({ ...addPostState, [name]: e.target.files[0] })
    }


    return (
        <>
            <div className="main">
                <div >
                    <Navbar />
                </div>

                <div className="Post2" style={main}>
                    <form method="post" enctype="multipart/form-data" style={form}>

                        <div style={input}>
                            <div className="imgupload">
                                <input type='file' id='PostImage' className="custom-file-input" name="PostImage" title='No file choosen' onChange={(e) => { handleInputChangeImage(e, 'PostImage') }} ></input>
                            </div>
                        </div>

                        <div className="authlocation formdiv custom-file mb-4" style={input}>
                            <input type='text' id='name' placeholder="Author" onChange={(e) => { handleInputChange(e, 'name') }} style={{ width: "150px", paddingLeft: "10px" }}></input>
                            <input type='text' id='location' placeholder="Location" onChange={(e) => { handleInputChange(e, 'location') }} style={{ width: "150px", paddingLeft: "10px" }}></input>
                        </div>

                        <div className="formdiv descimagwidth custom-file mb-4" style={input}>
                            <input type='text' id='description' placeholder="Description" onChange={(e) => { handleInputChange(e, 'description') }} style={{ width: "350px", paddingLeft: "10px" }}></input>
                        </div>
                        <button type="button" className="formbtn" onClick={handleUserAdd} disabled={!isEnabled} style={{ padding: "2px 14px" }}>Post</button>
                    </form>

                </div>
            </div>
        </>
    )
}


const main = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    textAlign: "center",
    position: "relative",
    top: "100px",
};
const form = {
    border: "1px solid silver",
    padding: "20px",
    borderRadius: "4px"
}
const input = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
}

export default Addpost;