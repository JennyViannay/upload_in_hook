import React, { useEffect, useState } from "react"
import axios from "axios"
import FlashMessage from "./FlashMsg"
import DragAndDrop from './DragAndDrop'

const UploadForm = (props) => {
    const [files, setFiles] = useState([])
    const [message, setMessage] = useState({ type: '', text: '' })

    const onChangeHandler = e => {
        e.preventDefault()
        console.log(e.target.files)
        setFiles(e.target.files)
    }

    const onClickHandler = e => {
        e.preventDefault();
        const data = new FormData();
        for (const key of Object.keys(files)) {
            data.append('file', files[key])
        }
        axios
            .post("http://localhost:5000/upload/file", data)
            .then(res => {
                setMessage({
                    type: 'success',
                    text: 'Files uploaded with success'
                })
            })
            .catch(error => {
                setMessage({
                    type: 'error',
                    text: 'Error, try again'
                })
            })
    }

    const reset = () => {
        window.location.reload();
    }

    const handleDrop = (dropFiles) => {
        let fileList = dropFiles
        for (var i = 0; i < dropFiles.length; i++) {
            if (!dropFiles[i]) 
            return fileList.push(dropFiles[i])
        }
        setFiles({ files: fileList })
    }
    console.log(useState([files, message]))
    return (
        <>
            <div className="row">
                <FlashMessage
                    duration={10000}
                    persistOnHover={true}
                    type={useState(message.type)}
                    message={useState(message.text)}
                    close={reset} />
            </div>
            <div className="row">
                <div className="col-12 text-center my-3">
                    <h1 className="">Upload your Files here</h1>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-upload mx-1"></i></span>
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" name="file" multiple onChange={onChangeHandler} />
                    <label className="custom-file-label">Choose file</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block my-4"
                    onClick={onClickHandler}>
                    Upload
                    </button>
            </div>
            <div>
                <DragAndDrop handleDrop={handleDrop}>
                    <div className="content-dd"></div>
                </DragAndDrop>
            </div>
            <div>
                <div className="row">
                    <ul>
                        {/* {files && files.map((file, i) => <li key={i}>{file.name}</li>)} */}
                    </ul>
                </div>
            </div>
        </>
    )
}


export default UploadForm;
