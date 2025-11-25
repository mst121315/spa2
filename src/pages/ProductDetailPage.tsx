import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadProductById } from '../store/productsSlice';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector(state => 
    state.products.items.find(p => p.id === Number(id))
  );

  useEffect(() => {
    if (id && !product) {
      dispatch(loadProductById(Number(id)));
    }
  }, [id, product, dispatch]);

  const handleBack = () => {
    navigate('/products');
  };

  if (!product) {
    return (
      <div className="container">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-detail-content">
          <div>
            <img 
              src={product.image} 
              alt={product.title}
              className="product-detail-image"
            />
          </div>
          <div className="product-detail-info">
            <h1>{product.title}</h1>
            <div className="product-detail-price">${product.price}</div>
            <div className="product-detail-category">{product.category}</div>
            <p className="product-detail-description">{product.description}</p>
          </div>
        </div>
        <div className="product-detail-back">
          <button className="button button-primary" onClick={handleBack}>
            Вернуться к списку
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
