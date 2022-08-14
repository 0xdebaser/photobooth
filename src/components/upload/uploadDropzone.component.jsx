import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function UploadDropzone(props) {
  const onDrop = useCallback((acceptedFile) => {
    // from https://stackoverflow.com/questions/40369107/confused-on-bloburl-and-converting-it-to-base64-in-react-dropzone
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(acceptedFile[0]);

      reader.onload = () => {
        if (!!reader.result) {
          resolve(reader.result);
        } else {
          reject(Error("Failed converting to base64"));
        }
      };
    });
    promise.then(
      (result) => {
        props.setUploadedFileUri(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/jpeg": [] },
      maxFiles: 1,
      maxSize: 10485760,
      onDrop,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select file</p>
        <p>(image file only -- max size 10MB)</p>
        <p>(currently only supports jpegs -- more file types soon!)</p>
      </div>
    </div>
  );
}

export default UploadDropzone;
