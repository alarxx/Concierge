const obj = {id: 1234, 'hotel/booking': 1234};
const arr = ['hotel/booking'];

const matchedKeys = (obj, keys) => keys.filter(key => obj.hasOwnProperty(key));

// console.log(arr.some(key => obj.hasOwnProperty(key)));

console.log(matchedKeys(obj, arr));