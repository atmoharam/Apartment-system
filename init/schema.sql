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
        ('Cairo Governorate'),('Alexandria Governorate'),('Giza Governorate'),
        ('Qalyubia Governorate'),('Luxor Governorate'),('Dakahlia Governorate'),
        ('Gharbia Governorate'),('Asyut Governorate'),('Sohag Governorate');

INSERT INTO neighborhood(name, city_id) VALUES
                                            ('Abbassia',1),('Ain Shams',1),('Bab al-Louq',1),
                                            ('Downtown Cairo',1),('Shubra',1),('Al Hadrah',2),('Asafra',2);

INSERT INTO benefit (name) VALUES
                               ('Pool'),('Gym'),('Security'),('Parking'),('Garden'),('Elevator');
