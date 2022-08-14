import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./upload.styles.scss";
import UploadDropzone from "../../components/upload/uploadDropzone.component";
import fizzgenMe from "../../utils/fizzgen_creation/FizzgenMe.mjs";
import CamButton from "../../components/camera/CamButton";

function Upload(props) {
  const [uploadedFileUri, setUploadedFileUri] = useState();
  let navigate = useNavigate();

  return (
    <div className="upload-main-container mt-3">
      {!uploadedFileUri && (
        <UploadDropzone setUploadedFileUri={setUploadedFileUri} />
      )}
      {uploadedFileUri && (
        <div>
          <img
            id="uploaded-image"
            className="upload-preview"
            src={uploadedFileUri}
            alt="uploaded"
          />
        </div>
      )}
      {uploadedFileUri && (
        <div className="mt-2">
          <CamButton
            label="reset"
            handler={() => {
              setUploadedFileUri(null);
            }}
          />
        </div>
      )}
      {uploadedFileUri && props.user && (
        <div className="mt-2">
          <CamButton
            label="fizzgen me!"
            primary={true}
            handler={async () => {
              await fizzgenMe(
                props.user,
                uploadedFileUri,
                props.setStep1,
                props.setStep2,
                props.setStep3,
                props.setGalleryData
              );
              navigate("/gallery");
            }}
            modal="modal"
            target="#fizzgen-modal"
          />
        </div>
      )}
      {uploadedFileUri && !props.user && (
        <div className="mt-2">
          <CamButton
            label="login to enable fizzgen creation"
            primary={true}
            modal="modal"
            target="#loginModal"
          />
        </div>
      )}
    </div>
  );
}

export default Upload;
