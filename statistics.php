<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
   <title>Sorry! Statistics</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="Patrick Glennon" />
<meta name="description" content="Statistics Page" />

<link href="SORRY-Project-SORRY-9a3d1f2/css/style.css" rel="stylesheet" type="text/css" media="screen" /> 
<?
include("/usr/local/uvm-inc/pjglenno.inc");
include("connect.php");
include("countGames.php");

$dropDownName = "All";
?>
</head>

<body>
<center>

<h1>List of all users</h1>

<?
echo "<table border='1'>";
echo "<tr><th>Username</th><th>Date Joined</th><th>Games Played</th></tr>";

$enterData = mysql_query("SELECT * FROM tblUser",$connectID);
for ($i = 0; $i < mysql_num_rows($enterData); $i++){
		$arrayData = mysql_fetch_assoc($enterData);
		$name = $arrayData["pkUserName"];
		$date = $arrayData["fldDateJoined"];
		$gamesPlayed = $arrayData["fldGamesPlayed"];
		echo "<tr><td><a href='/~pjglenno/CS205/Sorry/user.php?$username=$name'>$name</a></td>";
		echo "<td>$date</td>";
		echo "<td>$gamesPlayed</td>";
}

echo "</tr></table>";
?>


<? /*print "value='$userName'"; */?>
</center>
</body>
</html>