const cheerio=require('cheerio');
const request=require('request');
const fs=require('fs');
const chalk=require('chalk');
const table=require('table');
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard",requestcallback);

let batsmanProfileURLs=[];
function requestcallback(err,res,html)
{
    const $=cheerio.load(html);
    //const batsmanAnchorTags=$(".batsman-cell a");
    const row=$(".table.batsman tbody tr");
    //console.log(Object.keys(row));
    for(let i=0;i<row.length;i++)
    {
        if($($(row)[i]).text().length==0 || $($(row)[i]).text().length<=29)
        {
            continue;
        }
        if($($(row)[i]).find('a').attr("href")==undefined)
        {
            continue;
        }
        let playername=$($(row)[i]).find('a').text();
        let playerurl="https://www.espncricinfo.com"+$($(row)[i]).find('a').attr("href");
        //console.log($($(row)[i]).text().length);
        let playerdetail=$($(row)[i]).find('td');
        batsmanProfileURLs.push({
            name:playername,
            url:playerurl,
            OutBy:$($(playerdetail)[1]).text(),
            runs:$($(playerdetail)[2]).text(),
            balls:$($(playerdetail)[3]).text(),
            fours:$($(playerdetail)[5]).text(),
            sixes:$($(playerdetail)[6]).text(),
            strikerate:$($(playerdetail[7])).text()      
        });
    }
    for(let j in batsmanProfileURLs)
    {
        if(batsmanProfileURLs[j].url==undefined)
        {
            continue;
        }
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
    batsmanProfileURLs[index][`Date of Birth`]=playerbirth;
    if(count==batsmanProfileURLs.length) //here batsmanProfileURLs.length is 18
    {
        //console.log(batsmanProfileURLs);
        display(batsmanProfileURLs);
    }
}
function display(playersarr)
{
    console.log("\r\n"+chalk.blue(chalk.underline.bold("DETAILS OF DIFFERENT IPL PLAYERS SCRAPPED FROM ESPNCRICINFO WEBSITE\r\n")));
    let arr=[[chalk.blue("Name"),chalk.redBright("OutBy"),chalk.red("URL"),chalk.greenBright("Runs"),
    chalk.magenta("Balls Played"),chalk.cyan("Fours"),chalk.blueBright("Sixes"),chalk.grey("Date of Birth"),chalk.magenta("Strike Rate")]];
    let filearr=[["Name","OutBy","URL","Runs","Balls Played","Fours","Sixes","Date of Birth","Strike Rate"]];
    config={
        border:table.getBorderCharacters("ramac"),
    }
    for(let i=0;i<playersarr.length;i++)
    {
        arr.push([playersarr[i]["name"],playersarr[i]["OutBy"],
        playersarr[i]["url"],playersarr[i]["runs"],
        playersarr[i]["balls"],playersarr[i]["fours"],playersarr[i]["sixes"],playersarr[i]["Date of Birth"],playersarr[i]["strikerate"]]);
        filearr.push([playersarr[i]["name"],playersarr[i]["OutBy"],
        playersarr[i]["url"],playersarr[i]["runs"],
        playersarr[i]["balls"],playersarr[i]["fours"],playersarr[i]["sixes"],playersarr[i]["Date of Birth"],playersarr[i]["strikerate"]]);
    }
    let tableddata=table.table(arr,config);
    let filetabledata=table.table(filearr,config);
    fs.writeFileSync("iplplayersdetail.txt",filetabledata);
    console.log(tableddata);
}
