import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadProducts, toggleLike, deleteProduct, setFilter } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import ProductsFilter from '../components/ProductsFilter';
import './ProductsPage.css';


function ProductsPage() {
  const dispatch = useAppDispatch();
  const {items, filter, loading, error} = useAppSelector(state => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

    const filteredProducts = filter === 'favorites'
    ? items.filter(p => p.liked)
    : items;

  const handleLike = (id: number) => {
    dispatch(toggleLike(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleFilterChange = (newFilter: 'all' | 'favorites') => {
    dispatch(setFilter(newFilter));
  };

  if (loading) {
    return <div className="container"><div className="loading">Загрузка...</div></div>;
  }
  if (error) { 
    return <div className="container"><div className="error">Ошибка: {error}</div></div>;
  }

  return (
    <div className="products-page">
      <div className="container">
        <ProductsFilter 
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />
        
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
