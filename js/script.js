const BULK_SPINS = 10000000
const BET = 1

var reels = [
	[1, 2, 2],
	[1, 3, 3],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];


var win_lines = [
	[0, 0, 0],
	[1, 1, 1],
	[2, 2, 2],
	[0, 1, 2],
	[2, 1, 0],
];

var paytable = [
	2, 3, 4, 8, 10,
];


var current_balance = 10000.0;
var total_hits = 0.0;
var total_wins = 0.0;
var total_wins_sqr = 0.0;
var spins = 0.0;
var total_bets = 0.0;

var current_hit = -1.0;
var current_win = -1.0;

var grid = [
	[-1, -1, -1],
	[-1, -1, -1],
	[-1, -1, -1]
];

var width = grid[0].length
var height = grid.length

function calculate_win(grid_){

	var win = 0;

	for (let p = 0; p < win_lines.length; p++) {
		if ((grid_[win_lines[p][0]][0] == grid_[win_lines[p][1]][1] ) & (grid_[win_lines[p][0]][0] == grid_[win_lines[p][2]][2] )) {
			win += paytable[grid_[win_lines[p][0]][0] - 1];
		}
	}

	return win;
}



function Reset(){
	current_balance = 10000.0;
	total_hits = 0.0;
	total_wins = 0.0;
	total_wins_sqr = 0.0;
	spins = 0.0;
	total_bets = 0.0;
	
	current_hit = -1.0;
	current_win = -1.0;
	
	grid = [
		["-", "-", "-"],
		["-", "-", "-"],
		["-", "-", "-"]
	];

	var grid_display = "" ;
		
	for (let l = 0; l < height; l++) {
		grid_display += "<tr>";
		for (let r = 0; r < width; r++) {
			grid_display += "<td>" + grid[l][r] + "</td>";
		}
		grid_display += "</tr>";
	}


	document.getElementById("result").innerHTML = grid_display;

	var balance_display = "" ;
	balance_display += "<tr><td><b>Spin win:</b> " + "-" + "</td>" ;
	balance_display += "<td><b>Current balance:</b> "+ current_balance +"</td>" ;
	balance_display += "<td><b>Current spin:</b> "+ 0 +"</td>" ;
	balance_display += "</tr>"; 

	document.getElementById("balance").innerHTML = balance_display;

	var stat_display = "" ;
	stat_display += "<tr><td><b>Hit Rate:</b> " + "-" + "</td>" ;
	stat_display += "<td><b>RTP:</b> "+ "-" +"</td>" ;
	stat_display += "<td><b>STD:</b> "+ "-" +"</td>" ;
	stat_display += "</tr>"; 

	document.getElementById("stat").innerHTML = stat_display;	

}


function OneSpin(){
	var stops = [-1, -1, -1];	

	for (let r = 0; r < width; r++) {
		stops[r] = Math.floor(Math.random() * reels[r].length)
		for (let l = 0; l < height; l++) {
			grid[l][r] = reels[r][( stops[r] + l ) % reels[r].length];
		}
	}

	current_win = calculate_win(grid);


	if (current_win > 0) {
		current_hit = 1;
	} else {
		current_hit = 0;
	}

	current_balance -= BET;
	total_bets += BET;
	current_balance += current_win;
	total_hits += current_hit;
	total_wins += current_win;
	spins += 1;
	total_wins_sqr += current_win * current_win;

	return 0;
}



function SpinRun(){

	OneSpin();

	var grid_display = "" ;
		
	for (let l = 0; l < height; l++) {
		grid_display += "<tr>";
		for (let r = 0; r < width; r++) {
			grid_display += "<td>" + grid[l][r] + "</td>";
		}
		grid_display += "</tr>";
	}


	document.getElementById("result").innerHTML = grid_display;

	var balance_display = "" ;
	balance_display += "<tr><td><b>Spin win:</b> " + current_win + "</td>" ;
	balance_display += "<td><b>Current balance:</b> "+ current_balance +"</td>" ;
	balance_display += "<td><b>Current spin:</b> "+ spins +"</td>" ;
	balance_display += "</tr>"; 

	document.getElementById("balance").innerHTML = balance_display;

	var stat_display = "" ;
	stat_display += "<tr><td><b>Hit Rate:</b> " + total_hits/spins + "</td>" ;
	stat_display += "<td><b>RTP:</b> "+ total_wins/total_bets +"</td>" ;
	stat_display += "<td><b>STD:</b> "+ Math.sqrt(total_wins_sqr/spins - (total_wins * total_wins) / spins / spins)  +"</td>" ;
	stat_display += "</tr>"; 

	document.getElementById("stat").innerHTML = stat_display;	
}

function SpinRunBulk(){
	for (let l = 0; l < BULK_SPINS - 1; l++) {
		OneSpin();	
	} 
	SpinRun();
}
