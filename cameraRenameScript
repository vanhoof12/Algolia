function ChangePrices() {
    const jsonObj= require('./data.json'); 
    const fs = require('fs');
    const fileName = './data.json';
    const file = require(fileName);    
    console.log("hello");
    for (var i=0; i<jsonObj.length; i++) {
        if (jsonObj[i].categories.includes("Cameras") ||     jsonObj[i].categories.includes("cameras")) {
          newPrice = Math.round(jsonObj[i].price / 10) * 10;
          console.log(newPrice)
          jsonObj[i].price = newPrice;
          fs.writeFileSync(fileName, JSON.stringify(jsonObj))
          return;
        }
      }
};

ChangePrices();