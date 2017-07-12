module.exports = {
    "up": "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(100) NOT NULL UNIQUE, password TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    "down": ""
}
