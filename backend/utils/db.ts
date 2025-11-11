import { readFileSync, writeFileSync } from "fs";

export function readDB() {
  return JSON.parse(readFileSync("./db.json", "utf8"));
}

export function writeDB(data: any) {
  writeFileSync("./db.json", JSON.stringify(data, null, 2), "utf8");
}
