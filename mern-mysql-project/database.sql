-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS mern_auth_db;

USE mern_auth_db;



-- USERS TABLE
CREATE TABLE users (

 id INT AUTO_INCREMENT PRIMARY KEY,

 name VARCHAR(100) NOT NULL,

 email VARCHAR(100) NOT NULL UNIQUE,

 phone VARCHAR(20),

 password VARCHAR(255) NOT NULL,

 reset_token VARCHAR(255) DEFAULT NULL,

 reset_token_expiry DATETIME DEFAULT NULL,

 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);



-- ITEMS TABLE
CREATE TABLE items (

 id INT AUTO_INCREMENT PRIMARY KEY,

 user_id INT NOT NULL,

 title VARCHAR(255) NOT NULL,

 description TEXT,

 status ENUM('active','pending','completed') DEFAULT 'active',

 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

 FOREIGN KEY (user_id)
 REFERENCES users(id)
 ON DELETE CASCADE

);



-- INDEXES (for performance)

CREATE INDEX idx_user_email ON users(email);

CREATE INDEX idx_items_user ON items(user_id);

CREATE INDEX idx_items_status ON items(status);



-- SAMPLE DATA (optional)

INSERT INTO users (name,email,phone,password)
VALUES
('Test User','test@gmail.com','9999999999','$2a$10$samplehash');


INSERT INTO items (user_id,title,description,status)
VALUES
(1,'Sample Task','First sample item','active'),
(1,'Pending Task','Second item','pending'),
(1,'Completed Task','Third item','completed');