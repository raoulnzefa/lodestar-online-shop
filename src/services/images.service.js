import { request } from "./generic.service";

export default class ImageService {
  static async getImage(id) {
    return request({ url: `images/${id}`, method: "get" });
  }
}
