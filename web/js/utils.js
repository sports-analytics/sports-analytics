/* *****************************************************************
Description:

Methods:

Dependencies:

******************************************************************* */


/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function getAxisNumbers(ctx) {
	var display;
	if (ctx.canvas.id == "thirdChart") {
		display = false;
	}
	else {
		display = true;
	}
	return display;
}



/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function getTitle(ctx, league, agFunc, agData){
	var title;
	if (ctx.canvas.id == "mainChart") {
		title = agFunc + ' ' + agData + ' By Each Team In ' + league + ' By Season';
	}
	else if (ctx.canvas.id == "secondChart"){
		title = agFunc + ' ' + agData + ' In ' + league + ' By Season';
	}
	else if (ctx.canvas.id == "thirdChart"){
		title = agFunc + ' ' + agData + ' By Each Team In ' + league + 'Over All Seasons';
	}
	else {
		title = null;
	}
	return title;
}

/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function backToStats(){
  document.getElementById("Charts").style.display = "block";
  document.getElementById('Player').style.display="none";
  document.getElementById("Dropdown").style.display = "none";
}


/*
  Description:
    Button to return back to previous dropdown page
  Args:
  Returns:
  Raises:
  Notes:
*/
function backToDropdown(){
  document.getElementById("Charts").style.display = "none";
  document.getElementById('Player').style.display="none";
  document.getElementById("Dropdown").style.display = "block";
  while(globalCharts.length > 0){
      globalCharts[globalCharts.length-1].destroy();
      globalCharts.pop();
  }
}



/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function loadResource()
{
    var xhttp = new XMLHttpRequest();
    var parameter = document.getElementById("parameter").value;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "/rest/DemoRestResource?caller=".concat(parameter), true);
    xhttp.send();
}



/*
Description:
  This function generates a dynamic table 
Args:
  playerData: this is an array, where each element contains another array 
              that has all the player info for a single player.
Returns:
Raises:
Notes:
*/
function createPlayerTable(data){
  console.log("Inside table");
  console.log(data);

  // Create an HTML table element
  var table = document.createElement("TABLE");
  table.border = "1";

  var columnCount = data[0].length;
  console.log('Column count: ' + columnCount);

  // Create a HTML Table element.
  var table = document.createElement("TABLE");
  table.border = "1";

  // Add the header row
  var row = table.insertRow(-1);
  for (var i = 0; i < columnCount; ++i) {
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = data[0][i];
      row.appendChild(headerCell);
  }

  // Add the data rows
  for (var i = 1; i < data.length; ++i) {
      row = table.insertRow(-1);
      for (var j = 0; j < columnCount; ++j) {
          var cell = row.insertCell(-1);
          cell.innerHTML = data[i][j];
      }
  }

  var dvTable = document.getElementById("table");
  dvTable.innerHTML = "";
  dvTable.appendChild(table);
}



/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function w3_open() {
    document.getElementById("main").style.marginLeft = "20%";
    document.getElementById("mySidebar").style.width = "20%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}



/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}



/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function teamReset() {
  var defaultString = "<option value = \"null\" >--Make a choice--</option>";
  var sportString = defaultString + "<option value = \"Soccer\" >Soccer</option>" + "<option value = \"Basketball\" >Basketball</option>";
  
  $("#sport").html(sportString);
  $("#league").html(defaultString);
  $("#team").html(defaultString);
  $("#season").html(defaultString);
  $("#game").html(defaultString);
  $("#chartType").html(defaultString); 
  $("#factAttribute").html(defaultString);
  $("#dimensions").html(defaultString);
  $("#aggregationFunction").html(defaultString);
  $("#aggregationStyle").html(defaultString);
  $("#aggData").html(defaultString);
  $("#players").html(defaultString);

  
  //window.chart.destroy();
  document.getElementById("errorMessage").innerHTML = "";
  
  // Destroy all three charts
  try {
    window.chart1.destroy();
    window.chart2.destroy();
    window.chart3.destroy();

  } catch (TypeError){
    console.log('No charts to destroy or rollup called.');
  }
}


/*
  Description:
  Args:
  Returns:
  Raises:
  Notes:
*/
function playerReset() {

  var defaultString = "<option value = \"null\" >--Make a choice--</option>";

  var sportString = defaultString + "<option value = \"Soccer\" >Soccer</option>" + "<option value = \"Basketball\" >Basketball</option>";

  // Set all dropdowns back to 
  $("#sport").html(sportString);
  $("#league").html(defaultString);
  $("#team").html(defaultString);
  $("#season").html(defaultString);
  $("#game").html(defaultString);
  $("#chartType").html(defaultString); 
  $("#factAttribute").html(defaultString);
  $("#dimensions").html(defaultString);
  $("#aggregationFunction").html(defaultString);
  $("#aggregationStyle").html(defaultString);
  $("#aggData").html(defaultString);
  $("#players").html(defaultString);


  //window.chart.destroy();

  // Reset error message
  document.getElementById("errorMessage").innerHTML = "";

  // Destroy chart
  window.chart1.destroy();

  // Reset table
  document.getElementById("table").innerHTML = "";
  
}
        


/*
function generateChart(chartType, homeTeamName, awayTeamName, homeTeamDataParam, awayTeamDataParam, label){
 
  var chartOptions = {
    title: {
      display: true,
      text: 'Chart Title'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Y-Axis"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "X-Axis"
        }
      }]
    }
  }
 

  var canvas = document.getElementById("myChart");

  var showLabel = true;
  if (homeTeamName == undefined && awayTeamName == undefined) {
      showLabel = false;
  }

  // Needed for something ... 
  if (window.bar != undefined) {
          window.bar.destroy();
  }

  // Home color is currently hardcoded in
  var homeTeamData = {
          label: homeTeamName,
          data: [homeTeamDataParam, "0"],
          backgroundColor: 'rgba(148, 28, 47, 0.6)',
          borderWidth: 0,
          yAxisID: homeTeamName // "y-axis"
  };

  // Away color is currently hardcoded in
  var awayTeamData = {
          label: awayTeamName,
          data: [awayTeamDataParam, "0"],
          backgroundColor: 'rgba(32, 164, 243, 0.6)',
          borderWidth: 0,
          yAxisID: awayTeamName // "x-axis"
  };

  var gameData = {
          labels: [label],
          datasets: [homeTeamData, awayTeamData]
  };

  var chartOptions = {
          scales: {
                  xAxes: [{
                          barPercentage: 1,
                          categoryPercentage: 0.6
                  }],
                  yAxes: [{
                          id: "y-axis",
                          ticks: {
                    beginAtZero: true,
                    callback: function (value) { if (Number.isInteger(value)) { return value; } }
                }
                  }]
          },
          legend: {
              display: showLabel
          }
  };
  
  var config = {
    type: chartType = chartType,
    data: gameData,
    options: chartOptions
  };

  console.log(chartType);
  window.bar = new Chart(canvas, config);
}






/*
  Description 
    Old plot function that only worked with soccer data and returned a set amount of stats
  Args:
    None
  Returns:
  Raises:
  Notes:
      - [["token", token["token"]], ]) is an array of dict values
      - [ballPossession["possession"][0], yellowCards["yellowCards"][0], 
                        cornerStats["corners"][0], foulStats["fouls"][0]];
      - [ballPossession["possession"][1], yellowCards["yellowCards"][1], 
                        cornerStats["corners"][1], foulStats["fouls"][1]];
//

function oldPlot() {
  var sport = document.getElementById("sport").value;
  var league = document.getElementById("league").value;
  var team =  document.getElementById("team").value;
  var season =  document.getElementById("season").value;
  var match =  document.getElementById("game").value;
  var factatt = document.getElementById("factAttribute").value;
  var aggregfunc = document.getElementById("aggregationFunction").value;
  var aggregstyle = document.getElementById("aggregationStyle").value;
  var dimension  = document.getElementById("dimensions").value;

  var parameters = [["sports", sport], ["league", league], ["team", team], ["season", season], ["match", match], ["factatt", factatt], ["aggregfunc", aggregfunc], ["aggregstyle", aggregstyle], ["dimension", dimension]];
  console.log(parameters);

  var token = getRestResource("TokenResource", parameters);
  // console.log("Token: " + token["token"]);


  var teams = getRestResource("HomeAndAwayTeamListResource", [["token", token["token"]],]);
  console.log("Teams: " + teams["homeAndAwayTeam"]);


  var homeTeamData = [];
  var awayTeamData = [];
  var availableStats = [];

  var score = getRestResource("ScoreRestResource", [["token", token["token"]], ]);
  if (score != null) {
      console.log("Score: " + score["score"][0] + ":" + score["score"][1] );
      homeTeamData.push(score["score"][0]);
      awayTeamData.push(score["score"][1]);
      availableStats.push("Score");
  }

  var ballPossession = getRestResource("BallPossessionStatResource", [["token", token["token"]], ]);
  if (ballPossession != null) {
      console.log("Ball Possession: " + ballPossession["possession"]);
      homeTeamData.push(ballPossession["possession"][0]);
      awayTeamData.push(ballPossession["possession"][1]);
      availableStats.push("Ball Possession");
  }

  var yellowCards = getRestResource("YellowCardsStatResource", [["token", token["token"]], ]);
  if (yellowCards != null) {
      console.log("Yellow Cards: " + yellowCards["yellowCards"]);
      homeTeamData.push(yellowCards["yellowCards"][0]);
      awayTeamData.push(yellowCards["yellowCards"][1]);
      availableStats.push("Yellow Cards");
  }

  var redCards = getRestResource("RedCardsStatResource", [["token", token["token"]], ]);
  if (redCards != null) {
      console.log("Red Cards: " + redCards["redCards"]);
      homeTeamData.push(redCards["redCards"][0]);
      awayTeamData.push(redCards["redCards"][1]);
      availableStats.push("Red Cards");
  }

  var cornerStats = getRestResource("CornerStatRestResource", [["token", token["token"]],]);
  if(cornerStats != null){
      console.log("Corner Stats: " + cornerStats["corners"]);
      homeTeamData.push(cornerStats["corners"][0]);
      awayTeamData.push(cornerStats["corners"][1]);
      availableStats.push("Corners");
  }

  var foulStats = getRestResource("FoulsStatResource", [["token", token["token"]],]);
  if(foulStats != null){
      console.log("Foul Stats: " + foulStats["fouls"]);
      homeTeamData.push(foulStats["fouls"][0]);
      awayTeamData.push(foulStats["fouls"][1]);
      availableStats.push("Fouls");
  }

//// 
  var attendance = getRestResource("AttendanceRestResource", [["token", token["token"]],]);
  if(attendance != null) {
      console.log("Attendance: " + attendance["attendance"]);
      document.getElementById("attendance").innerHTML="Attendance: " + attendance["attendance"];
  }
//// 

  console.log(homeTeamData[1]);
  console.log(homeTeamData);
  console.log(awayTeamData);
  var homeTeamName = teams["homeAndAwayTeam"][0];
  var awayTeamName = teams["homeAndAwayTeam"][1];

  console.log(homeTeamName);
  console.log(typeof(homeTeamName));

  var chartType = document.getElementById("chartType").value;
  
  generateChart(chartType, homeTeamName, awayTeamName, homeTeamData, awayTeamData, availableStats);
}

*/