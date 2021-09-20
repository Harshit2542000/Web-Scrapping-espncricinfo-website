const cheerio=require('cheerio');
const request=require('request');
let fs=require('fs');
let chalk=require('chalk');
let url=process.argv.slice(2).join("");
request(url,requestcallback);
function requestcallback(err,res,html)
{
    const $=cheerio.load(html);
    let firstteamscore=$($(".thead-light>.text-right.font-weight-bold")[0]).text();
    let secondteamscore=$($(".thead-light>.text-right.font-weight-bold")[1]).text();
    let firstscore=parseInt(firstteamscore.split("/")[0]);
    let secondscore=parseInt(secondteamscore.split("/")[0]);
    if(firstscore==secondscore)
    {
        let winningteam=$(".status-text>span").length-1;
        let winningteamname=$($(".status-text>span")[winningteam]).text();
        let teams=$(".team").text();
        let arr=teams.split("Under-19s");
        let mainarr=arr[arr.length-1];
        let firststr="";
        let secondstr="";
        let i=0;
        for(;i<mainarr.length;i++)
        {
            if(mainarr[i].charCodeAt(0)>=47 && mainarr[i].charCodeAt(0)<=57)
            {
                 break;
            }
            else{
                firststr=firststr+mainarr[i];
            }
        }
        i=i+5;
        for( ;i<mainarr.length;i++)
        {
            if(mainarr[i]=='(')
            {
                break;
            }
            else{
                secondstr=secondstr+mainarr[i];
            }
        }
        console.log(chalk.red("Match Result:-"+winningteamname));
        console.log(chalk.red("The Scores of both teams are:-"));
        console.log(chalk.blue(firststr+":-"+firstteamscore));
        console.log(chalk.blue(secondstr+":-"+secondteamscore));
    }
    else{
       let winningscore=(firstscore>secondscore)? firstteamscore:secondteamscore;
       let winningteam=$(".status-text>span").length-1;
       let winningteamname=$($(".status-text>span")[winningteam]).text();
       console.log(chalk.red("Winning Team:- "+winningteamname));
       console.log(chalk.blue("Winning Score:-"+winningscore));
    }
}
