import { ProductFilter } from '../types/product';
import './ProductsFilter.css';

interface ProductsFilterProps {
  currentFilter: ProductFilter;
  onFilterChange: (filter: ProductFilter) => void;
}

function ProductsFilter({ currentFilter, onFilterChange }: ProductsFilterProps) {
  return (
    <div className="products-filter">
      <button
        className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все продукты
      </button>
      <button
        className={`filter-button ${currentFilter === 'favorites' ? 'active' : ''}`}
        onClick={() => onFilterChange('favorites')}
      >
        Избранное
      </button>
    </div>
  );
}

export default ProductsFilter;
