import React from "react";

function FilterSuite(props) {
  const PixelsJS = window.pixelsJS;
  const filters = PixelsJS.getFilterList()
    .sort()
    .map((filter) => filter.replace(/_/g, " "));

  filters.unshift("none");

  function applyFilter(filter) {
    const filterArg = filter.replace(/\s/g, "_");

    //Get rid of any exisitng filtered image
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.remove();
    }

    const canvasContainer = document.getElementById("canvas-container");
    const imageEl = document.getElementById("to-be-replaced");
    const imageElCopy = imageEl;

    props.setFilter(filter);

    if (filter === "none") {
      const [canvas] = imgToCanvas(imageEl);
      replaceImgElement(canvas, imageEl);
      canvasContainer.append(imageElCopy);
      return;
    }

    PixelsJS.filterImg(imageEl, filterArg);
    canvasContainer.append(imageElCopy);
  }

  //Helper function from pixels.js
  const imgToCanvas = (img) => {
    var canvas = document.createElement("canvas");
    let imgWidth = img.width || img.naturalWidth;
    let imgHeight = img.height || img.naturalHeight;
    canvas.height = imgHeight;
    canvas.width = imgWidth;
    var context = canvas.getContext("2d");
    var ptrn = context.createPattern(img, "no-repeat");
    context.fillStyle = ptrn;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return [canvas, context];
  };

  //Helper function from pixels.js
  const replaceImgElement = (canvas, img) => {
    img.parentNode.replaceChild(canvas, img);
  };

  return (
    <div>
      <div className="col text-center">
        <div className="dropdown">
          {!props.filter && (
            <div>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="filter-dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                choose filter
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {filters.map((filter, index) => (
                  <li
                    key={index}
                    className="dropdown-item filter-list-item"
                    onClick={() => applyFilter(filter)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {props.filter && (
            <div>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="filter-dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.filter}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {filters.map((filter, index) => (
                  <li
                    key={index}
                    className="dropdown-item filter-list-item"
                    onClick={() => applyFilter(filter)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterSuite;
