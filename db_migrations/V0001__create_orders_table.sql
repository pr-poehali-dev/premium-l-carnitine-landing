-- Создание таблицы заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    delivery_method VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL DEFAULT 1990.00,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_id VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_payment_id ON orders(payment_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);