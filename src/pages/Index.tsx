import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import InputMask from 'react-input-mask';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

const Index = () => {
  const productImages = [
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/15981a25-0160-4110-bf75-26fdf0087250.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/0dfcd5fe-fcc9-4c31-972f-87f7d3fb8aa4.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/ff4e4fbf-08a5-44f9-816d-081009bf3d4a.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/418df7d7-6dfd-42df-a442-d9779882d80e.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/b574e11d-ee86-4b6f-8ae7-c2809900c8b1.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/05e3950f-afa6-4d20-b683-bc378ebdd17a.png'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviews = [
    {
      name: 'Анна Петрова',
      rating: 5,
      text: 'Отличный продукт! Энергии стало намного больше, тренировки проходят эффективнее. Качество на высоте.',
      date: '15 января 2026'
    },
    {
      name: 'Дмитрий Соколов',
      rating: 5,
      text: 'Заказываю уже третий раз. Результат заметен через неделю приема. Рекомендую!',
      date: '10 января 2026'
    },
    {
      name: 'Елена Иванова',
      rating: 5,
      text: 'Покупала на маркетплейсе дороже на 30%. Здесь выгоднее и доставка быстрая. Спасибо!',
      date: '5 января 2026'
    }
  ];

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
      const response = await fetch('/api/order-api', {
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

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert('Ошибка создания заказа. Попробуйте еще раз.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Ошибка отправки заказа. Попробуйте еще раз.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <a
        href="https://t.me/badpoehalibot"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Поддержка в Telegram"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
            <Icon name="MessageCircle" size={28} className="text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-sm font-medium">Нужна помощь?</span>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-900"></div>
        </div>
      </a>
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">PharmExpert</div>
          </div>
          <a 
            href="https://t.me/badpoehalibot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Icon name="Send" size={20} />
            <span className="hidden sm:inline">Консультация в Telegram</span>
          </a>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
                Напрямую от производителя
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
                L-Карнитин премиум качества
              </h1>
              <p className="text-xl text-gray-600 animate-fade-in" style={{animationDelay: '0.2s'}}>
                Покупайте выгоднее, чем на маркетплейсах. <span className="font-semibold text-secondary">Бесплатная доставка</span> по всей России.
              </p>
              <div className="flex flex-wrap gap-4 text-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-2 hover:scale-110 transition-transform">
                  <Icon name="Check" size={20} className="text-secondary" />
                  <span>850 мг в порции</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-110 transition-transform">
                  <Icon name="Check" size={20} className="text-secondary" />
                  <span>120 капсул</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-110 transition-transform">
                  <Icon name="Check" size={20} className="text-secondary" />
                  <span>Без ГМО</span>
                </div>
              </div>
              <div className="pt-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl font-bold text-primary mb-2 hover:scale-105 transition-transform inline-block">1 990 ₽</div>
                <div className="text-gray-500 line-through text-lg">2 890 ₽ на маркетплейсах</div>
              </div>
              <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-all animate-fade-in" style={{animationDelay: '0.5s'}} onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Оформить заказ
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
            <div className="relative animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl animate-pulse"></div>
              <Carousel className="relative w-full hover:scale-[1.02] transition-transform duration-500">
                <CarouselContent>
                  {productImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img 
                          src={image}
                          alt={`L-Карнитин PharmExpert - фото ${index + 1}`}
                          className="w-full rounded-2xl shadow-2xl"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">О продукте</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Премиальный L-Карнитин для эффективного жиросжигания и повышения энергии
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 hover:scale-110 hover:rotate-12 transition-transform">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">850 мг Л-карнитина тартрат</h3>
                <p className="text-gray-600">
                  Оптимальная дозировка для максимальной эффективности в каждой порции
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-secondary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 hover:scale-110 hover:rotate-12 transition-transform">
                  <Icon name="Leaf" size={24} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% натуральные компоненты</h3>
                <p className="text-gray-600">
                  Без искусственных добавок, красителей и консервантов. Только природные ингредиенты
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 hover:scale-110 hover:rotate-12 transition-transform">
                  <Icon name="ShieldCheck" size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Сертифицированное производство</h3>
                <p className="text-gray-600">
                  Все необходимые сертификаты качества и безопасности. Соответствие GMP стандартам
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Отзывы покупателей</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={24} className="text-yellow-400 fill-yellow-400 animate-fade-in" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <span className="text-lg font-semibold">5.0 из 5</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="order-form" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Оформление заказа</h2>
              <p className="text-xl text-gray-600">
                Заполните форму и переходите к оплате
              </p>
            </div>
            <Card className="shadow-2xl hover:shadow-3xl transition-shadow animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                    <AddressSuggestions
                      token={import.meta.env.VITE_DADATA_API_KEY || ''}
                      value={{ value: formData.address }}
                      onChange={(suggestion) => {
                        setFormData({ ...formData, address: suggestion?.value || '' });
                        setErrors({ ...errors, address: '' });
                      }}
                      inputProps={{
                        placeholder: 'Начните вводить адрес...',
                        className: `flex h-10 w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`
                      }}
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
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
                        <SelectItem value="courier">Курьер (Бесплатно)</SelectItem>
                        <SelectItem value="pickup">Самовывоз (Бесплатно)</SelectItem>
                        <SelectItem value="post">Почта России (Бесплатно)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.deliveryMethod && <p className="text-sm text-red-500">{errors.deliveryMethod}</p>}
                  </div>
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold">Итого к оплате:</span>
                      <span className="text-3xl font-bold text-primary">1 990 ₽</span>
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

      <footer className="bg-gray-900 text-white py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">PharmExpert</div>
              <p className="text-gray-400">
                Премиум спортивное питание напрямую от производителя
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>89287730553@mail.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  <a href="https://t.me/badpoehalibot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    @badpoehalibot
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Информация</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Доставка по всей России</li>
                <li>Оплата при получении</li>
                <li>Гарантия качества</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 PharmExpert. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;