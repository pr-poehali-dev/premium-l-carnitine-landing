import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface HeroSectionProps {
  productImages: string[];
}

const HeroSection = ({ productImages }: HeroSectionProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              Напрямую от производителя
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
              L-Карнитин PharmExpert <span className="text-primary">850мг</span>
            </h1>
            <div className="text-lg text-gray-600 space-y-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <p className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={24} className="text-green-500" />
                Премиум качество по честной цене
              </p>
              <p className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={24} className="text-green-500" />
                Без наценки маркетплейсов
              </p>
              <p className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={24} className="text-green-500" />
                Бесплатная доставка по России
              </p>
            </div>
            <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-primary">980 ₽</span>
                <span className="text-2xl text-gray-400 line-through">1 990 ₽</span>
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">-50%</span>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={20} className="text-red-600" />
                  <span className="font-semibold text-red-600">Акция заканчивается через:</span>
                </div>
                <div className="flex gap-3 text-center">
                  <div className="bg-white rounded-lg p-2 min-w-[60px] shadow-sm">
                    <div className="text-2xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">часов</div>
                  </div>
                  <div className="text-2xl font-bold flex items-center">:</div>
                  <div className="bg-white rounded-lg p-2 min-w-[60px] shadow-sm">
                    <div className="text-2xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">минут</div>
                  </div>
                  <div className="text-2xl font-bold flex items-center">:</div>
                  <div className="bg-white rounded-lg p-2 min-w-[60px] shadow-sm">
                    <div className="text-2xl font-bold text-primary">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">секунд</div>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full text-lg hover:scale-105 transition-all duration-300 animate-fade-in" 
              style={{animationDelay: '0.4s'}}
              onClick={scrollToOrder}
            >
              Заказать со скидкой
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {productImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-4">
                      <img 
                        src={image} 
                        alt={`L-Карнитин PharmExpert фото ${index + 1}`}
                        className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
