const request=require('request');
const cheerio=require('cheerio');
let url=process.argv.slice(2)[0];

request(url,requestcallback);

function requestcallback(err,res,html)
{
    const $=cheerio.load(html);
    const notwinningteam=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .team.team-gray .name");
    const teamsnames=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .team .name");
    const teamscores=$(".match-info.match-info-MATCH.match-info-MATCH-half-width .score")
    let notwinningteams=$(notwinningteam[0]).text();
    let winningteam=($(notwinningteam[0]).text()==$(teamsnames[0]).text())?[$(teamsnames[1]).text(),$(teamscores[1]).text()]:[$(teamsnames[0]).text(),$(teamscores[0]).text()];
    console.log(winningteam);
}