import Icon from '@/components/ui/icon';
import HeroSection from '@/components/HeroSection';
import OrderForm from '@/components/OrderForm';
import ReviewsSection from '@/components/ReviewsSection';

const Index = () => {
  const productImages = [
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/15981a25-0160-4110-bf75-26fdf0087250.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/0dfcd5fe-fcc9-4c31-972f-87f7d3fb8aa4.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/ff4e4fbf-08a5-44f9-816d-081009bf3d4a.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/418df7d7-6dfd-42df-a442-d9779882d80e.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/b574e11d-ee86-4b6f-8ae7-c2809900c8b1.png',
    'https://cdn.poehali.dev/projects/b656551a-4437-4096-9803-a7d4bffb75c0/bucket/05e3950f-afa6-4d20-b683-bc378ebdd17a.png'
  ];

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

      <HeroSection productImages={productImages} />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Преимущества продукта</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Zap" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold">Максимальная эффективность</h3>
              <p className="text-gray-600">850мг чистого L-карнитина в каждой порции для достижения результата</p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-lg hover:shadow-xl transition-shadow animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Award" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Премиум качество</h3>
              <p className="text-gray-600">Произведено в России по стандартам GMP, сертифицировано</p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-lg hover:shadow-xl transition-shadow animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Leaf" size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Натуральный состав</h3>
              <p className="text-gray-600">Без ГМО, искусственных красителей и консервантов</p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <OrderForm />

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
                    Telegram поддержка
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Информация</h3>
              <div className="space-y-2 text-gray-400">
                <p>ИНН: 616310964327</p>
                <p>ОГРНИП: 323619600134180</p>
              </div>
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
