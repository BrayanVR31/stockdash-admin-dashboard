import moduleAlias from "module-alias";
import path from "path";
const { NODE_ENV = "development" } = process.env;

console.log(__dirname);

moduleAlias.addAlias("@", path.join(__dirname));
