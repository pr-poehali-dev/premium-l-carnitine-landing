import json
import os
import psycopg2
import base64
import urllib.request
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import threading

def send_email_notification(subject: str, body: str):
    '''Отправка email уведомления'''
    try:
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = '89287730553@mail.ru'
        
        html_part = MIMEText(body, 'html', 'utf-8')
        msg.attach(html_part)
        
        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_host, smtp_port)
        else:
            server = smtplib.SMTP(smtp_host, smtp_port)
            server.starttls()
        
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f'Email error: {e}')

def send_telegram_notification(message: str):
    '''Отправка уведомления в Telegram'''
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        telegram_data = json.dumps({
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode('utf-8')
        
        req = urllib.request.Request(
            telegram_url,
            data=telegram_data,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        urllib.request.urlopen(req, timeout=5)
    except Exception as e:
        print(f'Telegram error: {e}')

def send_notifications_async(notification_type: str, **kwargs):
    '''Асинхронная отправка уведомлений'''
    if notification_type == 'new_order':
        order_id = kwargs.get('orderId')
        full_name = kwargs.get('fullName')
        phone = kwargs.get('phone')
        email = kwargs.get('email')
        address = kwargs.get('address')
        delivery_method = kwargs.get('deliveryMethod')
        amount = kwargs.get('amount')
        
        email_subject = f'Новый заказ #{order_id}'
        email_body = f'''
        <h2>Новый заказ #{order_id}</h2>
        <p><strong>ФИО:</strong> {full_name}</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Адрес:</strong> {address}</p>
        <p><strong>Доставка:</strong> {delivery_method}</p>
        <p><strong>Сумма:</strong> {amount} ₽</p>
        <p><strong>Статус:</strong> Ожидает оплаты</p>
        '''
        
        telegram_message = f'''
🆕 Новый заказ #{order_id}

👤 {full_name}
📱 {phone}
📧 {email}
📍 {address}
🚚 {delivery_method}
💰 {amount} ₽

⏳ Ожидает оплаты
        '''
    
    elif notification_type == 'payment_success':
        order_id = kwargs.get('orderId')
        
        email_subject = f'Заказ #{order_id} оплачен'
        email_body = f'''
        <h2>Заказ #{order_id} успешно оплачен!</h2>
        <p>Спасибо за покупку! Ваш заказ принят в обработку.</p>
        <p>Мы отправим товар в ближайшее время.</p>
        <p>Трек-номер для отслеживания будет отправлен на вашу почту.</p>
        '''
        
        telegram_message = f'''
✅ Заказ #{order_id} оплачен!

Заказ принят в обработку.
        '''
    else:
        return
    
    send_email_notification(email_subject, email_body)
    send_telegram_notification(telegram_message)

def create_order(body: dict) -> dict:
    '''Создание заказа в БД'''
    full_name = body.get('fullName', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    address = body.get('address', '').strip()
    delivery_method = body.get('deliveryMethod', '').strip()
    amount = 1990.00
    
    if not all([full_name, phone, email, address, delivery_method]):
        return {'error': 'Все поля обязательны для заполнения', 'status': 400}
    
    db_url = os.environ.get('DATABASE_URL')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor()
    
    insert_query = f"""
        INSERT INTO {schema}.orders 
        (full_name, phone, email, address, delivery_method, amount, status, payment_status, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """
    
    now = datetime.now()
    cursor.execute(insert_query, (
        full_name, phone, email, address, delivery_method,
        amount, 'pending', 'pending', now, now
    ))
    
    order_id = cursor.fetchone()[0]
    
    conn.commit()
    cursor.close()
    conn.close()
    
    payment_result = create_payment({
        'orderId': order_id,
        'amount': amount,
        'email': email,
        'description': f'Заказ #{order_id} - L-Карнитин PharmExpert'
    })
    
    if payment_result.get('status') == 200:
        notification_thread = threading.Thread(
            target=send_notifications_async,
            args=('new_order',),
            kwargs={
                'orderId': order_id,
                'fullName': full_name,
                'phone': phone,
                'email': email,
                'address': address,
                'deliveryMethod': delivery_method,
                'amount': amount
            }
        )
        notification_thread.daemon = True
        notification_thread.start()
        
        return {
            'status': 200,
            'data': {
                'success': True,
                'orderId': order_id,
                'paymentUrl': payment_result['data']['paymentUrl']
            }
        }
    else:
        return payment_result

def create_payment(body: dict) -> dict:
    '''Создание платежа через ЮKassa'''
    order_id = body.get('orderId')
    amount = body.get('amount')
    email = body.get('email')
    description = body.get('description', f'Заказ #{order_id}')
    
    if not all([order_id, amount, email]):
        return {'error': 'Не все параметры указаны', 'status': 400}
    
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    project_id = os.environ.get('AWS_ACCESS_KEY_ID')
    
    credentials = f'{shop_id}:{secret_key}'
    encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
    
    success_url = f'https://{project_id}.poehali.app/success?orderId={order_id}'
    
    payment_data = {
        'amount': {
            'value': f'{amount:.2f}',
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': success_url
        },
        'capture': True,
        'description': description,
        'receipt': {
            'customer': {
                'email': email
            },
            'items': [
                {
                    'description': 'L-Карнитин PharmExpert 850мг 120 капсул',
                    'quantity': '1.00',
                    'amount': {
                        'value': f'{amount:.2f}',
                        'currency': 'RUB'
                    },
                    'vat_code': 1
                }
            ]
        },
        'metadata': {
            'order_id': str(order_id)
        }
    }
    
    idempotence_key = str(uuid.uuid4())
    payment_json = json.dumps(payment_data).encode('utf-8')
    
    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=payment_json,
        headers={
            'Authorization': f'Basic {encoded_credentials}',
            'Idempotence-Key': idempotence_key,
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    with urllib.request.urlopen(req) as response:
        payment_response = json.loads(response.read().decode('utf-8'))
    
    payment_id = payment_response.get('id')
    payment_url = payment_response.get('confirmation', {}).get('confirmation_url')
    
    if payment_id and payment_url:
        db_url = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor()
        
        update_query = f"""
            UPDATE {schema}.orders
            SET payment_id = %s
            WHERE id = %s
        """
        
        cursor.execute(update_query, (payment_id, order_id))
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'status': 200,
            'data': {
                'success': True,
                'paymentId': payment_id,
                'paymentUrl': payment_url
            }
        }
    else:
        return {'error': 'Не удалось создать платеж', 'status': 500}

def handle_webhook(body: dict) -> dict:
    '''Обработка webhook от ЮKassa'''
    notification_type = body.get('event')
    payment_object = body.get('object', {})
    
    if notification_type == 'payment.succeeded':
        payment_id = payment_object.get('id')
        order_id = payment_object.get('metadata', {}).get('order_id')
        
        if not all([payment_id, order_id]):
            return {'error': 'Missing required fields', 'status': 400}
        
        db_url = os.environ.get('DATABASE_URL')
        schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
        
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor()
        
        update_query = f"""
            UPDATE {schema}.orders
            SET payment_status = %s, status = %s, updated_at = %s
            WHERE id = %s
        """
        
        now = datetime.now()
        cursor.execute(update_query, ('succeeded', 'paid', now, order_id))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        notification_thread = threading.Thread(
            target=send_notifications_async,
            args=('payment_success',),
            kwargs={'orderId': order_id}
        )
        notification_thread.daemon = True
        notification_thread.start()
        
        return {'status': 200, 'data': {'success': True}}
    
    return {'status': 200, 'data': {'success': True, 'message': 'Event ignored'}}

def handler(event: dict, context) -> dict:
    '''API для обработки заказов и платежей'''
    
    method = event.get('httpMethod', 'POST')
    path = event.get('requestContext', {}).get('http', {}).get('path', '/')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        action = body.get('action', 'create_order')
        
        if action == 'create_order':
            result = create_order(body)
        elif action == 'webhook':
            result = handle_webhook(body)
        else:
            result = {'error': 'Unknown action', 'status': 400}
        
        status_code = result.get('status', 200)
        response_data = result.get('data') if 'data' in result else {'error': result.get('error')}
        
        return {
            'statusCode': status_code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(response_data),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
