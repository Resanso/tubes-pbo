import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@/api/item.api';
import type { WishlistItem } from '@/types/item.types';
import { MOCK_ITEMS } from './useItems';

const LOCAL_WISHLIST_KEY = 'mending_nabung_mock_wishlist';

// Helper to get mock wishlist from localStorage
function getLocalWishlist(customerId: number): WishlistItem[] {
  const data = localStorage.getItem(`${LOCAL_WISHLIST_KEY}_${customerId}`);
  if (!data) {
    // Initial mock data
    const initialList: WishlistItem[] = [
      {
        id: 101,
        date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // 2 days ago
        status: 'PENDING',
        item: MOCK_ITEMS[4], // iPhone
      },
      {
        id: 102,
        date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0], // 5 days ago
        status: 'APPROVED',
        item: MOCK_ITEMS[2], // Laptop
      },
    ];
    localStorage.setItem(`${LOCAL_WISHLIST_KEY}_${customerId}`, JSON.stringify(initialList));
    return initialList;
  }
  return JSON.parse(data);
}

// Helper to save mock wishlist
function saveLocalWishlist(customerId: number, list: WishlistItem[]) {
  localStorage.setItem(`${LOCAL_WISHLIST_KEY}_${customerId}`, JSON.stringify(list));
}

export function useWishlist(customerId: number) {
  return useQuery({
    queryKey: ['wishlist', customerId],
    queryFn: async () => {
      try {
        const data = await wishlistApi.getByCustomer(customerId);
        if (!data || data.length === 0) {
          return getLocalWishlist(customerId);
        }
        return data;
      } catch (error) {
        console.warn('Backend API error, falling back to local wishlist:', error);
        return getLocalWishlist(customerId);
      }
    },
    enabled: !!customerId,
  });
}

export function useAddWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ customerId, itemId, itemDetails }: { customerId: number; itemId: number; itemDetails?: any }) => {
      try {
        return await wishlistApi.add(customerId, itemId);
      } catch (error) {
        console.warn('Backend API error, adding to local wishlist fallback:', error);
        // Fallback local addition
        const currentList = getLocalWishlist(customerId);
        
        // Find item details from mock list or passed param
        const targetItem = itemDetails || MOCK_ITEMS.find((item) => item.id === itemId) || {
          id: itemId,
          name: 'Barang Kustom',
          price: 100000,
          urgency: 3,
          itemType: 'SEKUNDER' as const,
          category: { id: 99, name: 'Umum' },
          priorityLabel: 'Kebutuhan Sekunder',
        };

        // Check if already in wishlist
        const exists = currentList.some((wi) => wi.item.id === itemId);
        if (exists) {
          throw new Error('Barang sudah ada di wishlist Anda!');
        }

        const newEntry: WishlistItem = {
          id: Math.floor(Math.random() * 10000) + 200,
          date: new Date().toISOString().split('T')[0],
          status: 'PENDING',
          item: targetItem,
        };

        const updated = [newEntry, ...currentList];
        saveLocalWishlist(customerId, updated);
        return newEntry;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', variables.customerId] });
    },
  });
}

export function useRemoveWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, customerId }: { id: number; customerId: number }) => {
      try {
        await wishlistApi.remove(id);
      } catch (error) {
        console.warn('Backend API error, removing from local wishlist fallback:', error);
        // Fallback local removal
        const currentList = getLocalWishlist(customerId);
        const updated = currentList.filter((wi) => wi.id !== id);
        saveLocalWishlist(customerId, updated);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', variables.customerId] });
    },
  });
}
