import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import InputMask from 'react-input-mask';
import AddressInput from '@/components/AddressInput';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: '',
    quantity: 1
  });

  const PRICE_PER_ITEM = 980;
  const totalPrice = formData.quantity * PRICE_PER_ITEM;

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 11;
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      deliveryMethod: ''
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Укажите ФИО';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Укажите телефон';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Неверный формат телефона';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Укажите email';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Неверный формат email';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Укажите адрес доставки';
      isValid = false;
    }

    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = 'Выберите способ доставки';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/6adc7c19-ffac-4feb-96ab-51151c26071f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create_order',
          ...formData
        })
      });

      const data = await response.json();
      
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert(`Ошибка создания заказа: ${data.error || 'Попробуйте еще раз'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Ошибка отправки заказа. Попробуйте еще раз.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl font-bold animate-fade-in">Оформление заказа</h2>
            <p className="text-lg text-gray-600 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Заполните форму, и мы свяжемся с вами для подтверждения
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Icon name="Shield" size={24} />
              <span>Безопасная оплата • Гарантия качества</span>
            </div>
          </div>
          <Card className="shadow-xl animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">ФИО</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Иванов Иван Иванович"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      setErrors({ ...errors, fullName: '' });
                    }}
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      setErrors({ ...errors, phone: '' });
                    }}
                  >
                    {(inputProps: any) => (
                      <Input 
                        {...inputProps}
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                    )}
                  </InputMask>
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: '' });
                    }}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес доставки</Label>
                  <AddressInput
                    value={formData.address}
                    onChange={(value) => {
                      setFormData({ ...formData, address: value });
                      setErrors({ ...errors, address: '' });
                    }}
                    error={errors.address}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Количество упаковок</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                      disabled={formData.quantity <= 1}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="text-center text-lg font-semibold w-24"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                    <span className="text-sm text-gray-600">× {PRICE_PER_ITEM} ₽</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryMethod">Способ доставки</Label>
                  <Select 
                    value={formData.deliveryMethod}
                    onValueChange={(value) => {
                      setFormData({ ...formData, deliveryMethod: value });
                      setErrors({ ...errors, deliveryMethod: '' });
                    }}
                  >
                    <SelectTrigger className={errors.deliveryMethod ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Выберите способ доставки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yandex">Яндекс доставка</SelectItem>
                      <SelectItem value="ozon">Озон доставка</SelectItem>
                      <SelectItem value="wb">WB доставка</SelectItem>
                      <SelectItem value="cdek">СДЭК</SelectItem>
                      <SelectItem value="pochta">Почта РФ</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.deliveryMethod && <p className="text-sm text-red-500">{errors.deliveryMethod}</p>}
                </div>
                <div className="border-t pt-6">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Стоимость товара ({formData.quantity} шт.):</span>
                      <span className="text-lg font-semibold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">Доставка:</span>
                      <span className="text-sm text-green-600 font-semibold">Бесплатно</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-bold">Итого к оплате:</span>
                      <span className="text-3xl font-bold text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg hover:scale-105 transition-all duration-300 animate-fade-in" 
                    style={{animationDelay: '0.3s'}}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Обработка...' : 'Перейти к оплате'}
                    {!isSubmitting && <Icon name="CreditCard" size={20} className="ml-2" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
