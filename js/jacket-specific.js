import { getIdQueryParameter } from "./api/rainyDaysApi.js";
import { productFromApi } from "./api/rainyDaysApi.js";
import { insertProductImage } from "./ui/renderProduct.js";
import { insertProductText } from "./ui/renderProduct.js";
import { setPageTitle } from "./ui/setPageTitle.js";

const id = getIdQueryParameter();
const product = await productFromApi(id, ".product-specific__details");
insertProductImage(product);
insertProductText(product);
setPageTitle(product.name);
