import { useNavigate } from 'react-router-dom';
import { ProductWithMeta } from '../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductWithMeta;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

function ProductCard({ product, onLike, onDelete }: ProductCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(product.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img 
        src={product.image} 
        // alt={product.title}
        className="product-card-image"
      />
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-price">${product.price}</div>
        <div className="product-card-actions">
          <button
            type="button"
            className={`product-card-icon-button product-card-like ${product.liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
            aria-label="Like"
          >
            {product.liked ? '❤️' : '🤍'}
          </button>
          <button 
            type="button"
            className="product-card-icon-button product-card-delete"
            onClick={handleDeleteClick}
            aria-label="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
