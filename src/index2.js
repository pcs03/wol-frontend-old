import { Employees } from "./proto/data_pb.js";

const john = new Employees();
john.setId(1);
john.setName("John");
john.setSalary(10000);

console.log(john.getName());