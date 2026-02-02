import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ReviewsSection = () => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Отзывы покупателей</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-shadow animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
