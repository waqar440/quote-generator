const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuotebtn=document.getElementById('new-quote');
const loader = document.getElementById('loaderr');
let apiQuotes =[];
function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(quote.author===null){
        quoteAuthor.textContent = 'Unknown';
    }
    else{
    quoteAuthor.textContent=quote.author;
    }
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    complete();
}
async function getApi(){
    loading();
    const url ='https://type.fit/api/quotes';
    try{
    const response= await fetch(url);
    apiQuotes =await response.json();
    newQuote();
    }catch(erorr){
    //Error   
    }
}
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank');
}

newQuotebtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
// loader
getApi();

