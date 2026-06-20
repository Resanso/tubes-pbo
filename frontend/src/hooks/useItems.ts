import { useQuery } from '@tanstack/react-query';
import { itemApi } from '@/api/item.api';
import type { Item } from '@/types/item.types';

export const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    name: 'Beras Pandan Wangi 10kg',
    price: 175000,
    urgency: 5,
    itemType: 'PRIMER',
    category: { id: 2, name: 'Makanan & Sembako' },
    priorityLabel: 'Kebutuhan Pokok',
  },
  {
    id: 2,
    name: 'Obat-obatan Rutin & P3K',
    price: 120000,
    urgency: 5,
    itemType: 'PRIMER',
    category: { id: 4, name: 'Kesehatan' },
    priorityLabel: 'Kebutuhan Pokok',
  },
  {
    id: 3,
    name: 'Laptop Kerja/Kuliah Core i5',
    price: 8500000,
    urgency: 4,
    itemType: 'SEKUNDER',
    category: { id: 1, name: 'Elektronik & Gadget' },
    priorityLabel: 'Kebutuhan Sekunder',
  },
  {
    id: 4,
    name: 'Sepatu Lari Olahraga',
    price: 850000,
    urgency: 3,
    itemType: 'SEKUNDER',
    category: { id: 3, name: 'Fashion & Sepatu' },
    priorityLabel: 'Kebutuhan Sekunder',
  },
  {
    id: 5,
    name: 'iPhone 15 Pro Max 256GB',
    price: 21999000,
    urgency: 2,
    itemType: 'TERSIER',
    category: { id: 1, name: 'Elektronik & Gadget' },
    priorityLabel: 'Kebutuhan Tersier',
  },
  {
    id: 6,
    name: 'PlayStation 5 Slim Console',
    price: 8200000,
    urgency: 1,
    itemType: 'TERSIER',
    category: { id: 5, name: 'Hobi & Game' },
    priorityLabel: 'Kebutuhan Tersier',
  },
];

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      try {
        const data = await itemApi.getAll();
        if (!data || data.length === 0) {
          return MOCK_ITEMS;
        }
        return data;
      } catch (error) {
        console.warn('Backend API error, falling back to mock items:', error);
        return MOCK_ITEMS;
      }
    },
  });
}

export function useSearchItems(keyword: string) {
  return useQuery({
    queryKey: ['items', 'search', keyword],
    queryFn: async () => {
      if (!keyword.trim()) {
        try {
          const data = await itemApi.getAll();
          return (!data || data.length === 0) ? MOCK_ITEMS : data;
        } catch {
          return MOCK_ITEMS;
        }
      }
      try {
        const data = await itemApi.search(keyword);
        if (!data || data.length === 0) {
          return MOCK_ITEMS.filter((item) =>
            item.name.toLowerCase().includes(keyword.toLowerCase())
          );
        }
        return data;
      } catch {
        return MOCK_ITEMS.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    },
  });
}
