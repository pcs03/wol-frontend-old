import { writeFileSync } from "fs";

const employees = [];

employees.push({
    "name": "John",
    "salary": 1000,
    "id": 1,
});

writeFileSync("jsondata.json", JSON.stringify(employees));
