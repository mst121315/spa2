import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addProduct } from '../store/productsSlice';
import { createProduct } from '../api/products';
import { ProductWithMeta } from '../types/product';
import './CreateProductPage.css';

function CreateProductPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.title.trim().length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа';
    }
    if (Number(formData.price) <= 0 || isNaN(Number(formData.price))) {
      newErrors.price = 'Цена должна быть числом больше 0';
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов';
    }
    if (formData.category.trim() === '') {
      newErrors.category = 'Категория не должна быть пустой';
    }
    try {
      new URL(formData.image);
    } catch {
      newErrors.image = 'Неверный URL изображения';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    
    try {
      const newProduct: ProductWithMeta = {
        id: Date.now(),
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
        liked: false,
      };

      await createProduct(newProduct);
      dispatch(addProduct(newProduct));
      navigate('/products');

    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
      alert('Не удалось создать продукт. Попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
  navigate('/products');
  };

  return (
    <div className="container">
      <div className="create-product-page">
        <form className="create-product-form" onSubmit={handleSubmit}>
          <h2>Создать новый продукт</h2>

          <div className="form-group">
            <label htmlFor="title">Название *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введите название продукта"
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
            />
            {errors.price && <div className="form-error">{errors.price}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Введите категорию"
            />
            {errors.category && <div className="form-error">{errors.category}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите описание продукта"
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="image">URL изображения *</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <div className="form-error">{errors.image}</div>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="button" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="button button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Создание...' : 'Создать продукт'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductPage;
