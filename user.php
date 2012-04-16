<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
   <title>Sorry! Statistics</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="Patrick Glennon" />
<meta name="description" content="User Stats" />

<link href="SORRY-Project-SORRY-9a3d1f2/css/style.css" rel="stylesheet" type="text/css" media="screen" /> 
<?
include("/usr/local/uvm-inc/pjglenno.inc");
include("connect.php");

$enterData = mysql_query("SELECT * FROM tblStats",$connectID);
for ($i = 0; $i < mysql_num_rows($enterData); $i++){
		$arrayData = mysql_fetch_assoc($enterData);
		$name[$i] = $arrayData["fldUsername"];
}


?>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript">
$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'bar'
            },
            title: {
                text: 'Statistics for All Users'
            },
            subtitle: {
                text: 'Player Moves'
            },
            xAxis: {
                categories: [<?php print "'$name[0]','$name[1]','$name[2]','$name[3]','$name[4]','$name[5]'";?>],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Player Moves',
                    align: 'high'
                }
            },
            tooltip: {
                formatter: function() {
                    return ''+
                        this.series.name +': '+ this.y +' moves';
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -100,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Moves',
                data: [30, 34, 50, 38, 90, 344]
            }]
        });
    });
    
});
		</script>
	</head>
	<body>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
</head>

<body>

</body>
</html>
