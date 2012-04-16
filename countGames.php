<?php 
$k = 0;
$enterData = mysql_query("SELECT * FROM tblUser",$connectID);
for ($i = 0; $i < mysql_num_rows($enterData); $i++){
		$arrayData = mysql_fetch_assoc($enterData);
		$name[$i] = $arrayData["pkUserName"];
		$k++;
}

for ($i = 0; $i < $k; $i++){		
		$enterData = mysql_query("SELECT * FROM tblUserStats WHERE fkUserName='$name[$i]'",$connectID);
		$gamesPlayed = mysql_num_rows($enterData);
		
		$sql = "UPDATE tblUser SET fldGamesPlayed='$gamesPlayed' WHERE pkUserName='$name[$i]'";
		$enter = mysql_query($sql,$connectID) or die("<p>record was not inserted</p>\n MySQL error: " . mysql_errno() . " : " . mysql_error());
}
?>