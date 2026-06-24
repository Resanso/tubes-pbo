import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@/api/item.api';
import type { WishlistItem } from '@/types/item.types';

export function useWishlist(customerId: number) {
  return useQuery({
    queryKey: ['wishlist', customerId],
    queryFn: () => wishlistApi.getByCustomer(customerId),
    enabled: !!customerId,
  });
}

export function useAddWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, itemId }: { customerId: number; itemId: number }) =>
      wishlistApi.add(customerId, itemId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', variables.customerId] });
    },
  });
}

export function useRemoveWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, customerId }: { id: number; customerId: number }) => {
      await wishlistApi.remove(id);
      return { customerId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', data.customerId] });
    },
  });
}
