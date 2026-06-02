# 🍕 Pizza Basilico
Detta är en projektuppgift i kursen backend-baserad webbutveckling som har gått ut på att jag som student ska skapa en webbapplikation för ett fiktivt företag som säljer mat. Webbapplikationen ska kommunicera med en webbtjänst som jag själv har skapat.

Denna webbplats är framtagen med ramverket Angular och har använt scss/sass för styling. Webbapplikationen är uppdelad i två delar, en vy för kunder och en vy för medarbetare på restaurangen. 

### Funktioner för kunder
- Se restaurangens meny
- Boka bord
- Beställa takeaway
- Läsa på om restaurangen

### Funktioner för medarbetare
- Redigera produkter i menyn
- Lägga till produkter i menyn
- Justera öppettiderna
- Ändra innehållet i texterna om företaget
- Se bordsbokningar för olika dagar
- Se dagens takeaway-beställningar

## Tekniker
- Angular som ramverk
- HTML
- TypeScript
- SCSS/SASS
- JSON Web Tokens
- REST API

## Autentisering och säkerhet
För att medarbetare ska komma åt funktionerna för att redigera innehållet på webbplatsen behöver de skapa ett konto och logga in. För detta har JSON Web Tokens använts för att verifiera användare och därmed ge dem åtkomst till de skyddade funktionerna.
