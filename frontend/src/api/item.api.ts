import apiClient from './axios.config';
import type { Item, WishlistItem } from '@/types/item.types';

export const itemApi = {
  getAll: () =>
    apiClient.get<Item[]>('/items').then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Item>(`/items/${id}`).then((r) => r.data),

  search: (keyword: string) =>
    apiClient.get<Item[]>('/items/search', { params: { q: keyword } }).then((r) => r.data),
};

export const wishlistApi = {
  getByCustomer: (customerId: number) =>
    apiClient.get<WishlistItem[]>(`/wishlists/customer/${customerId}`).then((r) => r.data),

  add: (customerId: number, itemId: number) =>
    apiClient.post<WishlistItem>('/wishlists', { customerId, itemId }).then((r) => r.data),

  remove: (id: number) =>
    apiClient.delete(`/wishlists/${id}`),
};
