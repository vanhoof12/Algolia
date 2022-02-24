function ChangePrices() {
    const jsonObj= require('./products.json'); 
    const fs = require('fs');
    const fileName = './products.json';
    const file = require(fileName);    
    console.log("hello");
    for (var i=0; i<jsonObj.length; i++) {
        console.log(jsonObj[i].categories)
        var fullString = jsonObj[i].categories.toString();
        if (fullString.includes('Cameras') || fullString.includes('cameras')) {
          newPrice = Math.round(jsonObj[i].price / 10) * 10;
          console.log(newPrice)
          jsonObj[i].price = newPrice;
        }
      }
      fs.writeFileSync(fileName, JSON.stringify(jsonObj))
      return;
};

ChangePrices();
