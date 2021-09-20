const cheerio=require('cheerio');
const request=require('request');
const fs=require('fs');

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",requestcallback);

function requestcallback(err,res,html)
{
    //fs.writeFileSync("temp.html",html);
    const $=cheerio.load(html);
    console.log($(".playerofthematch-name").length); //gives an array of player of the match and player of series length=2
    console.log($($(".playerofthematch-name")[0]).text()); //gets the text of the tag of player of the match
    console.log($($(".playerofthematch-name")[1]).text()); //gets the text of the tag of player of the series
    console.log($($(".playerofthematch-name")[1]).get(0).attribs); //gets all of the attributes of the current tag
}