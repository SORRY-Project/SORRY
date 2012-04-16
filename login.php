<?php
include("/usr/local/uvm-inc/pjglenno.inc");
include("connect.php");

$isSubmitted = false;
$userName = "";
$passWord = "";

if (isset($_POST["cmdLogIn"])){
	  $userName = $_POST["txtUserName"];
    $passWord = $_POST["txtPassWord"];
		
		$userName = htmlentities($userName, ENT_QUOTES);
    $passWord = htmlentities($passWord, ENT_QUOTES);
		
		$sql = "SELECT fldPassWord FROM tblUser WHERE pkUserName='".$userName."'";
		$enterData = mysql_query($sql,$connectID) or die("<p>record was not inserted</p>\n MySQL error: " . mysql_errno() . " : " . mysql_error());
		$arrayData = mysql_fetch_assoc($enterData);
		
		if ($passWord == $arrayData['fldPassWord']){
			 $_SESSION['loggedIn'] = true;
			 $_SESSION['userName'] = $userName;
		}else echo "Username/Password incorrect, please try again.";
}

if (isset($_POST["cmdLogOut"])){
	 $_SESSION['loggedIn'] = false;
	 $_SESSION['userName'] = "";
	 $userName = "";
	 $passWord = "";
}

if ($_SESSION['loggedIn'] == false){
  echo "<div id='login'>";
  echo "<form method='post'>";
  echo "<table border='0' align='left'>";
  echo "<tr><td align='right' width='100px'><label for='txtUserName'>Username: </label></td>";
  echo "<td align='left'><input name='txtUserName' align='justify' type='text' size='10' id='txtUserName' maxlength='15' value='".$userName."'/></td>";
  echo "</tr><tr><td align='right' width='100px'><label for='txtPassWord'>Password: </label></td>";
  echo "<td align='left'><input name='txtPassWord' align='justify' type='password' size='10' id='txtPassWord' maxlength='16' value='".$passWord."'/></td>";
  echo "<td><input align='right' type='Submit' name='cmdLogIn' value='Log In'/></td></tr></table></form>";
  echo "</div>";
}

if($_SESSION['loggedIn'] == true){
  echo "<div id='login'>";
  echo "<table border='0' align='left'><tr>";
  echo "<td align='right' width='90px'><label for='txtUserName'>Username: </label></td>";
  echo "<td align='left'><a href='user.php?userName=".$_SESSION['userName']."'>".$_SESSION['userName']."</a></td>";
  echo "<td><form method='post'><input name='cmdLogOut' type='Submit' value='Log Out'/></form></td>";
  echo "</tr></table></div>";
}
?>
