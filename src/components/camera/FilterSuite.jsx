import mergeImages from "merge-images";

import filtersInUse from "./filtersInUse.mjs";

import runBigLinearBlack200 from "../../images/run_big_linear_black_200.png";

function FilterSuite(props) {
  // Generate array of filter names from imported filters object
  const filtersArray = Object.keys(filtersInUse).sort();
  filtersArray.unshift("none");

  function setOverlayPosition(
    baseImageWidth,
    baseImageHeight,
    overlayWidth,
    overlayHeight
  ) {
    // Returns an array with X start at 0, and Y start at 1
    switch (props.position) {
      case "leftTop":
        return [10, 10];
      case "rightTop":
        return [baseImageWidth - (overlayWidth + 10), 10];
      case "leftBottom":
        return [10, baseImageHeight - (overlayHeight + 10)];
      case "rightBottom":
        return [
          baseImageWidth - (overlayWidth + 10),
          baseImageHeight - (overlayHeight + 10),
        ];
      default:
        console.log("props.position missing!");
    }
  }

  function applyFilter(filter) {
    //Get rid of any exisitng filtered image
    if (props.appliedFilter !== "8bit") {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }
    }

    props.setAppliedFilter(filter);

    const overlay = new Image();

    switch (filter) {
      case "none":
        props.setFilteredImg(props.imgSrc);
        break;

      case "test1":
        overlay.src = runBigLinearBlack200;
        break;

      // Default handles any of the PixelsJS filters
      default:
        console.log("Reached default of filter switch. Why?");
    }

    const baseImage = new Image();
    baseImage.src = props.imgSrc;
    const startingPosition = setOverlayPosition(
      baseImage.width,
      baseImage.height,
      overlay.width,
      overlay.height
    );
    mergeImages([
      { src: props.filteredImg ? props.filteredImg : props.imgSrc },
      {
        src: overlay.src,
        x: startingPosition[0],
        y: startingPosition[1],
      },
    ]).then((b64) => props.setFilteredImg(b64));
  }

  console.log(props.position);
  let selectionLabel;
  switch (props.position) {
    case "leftTop":
      selectionLabel = "upper left:";
      break;
    case "rightTop":
      selectionLabel = "upper right:";
      break;
    case "leftBottom":
      selectionLabel = "lower left:";
      break;
    case "rightBottom":
      selectionLabel = "lower right:";
      break;
    default:
      selectionLabel = "position missing!";
  }

  return (
    <div className="mx-2">
      <div>
        <select
          className="form-select text-center"
          id="filter-select"
          aria-label="Filter select"
          defaultValue={selectionLabel}
          onChange={(event) => applyFilter(event.target.value)}
        >
          <option>{selectionLabel}</option>
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
      </div>
    </div>
  );
}

export default FilterSuite;
