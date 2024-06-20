AukcjeMarket

Opis Projektu:
AukcjeMarket to system aukcji internetowych, który umożliwia użytkownikom wystawianie oraz licytację przedmiotów. System jest zaprojektowany w architekturze MVC i wykorzystuje REST API do komunikacji pomiędzy komponentami. Dane są przechowywane w bazie danych(Mongo Bd), a płatności realizowane są przez sandbox operatora płatności Stripe.

Strony:
Główna strona - Wyświetla wszystkie dostępne produkty do licytacji.
Strona produktu - Szczegółowe informacje o wybranym produkcie.
Strona rejestracji i logowania - Umożliwia rejestrację nowego użytkownika oraz logowanie do systemu.
Strona użytkownika - Informacje o profilu użytkownika oraz jego aktywności.
Strona płatności - Umożliwia dokonanie płatności za wylicytowany przedmiot.
Strony edycji - Umożliwiają edycję danych użytkownika oraz produktów.

Funkcjonalność REST API
Obsługa użytkowników:
Rejestracja użytkownika - Dodawanie nowego użytkownika do systemu.
Logowanie użytkownika - Uwierzytelnianie użytkownika.
Aktualizacja danych użytkownika - Edytowanie informacji o użytkowniku.
Usunięcie użytkownika - Usuwanie konta użytkownika.
Pobranie danych użytkownika - Wyświetlanie informacji o użytkowniku.

Obsługa aukcji:
Dodawanie przedmiotu do licytacji - Dodawanie nowego przedmiotu na aukcję.
Edycja przedmiotu do licytacji - Modyfikowanie informacji o przedmiocie.
Usunięcie przedmiotu z licytacji - Usuwanie przedmiotu z aukcji.
Pobranie informacji o przedmiocie - Wyświetlanie szczegółów przedmiotu.
Pobranie wszystkich produktów - Wyświetlanie listy wszystkich przedmiotów na aukcji.

Płatności:
Dokonanie płatności - Realizacja płatności za wylicytowany przedmiot przez Stripe sandbox.

Technologia:
Backend
Node.js
Express.js
Mongoose
Swagger - Dokumentacja API

Frontend
HTML
CSS (Bootstrap)
Gulp + Webpack - Narzędzia do budowy i zarządzania projektem


Uruchomienie Projektu
1. Zainstaluj zależności:
npm install
2. Uruchom projekt:
npm run start
3. Strona powinna otworzyć się automatycznie w przeglądarce.


Dokumentacja API:
Dokumentacja REST API dostępna jest pod adresem: http://localhost:5375/api-docs/



