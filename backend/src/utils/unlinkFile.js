import fs from "fs";

export const removeFile = (localpath) => {
  if (localpath) fs.unlinkSync(localpath);
};
