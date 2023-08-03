(function(){
    var matches = 0;
    var images = [];
    var flippedCards = [];
    var modalGameOver = document.querySelector("#modalGameOver");
    var imgMatchSign = document.querySelector("#imgMatchSign");
	
    for(var i = 0; i < 16; i++){
		var img = {
			src: "img/" + i + ".jpg",
            id: i%8
		};
		images.push(img);
    }
    
    startGame ();

    function startGame (){
        matches = 0;

        flippedCards = [];
        images = randomSort(images);

        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");
         
        for(var i = 0; i <8; i++){
            frontFaces[i].classList.remove("flipped","match");
            backFaces[i].classList.remove("flipped","match");

            var card = document.querySelector("#card" + i);
            card.style.top = i<4 ? 0 + "px" : 126 + "px";
            card.style.left = (i===0)? 0 + "px" : i%4 * 84 + "px";

            card.addEventListener("click", flipCard, false);

            frontFaces[i].style.background = "url('"+ images[i].src +"')";
            frontFaces[i].setAttribute("id",images[i].id);
            
        }
        for(var i = 8; i<16 ; i++){
            frontFaces[i].classList.remove("flipped","match");
            backFaces[i].classList.remove("flipped","match");

            var card = document.querySelector("#card" + i);
            card.style.top = (i<12) ? 252 + "px" :  (252+126)+ "px";
            card.style.left = (i===8) ? 0 + "px": i%4 *84 + "px";
            
            card.addEventListener("click", flipCard, false);

            frontFaces[i].style.background = "url('"+ images[i].src +"')";
            frontFaces[i].setAttribute("id",images[i].id);

        }

        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener ("click", startGame, false);
    }
    
    function randomSort(oldArray){
		var newArray = [];
		
		while(newArray.length !== oldArray.length){
			var i = Math.floor(Math.random()*16);
			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);
			}
		}
		return newArray;
    }

    function flipCard(){
        
        if(flippedCards.length <2) {
            var faces = this.getElementsByClassName("face");
            
            if(faces[0].classList.length >2){
                return;
            }

            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");     

            flippedCards.push(this);

            if(flippedCards.length === 2){
                if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");
                    
                    matchCardSign();

                    matches++;
                    flippedCards = [];

                    if (matches === 8){
                        gameOver();
                    }
                }   
            }

        } else {
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = [];
        }
    }

    function gameOver(){
        modalGameOver.style.zIndex = 10;
        modalGameOver.addEventListener("click", startGame, false);
    }

    function matchCardSign(){
        imgMatchSign.style.zIndex = -10;
        imgMatchSign.style.opacity = 1;
        setTimeout(function(){
            imgMatchSign.style.zIndex = 2;
            imgMatchSign.style.opacity = 0;  
        },1000);
    }
}());

