import mergeImages from "merge-images";

import filtersInUse from "./filtersInUse.mjs";

import runBigLinearBlack200 from "../../images/run_big_linear_black_200.png";

function FilterSuite(props) {
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

    switch (filter) {
      case "none":
        props.setFilteredImg(props.imgSrc);
        break;

      case "test1":
        const baseImage = new Image();
        baseImage.src = props.imgSrc;
        console.log(`Height: ${baseImage.height} || Width: ${baseImage.width}`);

        mergeImages([
          { src: props.imgSrc },
          {
            src: runBigLinearBlack200,
            x: baseImage.width - 210,
            y: baseImage.height - 65,
          },
        ]).then((b64) => props.setFilteredImg(b64));
        break;

      // Default handles any of the PixelsJS filters
      default:
        console.log("Reached default of filter switch. Why?");
    }
  }

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
      </div>
    </div>
  );
}

export default FilterSuite;
