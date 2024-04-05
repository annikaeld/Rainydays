import { getIdQueryParameter } from "./api/rainyDaysApi.js";
import { productFromApi } from "./api/rainyDaysApi.js";
import { insertProductImage } from "./ui/renderProduct.js";
import { insertProductText } from "./ui/renderProduct.js";

const id = getIdQueryParameter();
const product = await productFromApi(id);
console.log(product);
insertProductImage(product);
insertProductText(product);
