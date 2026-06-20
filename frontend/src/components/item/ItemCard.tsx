import React from 'react';
import type { Item } from '@/types/item.types';
import { formatRupiah, urgencyLabel } from '@/utils/format.utils';

interface Props {
  item: Item;
  onAddToWishlist?: (item: Item) => void;
  onEvaluate?: (item: Item) => void;
}

const ItemCard: React.FC<Props> = ({ item, onAddToWishlist, onEvaluate }) => {
  // Map itemType to styling badge
  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'PRIMER':
        return 'badge-primer';
      case 'SEKUNDER':
        return 'badge-sekunder';
      case 'TERSIER':
      default:
        return 'badge-tersier';
    }
  };

  return (
    <div className="card-glass fade-in-up">
      <div className="item-card-inner">
        <div>
          <div className="item-header">
            <span className={`badge ${getBadgeClass(item.itemType)}`}>
              {item.priorityLabel || item.itemType}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {item.category.name}
            </span>
          </div>

          <h3 className="item-title">{item.name}</h3>
          <div className="item-price">{formatRupiah(item.price)}</div>

          <div className="item-urgency">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>Urgensi:</span>
              <span style={{ fontWeight: 600 }}>{urgencyLabel(item.urgency)}</span>
            </div>
            <div className="urgency-bar-bg">
              <div
                className="urgency-bar-fill"
                style={{ width: `${(item.urgency / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="item-actions">
          {onEvaluate && (
            <button className="btn btn-primary" onClick={() => onEvaluate(item)}>
              Mending Beli?
            </button>
          )}
          {onAddToWishlist && (
            <button className="btn btn-secondary" onClick={() => onAddToWishlist(item)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              + Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
