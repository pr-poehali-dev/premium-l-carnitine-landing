import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">PharmExpert</div>
          </div>
          <a 
            href="https://t.me/pharmexpert" 
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
                <h3 className="text-xl font-bold mb-2">Без ГМО</h3>
                <p className="text-gray-600">
                  Продукт прошел все необходимые проверки качества и сертификацию
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Почему покупать у нас выгоднее?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4 hover:scale-105 transition-transform animate-fade-in">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:rotate-12 transition-transform">
                  <Icon name="TrendingDown" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Без наценки маркетплейсов</h3>
                  <p className="text-gray-600">
                    Покупая напрямую от производителя, вы экономите до 30% от цены на популярных площадках
                  </p>
                </div>
              </div>
              <div className="flex gap-4 hover:scale-105 transition-transform animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:rotate-12 transition-transform">
                  <Icon name="Truck" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Бесплатная доставка по РФ</h3>
                  <p className="text-gray-600">
                    Отправляем заказы по всей России абсолютно бесплатно любым удобным способом
                  </p>
                </div>
              </div>
              <div className="flex gap-4 hover:scale-105 transition-transform animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:rotate-12 transition-transform">
                  <Icon name="Award" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
                  <p className="text-gray-600">
                    Мы производители и контролируем качество на каждом этапе производства
                  </p>
                </div>
              </div>
              <div className="flex gap-4 hover:scale-105 transition-transform animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:rotate-12 transition-transform">
                  <Icon name="Package" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Всегда в наличии</h3>
                  <p className="text-gray-600">
                    Не нужно ждать поставок — отправляем заказы в день оформления
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Отзывы покупателей</h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={24} className="fill-current hover:scale-125 transition-transform" />
              ))}
              <span className="text-gray-600 ml-2">5.0 из 5 (более 200 отзывов)</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="order-form" className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Оформить заказ</h2>
              <p className="text-xl text-gray-600">
                Заполните форму и мы свяжемся с вами для подтверждения
              </p>
            </div>
            <Card className="border-2 hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">ФИО *</Label>
                    <Input
                      id="fullName"
                      placeholder="Иванов Иван Иванович"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Input
                      id="address"
                      placeholder="Город, улица, дом, квартира"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryMethod">Способ доставки *</Label>
                    <Select value={formData.deliveryMethod} onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}>
                      <SelectTrigger id="deliveryMethod">
                        <SelectValue placeholder="Выберите способ доставки" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yandex">Яндекс доставка</SelectItem>
                        <SelectItem value="ozon">Ozon доставка</SelectItem>
                        <SelectItem value="wb">WB доставка</SelectItem>
                        <SelectItem value="cdek">СДЭК</SelectItem>
                        <SelectItem value="pochta">Почта РФ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-purple-900">
                        <div className="font-semibold mb-1">Бесплатная доставка по всей России</div>
                        <div>После оформления заказа мы свяжемся с вами для подтверждения</div>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    Заказать за 1 990 ₽
                    <Icon name="ShoppingCart" size={20} className="ml-2" />
                  </Button>
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
                Производитель премиальных спортивных добавок
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <div>Email: info@pharmexpert.ru</div>
                <div>Телефон: +7 (800) 123-45-67</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Мы в соцсетях</h3>
              <a 
                href="https://t.me/pharmexpert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Send" size={20} />
                Telegram
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 PharmExpert. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;