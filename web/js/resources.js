/* *****************************************************************
Description:
  This will be called anytime a dropdown menu option is clicked and will
  populate each dropdown with the resources retreived from the backend. 
  Needed to store previous values of sport, league, team, season, and game

  Generates all the possible options based on what the user selects in the dropdowns.
  These parameters are passed to plot() in order to generate a token
  and get all the relevant statistics for those specific parameters.

Classes:
  dropdown: This will store values through page refreshes so that all values are present for 
            subsequent calls to the api.
            All methods are used inside this class in order to shorten code.

Methods:
  getLeagues:
  getFactAttributes:
  getDimensions:
  getTeams:
  getSeasons:
  getGames:
  getCharts: this needs to be adjusted to limit chart options based on Group By (CUBE, ROLLUP, or NONE)
  getToken:
  getStats:
  getPlayerList: not currently implemented
  getGroupBy: replaced "getCubeOrRollup"

  getSoccerStats: can't have this hardcoded
  getBasketballStats: pointless but left it there

Dependencies:

******************************************************************* */

/*
Description:
  This object is intended to store all the values that the user selected while 

Args:
Returns:
Raises:
Notes:
*/
var dropdown = { 
  sport: "null",
  league: "null",
  team: "null",
  season: "null",
  game: "null",
  aggregationStyle: "null",
  chartType: "null",
  token: "null",
  player: "null",
  factatt: "null",

  run: $(document).ready(function() {
    var defaultString = "<option value = \"null\" >--Make a choice--</option>";

    $("#sport, #league, #team, #season, #game, #aggregationStyle").change(function() {

      if ($(this).attr('id') == 'sport') {
        sport = $(this).val();
        $("#league").html(getLeagues(sport));

        //$("#chartType").html(getCharts());

        // Reset options below league
        $("#team").html(defaultString);
        $("#season").html(defaultString);
        $("#game").html(defaultString);
        $("#stat1").html(defaultString);    // stat1 doesn't exist anymore, need to update later      
        // $("#chartType").html(defaultString); 
        $("axes").html(defaultString);
        $("#factAttribute").html(getFactAttribute(sport));
        $("#dimensions").html(getDimensions(sport));

      }

      else if ($(this).attr('id') == 'league') {
        league = $("#league").val();
        $("#team").html(getTeams(sport, league));

        // Reset options below team
        $("#season").html(defaultString);
        $("#game").html(defaultString);
        $("#stat1").html(defaultString);
        // $("#chartType").html(defaultString);
        $("axes").html(defaultString);
      }

      else if ($(this).attr('id') == 'team') {
        team = $("#team").val();
        $("#season").html(getSeasons(sport, league, team));

        // Reset games
        $("#game").html(defaultString);
      }

      else if ($(this).attr('id') == 'season') {
        season = $("#season").val();
        $("#game").html(getGames(sport, league, team, season));

        // reset options below game
        $("#stat1").html(defaultString);
        // $("#chartType").html(defaultString);
        $("axes").html(defaultString);
      }

      else if ($(this).attr('id') == "game"){
        game = $("#game").val();
        //$("#stat1").html(getStats(sport, league, team, season));
        $("#players").html(getPlayerList(sport, league, team, game));

        // token = getToken(sport, league, team, season, game);

        // Reset chart type and axes
        // $("#chartType").html(getCharts());
        // Populate players once games are selected
      }


      else if ($(this).attr('id') == 'aggregationStyle') {
        aggregationStyle = $("#aggregationStyle").val();
        $("#chartType").html(getCharts(aggregationStyle));

        // Reset games
      }

      else if ($(this).attr('id') == "chartType"){
        chartType = $("chartType").val();

      }
    });
  })
}


/*
  Description:
    return string of all seasons for a given sport/league/team
  Args:
  Returns:
  Raises:
  Notes:
*/
function getToken(sport, league, team, season, game){
  var parameters = [["sports", sport], ["league", league], ["team", team], ["season", season], ["match", game]];

  var token = getRestResource("TokenResource", parameters);
  console.log("Token: " + token["token"]);

  return token;
}


/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
// get array of leagues based on sport
function getLeagues(sport) {

  var parameters = [["sports", sport], ];
  var htmlLeagueString = "<option value = \"null\" >--Make a choice--</option>";

  if (sport == "null") return htmlLeagueString;

  var json = getRestResource("LeagueListResource", parameters);

  console.log("Leagues found: ".concat(json.leagues.length));

  // create string for every league
  for (i = 0; i < json.leagues.length; ++i){
    htmlLeagueString = htmlLeagueString.concat("<option value = \"" + json.leagues[i] + "\">" + json.leagues[i] + "</option>");
  }

  document.getElementById("league").innerHTML = htmlLeagueString;

  return htmlLeagueString;
};

/*
  Description:
    return string of all teams based on sport/league
  Args:
  Returns:
  Raises:
  Notes:
*/
function getTeams(sport, league){

  var parameters = [["sports", sport], ["league", league]];
  var htmlTeamString = "<option value = \"null\" >--Make a choice--</option>";

  // place conditionals to get allow passing null values when other values are present (pass in all teams)
  if (sport == "null" || league == "null") return htmlTeamString;

  var json = getRestResource("TeamListResource", parameters);
  console.log("Teams found: ".concat(json.teams.length));

  for (i = 0; i < json.teams.length; ++i){
    htmlTeamString = htmlTeamString.concat("<option value = \"" + json.teams[i] + "\">" + json.teams[i] + "</option>")
  }

  document.getElementById("team").innerHTML = htmlTeamString;

  return htmlTeamString;
}


/*
  Description:
    return string of all seasons for a given sport/league/team
  Args:
  Returns:
  Raises:
  Notes:
*/
function getSeasons(sport, league, team){
  var parameters = [["sports", sport], ["league", league], ["team", team]];
  var htmlSeasonString = "<option value = \"null\" >--Make a choice--</option>";

  // place conditionals to get allow passing null values when other values are present (pass in all teams)
  if (sport == "null" || league == "null" || team == "null") return htmlSeasonString;

  var json = getRestResource("SeasonListResource", parameters);
  console.log("Seasons found: ".concat(json.seasons.length));

  for (i = 0; i < json.seasons.length; ++i){
    htmlSeasonString = htmlSeasonString.concat("<option value = \"" + json.seasons[i] + "\">" + json.seasons[i] + "</option>")
  }

  document.getElementById("season").innerHTML = htmlSeasonString;

  return htmlSeasonString;
}


/*
  Description:
    return string of all seasons for a given sport/league/team
  Args:
  Returns:
  Raises:
  Notes:
*/
// return string of all games for a given sport/league/team/season
function getGames(sport, league, team, season){
  var parameters = [["sports", sport], ["league", league], ["team", team], ["season", season]];
  var htmlMatchString = "<option value = \"null\" >--Make a choice--</option>";

  // place conditionals to get allow passing null values when other values are present (pass in all teams)
  if (sport == "null" || league == "null" || team == "null" || season == "null") return htmlMatchString;

  var json = getRestResource("MatchListResource", parameters);
  console.log("Matches found: ".concat(json.match.length));

  for (i = 0; i < json.match.length; ++i){
    htmlMatchString = htmlMatchString.concat("<option value = \"" + json.match[i] + " \">" + json.match[i] + "</option>")
  }

  // Sets the dropdown to the list of values
  document.getElementById("game").innerHTML = htmlMatchString;

  return htmlMatchString;
}


/*
  Description:
    return string of all seasons for a given sport/league/team
  Args:
  Returns:
  Raises:
  Notes:
*/
// Attributes are currently hard coded in, should be fine for now
function getFactAttribute(sport) {
	var htmlFactAttribute = "<option value = \"null\" >--Make a choice--</option>";
  if (sport == "null") return htmlFactAttribute;

	if (sport == "Basketball") {
    htmlFactAttribute += "<option value='Points'>Points</option>"
                        + "<option value='Assists'>Assists</option>"
                        + "<option value='Rebounds'>Rebounds</option>"
                        + "<option value='Steals'>Steals</option>"
                        + "<option value='Blocks'>Blocks</option>";
	}

	else if (sport == "Soccer"){
    htmlFactAttribute += "<option value='Goals'>Goals</option>"
                        + "<option value='2'>Assists</option>"
                        + "<option value='3'>Possession Time</option>"
                        + "<option value='4'>Fouls</option>"
                        + "<option value='5'>Yellow Cards</option>"
                        + "<option value='6'>Red Cards</option>";
  }
  
	return htmlFactAttribute;
}


/*
  Description:
    return string of all seasons for a given sport/league/team
  Args:
  Returns:
  Raises:
  Notes:
*/
function getDimensions(sport) {
	var htmlDimensions = "<option value = \"null\" >--Make a choice--</option>";
  if (sport == "null") return htmlDimensions;

	if (sport == "Basketball") {
    htmlDimensions += "<option value='PG'>Point Guard</option>"
                    + "<option value='SG'>Shooting Guard</option>"
                    + "<option value='SF'>Small Forward</option>"
                    + "<option value='PF'>Power Forward</option>"
                    + "<option value='C'>Center</option>";
	}

	else if (sport == "Soccer"){
    htmlDimensions += "<option value='GK'>Goalkeeper</option>"
                    + "<option value='FB'>Fullback</option>"
                    + "<option value='CB'>Center Back</option>"
                    + "<option value='MF'>Midfielder</option>"
                    + "<option value='ST'>Striker</option>";
  }
  
	return htmlDimensions;
}


/*
  Description:
    Returns a string in html to populate the chart dropdown based on the aggregration function selected
  Args:
  Returns:
  Raises:
  Notes:
*/
function getCharts(aggregationStyle){

  // Default value for the string
  var htmlChartString = "<option value = \"null\" >--Make a choice--</option>";

  /*
  // Dictionary of potential charts
  var charts = [['bar', 'Bar Chart'], ['line','Line Chart'], ['horizontalBar', 'Horizontal Bar Chart'],
                ['pie', 'Pie Chart'], ['doughnut', 'Doughnut Chart'], ['radar','Radar Chart'],
                ['polarArea', 'Polar Area Chart']];
  */


  if (aggregationStyle == "Cube"){
    var charts = [['bubble','Bubble Chart'], ['scatter','Scatter Plot']];
  	console.log("Number of charts: ".concat(charts.length));
 
  	for (i = 0; i < charts.length; ++i){
    	htmlChartString = htmlChartString.concat("<option value = \"" + charts[i][0] + "\" >" + charts[i][1] + "</option>");
  	}
  
  } else if (aggregationStyle=="Rollup"){
    var charts = [['line','Line']];
  	console.log("Number of charts: ".concat(charts.length));
 
  	for (i = 0; i < charts.length; ++i){
    	htmlChartString = htmlChartString.concat("<option value = \"" + charts[i][0] + "\" >" + charts[i][1] + "</option>");
  	}

  } else {
	  var charts = [['bar', 'Bar Chart'], ['line','Line Chart'], ['radar','Radar Chart']];
  	console.log("Number of charts: ".concat(charts.length));
 
  	for (i = 0; i < charts.length; ++i){
    	htmlChartString = htmlChartString.concat("<option value = \"" + charts[i][0] + "\" >" + charts[i][1] + "</option>");
  	}
  }

  document.getElementById("chartType").innerHTML = htmlChartString;

  return htmlChartString;
}



/*
  Description:
    return string of possible players 
  Args:
  Returns:
  Raises:
  Notes:
*/
function getPlayerList(sport, league, team, game){
  var htmlPlayerString = "<option value = \"null\" >--Make a choice--</option>";

  // place conditionals to get allow passing null values when other values are present (pass in all teams)
  if (sport == "null" || league == "null" || team == "null" || season == "null" || game == "null") return htmlPlayerString;
  
  // var parameters = [["sports", sport], ["league", league], ["team", team], ["season", season], ["match", game]];
  // var token = getRestResource("TokenResource", parameters);
  var token = getToken(sport, league, team, season, game);
  var json = getRestResource("PlayerListResource", [["token", token["token"]], ]);
   
  console.log("Players found: ".concat(json.homePlayers.length + json.guestPlayers.length));
   
  for (i = 0; i < json.homePlayers.length; ++i){
    htmlPlayerString = htmlPlayerString.concat("<option value = \"" + json.homePlayersID[i] + "\">" + json.homePlayers[i] + "</option>");
  }
  
  // json.guestPlayersID[i + json.homePlayers.length]
  for (i = 0; i < json.guestPlayers.length; ++i){
    htmlPlayerString = htmlPlayerString.concat("<option value = \"" + json.guestPlayersID[i] + "\">" + json.guestPlayers[i] + "</option>");
  }

  console.log(json);

  document.getElementById("players").innerHTML = htmlPlayerString;

  return htmlPlayerString;
}


/*
  Description:
    Return rollup or cube resource
  Args:
  Returns:
  Raises:
  Notes:
*/
function getGroupBy(chartType){
  var aggieFunc = [["aggregation", document.getElementById("aggregationFunction").value], ];
  var json;

  switch(document.getElementById("aggregationStyle").value){
      case "Rollup": json = getRestResource("RollupResource", aggieFunc);
          break;

      case "Cube": json = getRestResource("CubeResource", aggieFunc);
          break;

      default: console.log("No aggie function chosen")
          return;
  }
  showChart(json, chartType);
}


/*
  Description:
  return string of possible stats for a given sport
  Args:
  Returns:
  Raises:
  Notes:
*/
function getStats(sport, league, team, game){
  var htmlStatString = "<option value = \"null\" >--Make a choice--</option>";

  // place conditionals to get allow passing null values when other values are present (pass in all teams)
  if (sport == "null" || league == "null" || team == "null" || season == "null") return htmlStatString;

  console.log("Sport: " + sport + ", League: " + league + ", Team: " + team + "Game: " + game);

  if (sport == "Soccer"){
    htmlTokenString = getSoccerStats(htmlTokenString);

  } else if (sport == "Basketball"){
    htmlTokenString = getBasketballStats(htmlTokenString);
  }

  return htmlStatString;
}


/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function getSoccerStats(htmlTokenString){
  htmlTokenString = htmlTokenString.concat("<option value = \"teamsInMatch\">Home and Away Teams</option>");
  htmlTokenString = htmlTokenString.concat("<option value = \"ballPossession\">Ball Possession</option>");
  htmlTokenString = htmlTokenString.concat("<option value = \"yellowCards\">Yellow Cards</option>");
  htmlTokenString = htmlTokenString.concat("<option value = \"cornerStats\">Corner Stats</option>");
  htmlTokenString = htmlTokenString.concat("<option value = \"redCards\">Red Cards</option>");
  htmlTokenString = htmlTokenString.concat("<option value = \"foulStats\">Foul Stats</option>");
  return htmlTokenString;
}


/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/ 
function getBasketballStats(htmlTokenString){
  return htmlTokenString;
}

