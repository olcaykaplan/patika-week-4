# Ödev | Kullanıcı Kayıt Uygulaması : 
	Kullanıcı : 
		adı //name,
		soyadı,//surname
		kullanıcıAdı,//userName
		şifre//password
	Kullanıcılar register olacak, register olan kullanıcılar mongodb de tutulacak
	Kayıtlı olan kullanıcı login olabilecek, login olan kullanıcının login olduğu browser bilgisi sessionda tutulacak ve kullanıcıya jwt token return edilecek, kullanıcının authni hem jwt tokendan hemde sessiondan aynı browser üzerinden mi geldi diye kontrol edilecek sonrasında yapmak istediği işlemler için bu kontrolleri geçmesi gerekecek. 
	Kullanıcılar listelenecek

## Kurulum
npm sürümü 14^
## Client
client dizini altında npm install komutu ile ihtiyaç duyulan paketler indirilmeli
npm start komutu ile client tarafı çalıştırılabilir.
## Server
server klasörü dizini altında npm install ile ihtiyaç duyulan paketler indirilmeli 
MySQL bilgileri girilmeli
* DB_HOST
* DB_USER
* DB_NAME
* DB_PASSWORD

JWT_SECRET ve SESSION_SECRET bilgileri de  boş bırakılmamalı
sonrasında  npm start komutu ile sunucu tarafı ayağa kaldırılabilir