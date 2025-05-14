import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBanner } from "@/types/Banner";

const bannerServices = {
  getBanners: (params?: string) => instance.get(`${endpoint.BANNER}?${params}`),
  getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  addCategory: (payload: IBanner) => instance.post(endpoint.CATEGORY, payload),
  deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
  updateCategory: (id: string, payload: IBanner) =>
    instance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default bannerServices;
