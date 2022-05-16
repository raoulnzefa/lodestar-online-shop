import { request } from "./generic.service";

const getImage = (id) => request({ url: `images/${id}`, method: "get" });

export { getImage };