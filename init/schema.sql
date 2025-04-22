-- ENUM types
CREATE TYPE apartment_status AS ENUM ('rent', 'sale');
CREATE TYPE apartment_type AS ENUM ('villa', 'chalet', 'apartment');

-- Cities
CREATE TABLE city (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(100) UNIQUE NOT NULL
);

-- Neighborhoods
CREATE TABLE neighborhood (
                              id SERIAL PRIMARY KEY,
                              name VARCHAR(100) NOT NULL,
                              city_id INT REFERENCES city(id) ON DELETE CASCADE,
                              UNIQUE(name, city_id)
);

-- Publishers
CREATE TABLE publisher (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                 phone_number VARCHAR(20),
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Benefits
CREATE TABLE benefit (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(50) UNIQUE NOT NULL
);

-- Apartments
CREATE TABLE apartment (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           owner_company VARCHAR(100) NOT NULL,
                           status apartment_status NOT NULL,
                           type apartment_type NOT NULL,
                           price DECIMAL(12,2) NOT NULL,  -- Added price field
                           rooms_count INT CHECK (rooms_count >= 0),
                           bathrooms_count INT CHECK (bathrooms_count >= 0),
                           size DOUBLE PRECISION CHECK (size > 0),
                           photo_urls TEXT[],

    -- Address fields
                           street_name VARCHAR(100),
                           building_number VARCHAR(20),
                           zip_code VARCHAR(20),
                           latitude DOUBLE PRECISION,
                           longitude DOUBLE PRECISION,

    -- Descriptive fields
                           header_description TEXT,
                           description TEXT,

    -- Relationships
                           publisher_id INT REFERENCES publisher(id) ON DELETE SET NULL,
                           city_id INT REFERENCES city(id) NOT NULL,
                           neighborhood_id INT REFERENCES neighborhood(id),
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Apartment-Benefit relation
CREATE TABLE apartment_benefit (
                                   apartment_id INT REFERENCES apartment(id) ON DELETE CASCADE,
                                   benefit_id INT REFERENCES benefit(id) ON DELETE CASCADE,
                                   PRIMARY KEY (apartment_id, benefit_id)
);

-- Indexes for performance
CREATE INDEX idx_apartment_city ON apartment(city_id);
CREATE INDEX idx_apartment_neighborhood ON apartment(neighborhood_id);
CREATE INDEX idx_apartment_status ON apartment(status);
CREATE INDEX idx_apartment_type ON apartment(type);
CREATE INDEX idx_apartment_benefits ON apartment_benefit(apartment_id);
CREATE INDEX idx_apartment_price ON apartment(price);

-- Sample data
INSERT INTO city(name) VALUES
    ('Alexandria'),('Aswan'),('Asyut'),('Beheira'),('Beni Suef'),
    ('Cairo'),('Dakahlia'),('Damietta'),('Faiyum'),('Gharbia'),
    ('Giza'),('Ismailia'),('Kafr El Sheikh'),('Luxor'),('Matruh'),
    ('Minya'),('Monufia'),('New Valley'),('North Sinai'),('Port Said'),
    ('Qalyubia'),('Qena'),('Red Sea'),('Sharqia'),('Sohag'),
    ('South Sinai'),('Suez'); 

INSERT INTO neighborhood(name, city_id) VALUES
    -- Alexandria
    ('Al Hadrah',1),('Asafra',1),('Miami',1),('Mandara',1),('Sidi Gaber',1),('Sporting',1),('Stanley',1),
    -- Aswan
    ('Al-Seil',2),('Old Aswan',2),('Aswan City Center',2),('Al-Sad Al-Ali',2),
    -- Asyut
    ('Al-Hamra',3),('Al-Walidiyah',3),('City Center',3),('Al-Arbeen',3),
    -- Beheira
    ('Damanhour',4),('Kafr El Dawar',4),('Rashid',4),('Edko',4),
    -- Beni Suef
    ('Al-Wasta',5),('Naser',5),('City Center',5),('Al-Fashn',5),
    -- Cairo
    ('Abbassia',6),('Ain Shams',6),('Bab al-Louq',6),('Downtown Cairo',6),('Shubra',6),('Zamalek',6),('Maadi',6),('Heliopolis',6),
    -- Dakahlia
    ('Mansoura',7),('Talkha',7),('Mit Ghamr',7),('Aga',7),
    -- Damietta
    ('Ras El Bar',8),('New Damietta',8),('El Senaneyah',8),('City Center',8),
    -- Faiyum 
    ('Sennoris',9),('Tamiya',9),('City Center',9),('Ibsheway',9),
    -- Gharbia
    ('Tanta',10),('El Mahalla',10),('Kafr El Zayat',10),('Samanoud',10),
    -- Giza
    ('Dokki',11),('Mohandessin',11),('Agouza',11),('Imbaba',11),('Haram',11),('6th of October',11),
    -- Ismailia
    ('Al Qantara',12),('El Tal El Kebir',12),('City Center',12),('Abu Sowir',12),
    -- Kafr El Sheikh
    ('Baltim',13),('Desouk',13),('Fuwwah',13),('City Center',13),
    -- Luxor
    ('East Bank',14),('West Bank',14),('Karnak',14),('New Luxor',14),
    -- Matruh
    ('Mersah Matruh',15),('El Hamam',15),('El Dabaa',15),('Siwa',15),
    -- Minya
    ('Abu Qurqas',16),('Mallawi',16),('Samalut',16),('City Center',16),
    -- Monufia
    ('Shibin El Kom',17),('Ashmoun',17),('Menouf',17),('Quesna',17),
    -- New Valley
    ('Kharga',18),('Dakhla',18),('Farafra',18),('Paris',18),
    -- North Sinai
    ('Al Arish',19),('Bir al-Abed',19),('Sheikh Zuweid',19),('Rafah',19),
    -- Port Said
    ('Al Arab',20),('Al Manakh',20),('Port Fouad',20),('Al Zohour',20),
    -- Qalyubia
    ('Banha',21),('Qalyub',21),('Shubra Al Kheima',21),('Al Khanka',21),
    -- Qena
    ('Dendera',22),('Nag Hammadi',22),('Qift',22),('City Center',22),
    -- Red Sea
    ('Hurghada',23),('Safaga',23),('Marsa Alam',23),('El Quseir',23),
    -- Sharqia
    ('Zagazig',24),('Abu Kabir',24),('Bilbeis',24),('10th of Ramadan',24),
    -- Sohag
    ('Akhmim',25),('Girga',25),('Dar El Salam',25),('City Center',25),
    -- South Sinai
    ('Sharm El Sheikh',26),('Dahab',26),('Nuweiba',26),('Saint Catherine',26),
    -- Suez
    ('Al Arbain',27),('Faisal',27),('Al Ganayen',27),('Ataka',27);

INSERT INTO benefit (name) VALUES
                               ('Pool'),('Gym'),('Security'),('Parking'),('Garden'),('Elevator');

-- Insert publishers
INSERT INTO publisher (name, email, phone_number)
VALUES
    ('John Doe', 'john@example.com', '123456789'),
    ('Jane Smith', 'jane@example.com', '987654321'),
    ('Ahmed Ali', 'ahmed@example.com', '555123456'),
    ('Sara Ibrahim', 'sara@example.com', '444987654');

-- Insert apartments
INSERT INTO apartment (
    name, owner_company, status, type, price, rooms_count, bathrooms_count, size,
    street_name, building_number, zip_code, latitude, longitude,
    header_description, description, publisher_id, city_id, neighborhood_id
)
VALUES
    ('New Luxury Apartment', 'Premium Developers', 'sale', 'apartment', 2500000, 4, 3, 200,
     'Jonden', '3', '4583', 1.36612616126, 0.3126416165126,
     'TEST', 'test', 1, 1, 2),
    ('Cozy Family Home', 'Family Builders', 'rent', 'villa', 1500000, 5, 4, 300,
     'Main Street', '10', '1234', 1.23456789, 0.987654321,
     'Spacious villa', 'Perfect for families', 2, 2, 3),
    ('Modern Studio', 'Urban Living', 'sale', 'apartment', 800000, 1, 1, 60,
     'Downtown Ave', '5B', '5678', 1.111111, 0.222222,
     'Compact studio', 'Ideal for singles', 3, 3, 4),
    ('Beachside Bungalow', 'Sea Breeze Ltd.', 'rent', 'chalet', 1200000, 3, 2, 150,
     'Ocean Drive', '7', '9101', 1.333333, 0.444444,
     'Relaxing chalet', 'Close to the beach', 4, 4, 5);

-- Associate benefits with apartments
INSERT INTO apartment_benefit (apartment_id, benefit_id)
VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 2), (2, 3),
    (3, 1), (3, 2), (3, 3),
    (4, 1), (4, 2), (4, 3);