function GalleryFilterControls(props) {
  return (
    <div>
      {props.galleryData && (
        <div
          className="d-flex justify-content-between mt-2 mx-2"
          id="gallery-controls"
        >
          <div className="d-flex align-items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={props.sortMostRecent}
                onChange={() => {
                  props.setSortMostRecent(!props.sortMostRecent);
                }}
              />
              <span className="slider round"></span>
            </label>
            <div className="ms-1">
              {props.sortMostRecent ? (
                <i className="bi bi-hourglass-top"></i>
              ) : (
                <i className="bi bi-hourglass-bottom"></i>
              )}
            </div>
          </div>
          <div className="d-flex align-items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={props.showOwned}
                onChange={() => props.setShowOwned(!props.showOwned)}
              />
              <span className="slider round"></span>
            </label>
            <div className="ms-1">
              {!props.showOwned && <i className="bi bi-slash-circle me-1"></i>}
              owned
            </div>
          </div>
          <div className="d-flex align-items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={props.showMinted}
                onChange={() => props.setShowMinted(!props.showMinted)}
              />
              <span className="slider round"></span>
            </label>
            <div className="ms-1">
              {!props.showMinted && <i className="bi bi-slash-circle me-1"></i>}
              minted
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryFilterControls;
