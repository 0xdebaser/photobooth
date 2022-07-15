import React from "react";
import filtersInUse from "./filtersInUse.mjs";

function FilterSuite(props) {
  const PixelsJS = window.pixelsJS;

  // Generate array of filter names from imported filters object
  const filtersArray = Object.keys(filtersInUse).sort();
  filtersArray.unshift("none");

  function applyFilter(filter) {
    //Get rid of any exisitng filtered image
    if (props.appliedFilter !== "8bit") {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }
    }

    props.setAppliedFilter(filter);

    const canvasContainer = document.getElementById("canvas-container");
    const imageEl = document.getElementById("to-be-replaced");
    const imageElCopy = imageEl;

    switch (filter) {
      case "none":
        const [canvas] = imgToCanvas(imageEl);
        replaceImgElement(canvas, imageEl);
        canvasContainer.append(imageElCopy);
        props.setFilteredImg(props.imgSrc);
        break;

      case "8bit":
        const targCanvas = document.querySelector("canvas");
        if (targCanvas) {
          const canvasImageData = targCanvas.toDataURL("image/jpeg");
          props.setFilteredImg(canvasImageData);
        }
        break;

      // Default handles any of the PixelsJS filters
      default:
        PixelsJS.filterImg(imageEl, filtersInUse[filter]);
        canvasContainer.append(imageElCopy);
        const targetCanvas = document.querySelector("canvas");
        const canvasImgData = targetCanvas.toDataURL("image/jpeg");
        props.setFilteredImg(canvasImgData);
    }
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
    <div className="col col-6 offset-3 col-md-4 offset-md-4 col-xl-2 offset-xl-5 text-center ml-auto mr-auto">
      <div>
        <select
          className="form-select text-center"
          id="filter-select"
          aria-label="Filter select"
          defaultValue="choose filter:"
          onChange={(event) => applyFilter(event.target.value)}
        >
          <option>choose filter:</option>
          {filtersArray.map((filter, index) => {
            return (
              <option
                value={filter}
                key={index}
                onClick={() => applyFilter(filter)}
              >
                {filter}
              </option>
            );
          })}
        </select>
        {props.appliedFilter === "8bit" && (
          <div>
            <label htmlFor="pixelation-range" className="form-label mt-2">
              Pixelation level
            </label>

            <input
              type="range"
              className="form-range"
              min="1"
              max="50"
              step="1"
              id="pixelation-range"
              value={props.pixLevel}
              onChange={(event) => {
                props.setPixLevel(parseInt(event.target.value));
                applyFilter("8bit");
              }}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSuite;
