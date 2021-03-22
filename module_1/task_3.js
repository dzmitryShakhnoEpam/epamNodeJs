import fs from "fs";
import { pipeline } from "stream";
import csvtojson from "csvtojson";

const CSV_PATH = "./csv/nodejs-hw1-ex1.csv";
const JSON_PATH_NO_PIPELINE = "./csv/nodejs-hw1-ex1_no_pipeline.json";
const JSON_PATH_WITH_PIPELINE = "./csv/nodejs-hw1-ex1_with_pipeline.json";

//to JSON
const writeJson = (inputFilePath, outputFilePath) => {
  const writeStream = fs.createWriteStream(outputFilePath);
  csvtojson({
    noheader: false,
  })
    .fromFile(inputFilePath)
    .on("data", (data) => {
      writeStream.write(data);
    })
    .on("error", (error) => console.log(error))
    .on("done", () => console.log("finished no pipeline"));
};
writeJson(CSV_PATH, JSON_PATH_NO_PIPELINE);
//to pipeline
const writeJsonWithPipeline = (inputFilePath, outputFilePath) => {
  pipeline(
    fs.createReadStream(inputFilePath),
    csvtojson({
      noheader: false,
    }),
    fs.createWriteStream(outputFilePath),
    (error) => {
      if (error) {
        console.log(error);
      }
      console.log("finished with pipeline");
    }
  );
};
writeJsonWithPipeline(CSV_PATH, JSON_PATH_WITH_PIPELINE);
