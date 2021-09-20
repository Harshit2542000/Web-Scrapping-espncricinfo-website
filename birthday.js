const cheerio=require('cheerio');
const request=require('request');

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard",requestcallback);

let batsmanProfileURLs=[];
function requestcallback(err,res,html)
{
    const $=cheerio.load(html);
    const batsmanAnchorTags=$(".batsman-cell a");
    for(let i=0;i<batsmanAnchorTags.length;i++)
    {
        batsmanProfileURLs.push({
            name:$(batsmanAnchorTags[i]).text(),
            url:"https://www.espncricinfo.com" + $(batsmanAnchorTags[i]).attr("href")
        });
    }
    for(let j in batsmanProfileURLs)
    {
        request(batsmanProfileURLs[j].url,birthdaycallback.bind(this,j));
    }
}
let count=0;
function birthdaycallback(index,err,res,html)
{
    count++;
    const $=cheerio.load(html);
    const playerdateofbirth=$($("h5.player-card-description.gray-900")[1]).text();
    let playerbirth=playerdateofbirth.split(",")[0].split(" ")[1]+" "+playerdateofbirth.split(",")[0].split(" ")[0]+","+playerdateofbirth.split(",")[1].trim();
    batsmanProfileURLs[index]["Date of Birth"]=playerbirth;
    if(count==batsmanProfileURLs.length) //here batsmanProfileURLs.length is 18
    {
        console.log(batsmanProfileURLs);
    }
}
