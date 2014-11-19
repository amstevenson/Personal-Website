<?php
$title= "AStevenson - My Projects";
$pageCat = "projects";

?>

<?php require_once('includes/header.php'); ?> 

		<!-- right panel -->
		<h1 align = "center"> Projects </h1>
		<h2 align = "center" id = "test"> The projects I have worked on, or have been included in are listed below - each project has a summary and can be clicked on for more information.</h2>

		<!-- create the panel to store projects, then populate... -->
		<?php 	
		include 'classes/config.inc.php';  
		include 'classes/projects/proj_tutorials.php';
		$projects   = new Projects($db);

		// get each tutorial
		$result = array();
		$result = $projects->get_tutorials();

		//ob_start(); //Start output buffer
		//echo count($result);
		//$numberOfResults = ob_get_contents(); 
		//ob_end_clean(); //Discard output buffer
		?>

		<!-- create the search functionality -->
		<div class = "projPanelSearch">  

			<!-- Initial list of options -->
			<label for = "searchOptions" class = "projOptionLabel"> Search By:</label>
			<select name="searchOptions" id ="searchOptions" class = "projOption">
				<option value="Project Name">Project Name</option>
				<option value="Project Type">Project Type</option>
				<option value="Date of Publication">Date of Publication</option>
			</select>

			<!-- First index display result, search box for searching by name -->
			<div id="searchOptionOne" style="display: none;">
				<form id="searchOptionByNameForm" name="searchOptionByNameForm" style="display: inline;">
					<input class = "projFirstOption" type = "text" name ="searchOptionByName" id="searchOptionByName" value="Enter Name">
					<input class = "projFirstOptionSubmit" type="submit" value="Submit">
				</form>
			</div>

			<!-- Second index display result...populated by the types of projects -->
			 <div id="searchOptionTwo" style="display: none;">
				<select name="searchOptionByType" id ="searchOptionByType" class = "projSecondOption">
					<?php 
					$i = 0;
					foreach ($result as $results){
						echo '<option value="',$result[$i]["proj_type"].'">',$result[$i]["proj_type"].'</option>'; 
						$i++;
					}
					?>
				</select>	
			</div>

			<!-- Third index display result...populated by the date of publication -->
			<div id="searchOptionThree" style="display: none;">
				<select name="searchOptionByPublication" id ="searchOptionByPublication" class = "projSecondOption">
					<option value="2013">2013</option>
					<option value="2012">2012</option>
				</select>	
			</div>


		</div>

		<!-- retrieve projects from database and populate the project panel -->
		<div class = "projPanel" id = "projPanel">

			<?php
			$i = 0;
			foreach($result as $results){
				echo '<div class = "projPanelInner">',
				// Set the following:
				// Image:
				'<a href = ',$result[$i]["proj_link"].'><img class= "projPanelImage" src = "images/projects/',$result[$i]["proj_icon"]. '"></a></img>',
				// Textual:
				'<p class = projTextName><a class = "galleryLink" href = ',$result[$i]["proj_link"].'>' ,$result[$i]["proj_name"]. '<br> </a></p>
				<p class = "projTextDescription"> Time period: ',$result[$i]["proj_timeperiod"].'<br><br>' ,$result[$i]["proj_description"]. '<br><br>Project Type: ',$result[$i]["proj_type"]. '</p> </div>';
				$i++;
			}
			?>
		</div>
			
		<script type="text/javascript" src="js/projectsFunctions.js"></script>
		<script type="text/javascript">

			var obj = JSON.parse('<?php echo json_encode($result,JSON_HEX_TAG|JSON_HEX_APOS); ?>');

			PROJECTLIBRARY.init([obj, 1, "controlId"]);
			PROJECTLIBRARY.projectSetup();
		</script>

		<!--<div class = "copyrightLabel">

			<p class = "copyright">adwd</p>
		</div>-->
	<!-- end of right panel -->
	</div>
<!-- end of panel -->
</div>

<?php require_once('includes/footer.php'); ?> 