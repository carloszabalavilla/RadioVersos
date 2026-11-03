FROM php:8.4.27-apache
RUN docker-php-ext-install mysqli
COPY www/ /var/www/html/
