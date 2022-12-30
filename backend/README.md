# Concierge back-end
npm install  
### development env:    
npm test  

Обязательные методы при построении схемы модели - set, deepDelete  
(кроме модели File, она особенная).  
При использовании модели, кроме File, есть 3 основных метода:   
set, save, deepDelete.  
У File только 2 static метода createAndMove и deleteAndRemoveById.