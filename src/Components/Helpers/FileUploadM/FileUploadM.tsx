// @ts-nocheck
import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';
import Button from '@mui/material/Button';
import {setFormData} from "../../../Global/Actions";

// @ts-ignore
const FileUploadM = forwardRef((props, ref) => {
    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();

    const inputRef = useRef();

    // Dispatcher
    const dispatch = useDispatch()

    // ui vars
    const [showDropZone, setShowDropZone] = React.useState(true);

    // ui handlers
    const onFileAdded = (e) => {
        let filesArr = [];
        Object.keys(e.target.files).forEach(_key => {
            filesArr.push(e.target.files[_key]);
        });

        // dispatch to redux
        dispatch(setFormData(filesArr));

        // hide dropzone ui
        setShowDropZone(false);

        // set files (Useless chunk)
        setFiles(e, 'a');
        inputRef.current.value = null;
    }


    return (
        <div>
            <h4>Attach File(s)</h4>

            <div className="form-container">
                {/* Display the files to be uploaded */}
                <div>
                    <ul>
                        {fileNames.map((name) => (
                            <li key={name}>
                                <span>{name}</span>

                                <span onClick={() => removeFile(name)}>
                                  <i className="fa fa-times"/>
                                </span>
                            </li>
                        ))}
                    </ul>

                    {files.length > 0 && (
                        <>
                            <ul>
                                {/*<li>File types found: {fileTypes.join(', ')}</li>*/}
                                <li>Total Size: {totalSize}</li>
                            </ul>

                            <Button onClick={() => {
                                clearAllFiles();
                                setShowDropZone(true);
                            }}
                                    variant="contained">
                                Clear
                            </Button>
                        </>
                    )}
                </div>

                {showDropZone &&
                    <>
                        <Button
                            fullWidth
                            onClick={() => inputRef.current.click()}
                            variant="outlined">
                            Select File(s)
                        </Button>

                        {/* Hide the crappy looking default HTML input */}
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            style={{display: 'none'}}
                            onChange={(e) => {
                                onFileAdded(e);
                            }}
                        />
                    </>
                }
            </div>


        </div>
    );
});

export default FileUploadM;
