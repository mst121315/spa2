import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/spa2">
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1>Product Store</h1>
            <nav className="nav">
              <Link to="/products">Продукты</Link>
              <Link to="/create-product">Создать продукт</Link>
            </nav>
          </div>
        </header>
        
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
