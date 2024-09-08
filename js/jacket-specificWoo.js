import { getIdQueryParameter } from "./api/rainyDaysApiWoo.js";
import { productFromApi } from "./api/rainyDaysApiWoo.js";
import { insertProductImage } from "./ui/renderProductWoo.js";
import { insertProductText } from "./ui/renderProductWoo.js";
import { setPageTitle } from "./ui/setPageTitle.js";

const id = getIdQueryParameter();
const product = await productFromApi(id, ".product-specific__details");
insertProductImage(product);
insertProductText(product);
setPageTitle(product.title);
