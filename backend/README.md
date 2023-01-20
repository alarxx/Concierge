# Concierge back-end
npm install  
### development env:    
npm test  

Если пользуемся универсальным controller-ом, то  
обязательные методы при построении схемы модели - onCreate, deepDelete  
и "такие себе" в гибкости статичные методы publicFiles и nestedObjectKeys,  
которые указывают как работать с определенными ключами.  
Модели User и File особенные  
У File 3 метода: 2 static метода createFile(file, user)   
и deepDeleteById(id), которая внутри пользуется методом deepDelete.