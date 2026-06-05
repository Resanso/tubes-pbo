import React from 'react';
import type { Item } from '@/types/item.types';

interface Props {
  item: Item;
  onAddToWishlist?: (item: Item) => void;
  onEvaluate?: (item: Item) => void;
}

const ItemCard: React.FC<Props> = (_props) => {
  // TODO: To be implemented by team
  return <div />;
};

export default ItemCard;
