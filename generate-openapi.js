import fs from "fs";
import openapi from "./openapi.js";
fs.writeFileSync(
  "./openapi.json",
  JSON.stringify(openapi, null, 2)
);

console.log("openapi.json created successfully!");