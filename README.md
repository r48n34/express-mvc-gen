# express-mvc-gen
Generate express-mvc-gen by typing with CLI.

### Features
1. Genetate MVC like route in express.js  
2. Assume using knex for query builder
3. Typescript first class generate

### Setup / Install:
```
npm i -g express-mvc-gen
```

### Usage:
```
emg -n your_route_name  

e.g.  
emg -n banana  

Output  
─ bananaRoute  
├── BananaController.ts  
├── BananaService.ts  
├── BananaRoute.ts  
```

