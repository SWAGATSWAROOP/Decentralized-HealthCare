import fs from "fs";

export const removeFile = (localPath) =>
  fs.unlink(localPath, () => console.log("Suucessfully Removed"));
