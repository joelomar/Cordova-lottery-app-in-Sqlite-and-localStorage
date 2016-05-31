document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

  alert('device ready');


//-----------Creating SQLite db-----------//


var db = window.sqlitePlugin.openDatabase({name: 'loto_app.db', location: 'default'});

db.transaction(function (tx) {

tx.executeSql('CREATE TABLE IF NOT EXISTS main (id integer primary key, username text, email text, points integer)');




}, errorCB, succesCB);

function errorCB() {

    alert('error table');


}

function succesCB(){

    alert('succes inn table');

}

//-----------Register to SQLite db-----------//

var dataPoints = 0;

db.transaction(function (tx) {

tx.executeSql("INSERT INTO main (username, email, points) VALUES (?,?,?)", ['Jou', 'jou@gmail.com', dataPoints]);


}, errorCBK, succesCBK);

function errorCBK() {

    alert('error inserting');


}

function succesCBK(){

    alert('succes inserting');

}

//-----------Read Points from SQLite-----------//

var moneyDiv = document.querySelector('#money'),

db.transaction(function (tx) {

tx.executeSql("SELECT points FROM main", [], function(tx, res) {

     var sqlRes = res.rows.length;

     for (var i = 0; i < sqlRes; i++) {

             var data = res.rows.item(i).points;
             
             moneyDiv.innerHTML = data;
         } 

    });

});


//---------User in Game Session------------//

var userSession = prompt('Username please'),
    userInp = window.localStorage.setItem('username', userSession),
    player = window.localStorage.getItem('username'),
    userHold = document.querySelector('#user_hold');
    userHold.innerHTML = player;

//---------Vars------------// 


var winNum = 123465, 
    winAutoNum = 223546,
    lowPrize = 5,
    medPrize = 75000,
    bigPrize = 500000,
    moneyScore = 0,
    inputNum = document.querySelector('#input_num'),
    fruitBut = document.querySelector('#btn_fruit'),
    autoBut = document.querySelector('#btn_auto'),
    playBut = document.querySelector('#btn_check'),
    butLoad = document.querySelector('#btn_load'),
    fruitDiv = document.querySelector('#results'),
    autoDiv = document.querySelector('#result_auto'),
    bigDiv = document.querySelector('#result_big');


//-------------------Fruit Game---------------//


fruitBut.onclick = function() {


  var straw = function () {

    a = Math.floor(Math.random() * 6);

    if (a === 1) {

        return 'Strawberry';
  }
  else if (a === 2) {
       
       return 'Apple';

    }
    else {
       
       return 'Banana';

    }

}
  var apple = function () {

    b = Math.floor(Math.random() * 6);

    if (b === 1) {

        return 'Strawberry';
  }
  else if (b === 2) {
       
       return 'Apple';

    }
    else {
       
       return 'Banana';

    }

}
  var ban = function () {

    x = Math.floor(Math.random() * 6);

    if (x === 1) {

        return 'Strawberry';
  }
  else if (x === 2) {
       
       return 'Apple';

    }
    else {
       
       return 'Banana';

    }

}

var funcStrw = straw(),
    funcApple = apple(),
    funcBan = ban();

fruitDiv.innerHTML = funcStrw + ' ' + funcApple + ' ' + funcBan;

if (funcStrw === funcApple && funcApple === funcBan) {

           moneyScore = moneyScore + lowPrize;
           window.localStorage.setItem('Money', moneyScore);
           var moneyHolder = window.localStorage.getItem('Money');
           moneyDiv.innerHTML = '$' + moneyHolder;
           navigator.notification.beep(1);
           navigator.vibrate(50);

           db.transaction(function (tx) {

             tx.executeSql("INSERT INTO main where username like('%" + userSession + "%') (points) VALUES (?)", [moneyScore]);

           }, errorCall, succesCall); 


           function errorCall() {

                alert('error adding points');

              }

          function succesCall(){

               alert('succes adding points');

              }

     
     }


}

//-------------------Automatic Game---------------//


autoBut.onclick = function() {


      var a = Math.floor(Math.random() * 200000) + 100000;
      

      if (a === winAutoNum) {

          
           moneyScore = moneyScore + midPrize;
           window.localStorage.setItem('Money', moneyScore);
           var moneyHolder = window.localStorage.getItem('Money');
           moneyDiv.innerHTML = '$' + moneyHolder;
           navigator.notification.beep(1);
           navigator.vibrate(50);
           alert('You 75,000 Dollars');

           db.transaction(function (tx) {

             tx.executeSql("INSERT INTO main where username like('%" + userSession + "%') (points) VALUES (?)", [moneyScore]);

           }, errorCall, succesCall); 


           function errorCall() {

                alert('error adding points');

              }

          function succesCall(){

               alert('succes adding points');

              }

      }

      autoDiv.innerHTML = a;

         
   
}

//-------------------Loto Pro Game---------------//


playBut.onclick = function() {

    var numValue = parseInt(inputNum.value);

      if (numValue === winNum) {

           
           moneyScore = moneyScore + bigPrize;
           window.localStorage.setItem('Money', moneyScore);
           var moneyHolder = window.localStorage.getItem('Money');
           moneyDiv.innerHTML = '$' + moneyHolder;
           navigator.notification.beep(1);
           navigator.vibrate(50);
           alert('You Win a Half of a Million!!!');

           db.transaction(function (tx) {

             tx.executeSql("INSERT INTO main where username like('%" + userSession + "%') (points) VALUES (?)", [moneyScore]);

           }, errorCall, succesCall); 


           function errorCall() {

                alert('error adding points');

              }

          function succesCall(){

               alert('succes adding points');

              }


      }

      else {
          
          bigDiv.innerHTML = 'You Lose!!!'
          //alert('you lose!!');

      }


}

//-------------Load App-------------//

var checkGame = function () {

  if (moneyScore >= 2000000) {
     
     alert('YOU WIN THE GAME');

}

}

setInterval(function () {
  
  checkGame();

},1000);

//-------------Load App-------------//

butLoad.onclick = function() {

   window.location.reload();

}

}



