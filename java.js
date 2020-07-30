let game={
    'you':{'scoreSpan':'#your-no','div':'#flex-box-your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-no','div':'#flex-box-dealer-box','score':0  },
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardNo':{ '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11] },
    'isStand':false,
    'turnsOver':false,
    
    };
    let YOU=game['you'];
    let DEALER=game['dealer']
    let sound=new Audio('swish.m4a');
    let winS=new Audio('cash.mp3');
    let losS=new Audio('aww.mp3');
    CARD=randomCard()
    console.log(CARD);
    document.querySelector('#hit-btn').addEventListener('click',blackJack);
    function blackJack(){
        if(game['isStand']===false){
        let CARD=randomCard();
        showCard(CARD,YOU)
        showScore(CARD,YOU)
        show(YOU)
        console.log(YOU['score']);
        bust(YOU)
        }
    }
    document.querySelector('#deal-btn').addEventListener('click',restBtn);
    document.querySelector('#stand-btn').addEventListener('click',standBtn);
    
    
    function showCard(CARD,activePlayer){
        if(activePlayer['score']<=21){
    
            let imageGame=document.createElement('img');
       imageGame.src=CARD + '.png';
       document.querySelector(activePlayer['div']).appendChild(imageGame);
       sound.play();
        }
       
    }
    
    
    function randomCard(){
    
    
        let ranNo=Math.floor(Math.random()*13);
        return game['cards'][ranNo];
    
    }
    function restBtn(){
        if(game['turnsOver']===true){
            game['isStand']=false;
        
            let rest=document.querySelector('#flex-box-your-box').querySelectorAll('img');
        //for(i=0;i<rest.length;i++){
            //rest[i].remove();
            document.querySelector('#flex-box-your-box').innerHTML='';
            document.querySelector('#flex-box-your-box').innerHTML='<h2>you:<span id="your-no">0</span></h2>';
            document.querySelector('#flex-box-dealer-box').innerHTML='';
            document.querySelector('#flex-box-dealer-box').innerHTML='<h2>dealer:<span id="dealer-no">0</span></h2>';
            YOU['score']=0;
            DEALER['score']=0;
            document.querySelector('#black-jack-result').textContent='lets play';
            document.querySelector('#black-jack-result').style.color='black';
        
        game['turnsOver']=true;
        }
        
    }
    
    
    function showScore(CARD,activePlayer){
        if (CARD  ==='A'){
    if(activePlayer['score']+game['cardNo'][CARD][1]<=21){
        activePlayer['score']+=game['cardNo'][CARD][1];
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
    else{
        activePlayer['score']+=game['cardNo'][CARD][0];
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
        }
    
    else{
        
    
        activePlayer['score']+=game['cardNo'][CARD];
        
    
    }}
    function show(activePlayer){
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];}
    
    function bust(activePlayer){
        if(activePlayer['score']>21){
            document.querySelector(activePlayer['scoreSpan']).textContent='BUSTED!';
            document.querySelector(activePlayer['scoreSpan']).style.color='red';
            
        }
        else{
            document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
        }
    }
    
    
    function sleep(ms){
        return new Promise(resolve =>setTimeout(resolve,ms));
    }
    
    async function standBtn(){
      
        game['isStand']=true;
        while(DEALER['score']<16 && game['isStand']===true){
        let CARD=randomCard();
        showCard(CARD,DEALER);
        showScore(CARD,DEALER);
        show(DEALER);
        console.log(DEALER['score']);
        bust(DEALER);
        await sleep(1000);
    
    }
    
            game['turnsOver']=true;
            showResult(winner())
        
    }
    
    function winner(){
    
        let winners;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)) {
    winners=YOU;
        } else if(YOU['score']<DEALER['score']){
            winners=DEALER;
    
    
        }else if(YOU['score']=== DEALER['score']){
            
        }
    
        }else if(YOU['score']>21 && DEALER['score']<=21){
            winners=DEALER;
        }else if(YOU['score']>21 && DEALER['score']>21){
    
        }
        return winners;
    }
    
    function showResult(winners){
        let message,messageColor;
    if(game['turnsOver']===true){
        if(winners===YOU){
            message='You Won!';
            messageColor='green';
            winS.play();
        }else if(winners===DEALER){
            message='You Lost!'
            messageColor='red';
            losS.play();
        }else{
            message='You Drew';
            messageColor='yellow'
        }
        document.querySelector('#black-jack-result').textContent=message;
        document.querySelector('#black-jack-result').style.color=messageColor;
        }
    }
    