import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      setOrderDetails({
        id: orderId,
        amount: 1990,
        status: 'paid'
      });
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl animate-fade-in">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-fade-in">
              <Icon name="CheckCircle2" size={48} className="text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-green-600 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Оплата успешно выполнена!
          </h1>
          
          <p className="text-xl text-gray-600 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Ваш заказ №{orderId || 'XXXXX'} оформлен и оплачен
          </p>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 space-y-3 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center gap-3 text-left">
              <Icon name="Package" size={24} className="text-green-600" />
              <div>
                <p className="font-semibold">L-Карнитин PharmExpert</p>
                <p className="text-sm text-gray-600">850 мг, 120 капсул</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <Icon name="CreditCard" size={24} className="text-green-600" />
              <div>
                <p className="font-semibold">Сумма оплаты</p>
                <p className="text-sm text-gray-600">1 990 ₽</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start gap-3 text-left p-4 bg-blue-50 rounded-lg">
              <Icon name="Mail" size={24} className="text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900">Письмо отправлено на вашу почту</p>
                <p className="text-sm text-blue-700">Проверьте папку "Входящие" или "Спам"</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left p-4 bg-purple-50 rounded-lg">
              <Icon name="Truck" size={24} className="text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-purple-900">Доставка в течение 3-5 дней</p>
                <p className="text-sm text-purple-700">Трек-номер будет отправлен на ваш email</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left p-4 bg-green-50 rounded-lg">
              <Icon name="MessageCircle" size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Возникли вопросы?</p>
                <p className="text-sm text-green-700">Напишите нам в Telegram или на почту</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/'}
              className="hover:scale-105 transition-transform"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Вернуться на главную
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open('https://t.me/badpoehalibot', '_blank')}
              className="hover:scale-105 transition-transform"
            >
              <Icon name="Send" size={20} className="mr-2" />
              Написать в поддержку
            </Button>
          </div>

          <p className="text-sm text-gray-500 pt-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
            Благодарим за покупку! Мы ценим ваше доверие
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
