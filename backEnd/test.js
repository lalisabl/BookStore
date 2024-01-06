const { fromPath } = require("pdf2pic");
const options = {
  density: 100,
  saveFilename: "untitled",
  savePath: "./test",
  format: "png",
  width: 600,
  height: 600,
};

const pdfFilePath = "./examrepo.pdf"; // Update the file path accordingly
const convert = fromPath(pdfFilePath, options);
const pageToConvertAsImage = 1;

convert(pageToConvertAsImage, { responseType: "image" })
  .then((resolve) => {
    console.log("Page 1 is now converted as an image");
    return resolve;
  })
  .catch((error) => {
    console.error("Error converting page to image:", error);
  });
