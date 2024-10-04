# 💡 express-mvc-gen
Generate express-mvc-gen by typing with CLI.

<p align="left">

<a href="https://www.npmjs.com/package/express-mvc-gen"> <img src="https://img.shields.io/npm/v/express-mvc-gen" /> </a>
<a href="https://github.com/r48n34/express-mvc-gen"><img src="https://img.shields.io/github/actions/workflow/status/r48n34/express-mvc-gen/test.yml" /></a>

</p>

### 💡 Features
1. Genetate MVC like route in express.js  
2. Assume using knex for query builder
3. Typescript first class generate

### 🚀 Setup / Install
```
npm i -g express-mvc-gen
```

### 🤔 Usage
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

#### 📝 Dev logs
#### - 1.1.0
1. Better cli performances compare to older version.
2. Adding smart color in cli.
