<?php
$title= "AStevenson - Index";
$pageCat = "index";

?>

<?php require_once('includes/header.php'); ?> 

	<!--script type = "text/javascript" src="js/indexFunctions.js"></script>-->

	<!-- Right panel -->
	<h1 align = "center"> Welcome to my end of the corner </h1>
	<h2 align = "center"> While you are here, why not check out some of the <a href = "projects.php" class = "textLink">projects</a> that I have been working on? </h2>

	<div class="galleryWrap">

		<!-- OBJECT TO CONTAIN 1 GALLERY ITEM -->
		<div class="galleryContain " id="gallery1">

				<div class="galleryOverlay"></div>

				<div class="galleryHover">

					<h1 class="port">PROPERTY RENTAL APP</h1>

					<p class="p3">Searching for properties around the UK has never looked so easy! <br/>Why not have a look at the <a class="galleryLink" href="proj_propertypanthermob.php">end result</a>?</p>

				</div>	

		</div>		<!-- END FIRST ITEM -->


		<!-- OBJECT TO CONTAIN 2 GALLERY ITEM -->
		<div class="galleryContain" id="gallery2">

			<div class="galleryOverlay"></div>

			<div class="galleryHover">

				<h1 class="port">FOOTBALL MANAGER</h1>

				 <p class="p3">Ever needed an application to manage your football matches? Well, why don't you check <a class="galleryLink" href="proj_footballmanager.php">this</a> out?</p>

			</div>	

		</div>		<!-- END Second ITEM -->	

		<!-- OBJECT TO CONTAIN 3 GALLERY ITEM -->
		<div class="galleryContain" id="gallery3">

			<div class="galleryOverlay"></div>

			<div class="galleryHover">

				<h1 class="port">LEAVE RECORDS</h1>

				<p class="p3">Are you an employer? <br/>If you need an application that manages holiday leave for staff, you should have a look at <a class="galleryLink" href="proj_leaverecords.php">this</a>!</p>

			</div>	

		</div>		<!-- END Third ITEM -->		

		<!-- OBJECT TO CONTAIN 4 GALLERY ITEM -->
		<div class="galleryContain" id="gallery4">

			<div class="galleryOverlay"></div>

			<div class="galleryHover">

				<h1 class="port">FORLORNSC STREAMING WEBSITE</h1>

				<p class="p3">For the gamers:<br/>Want to see chatrooms, image galleries, and live streams?<a class="galleryLink" href="0ldforlorn/index.php"> click here</a> to have a look!</p>
			</div>	

		</div>		<!-- END Fourth ITEM -->					
		</div>		<!-- end galleryContain -->

		<h2 class = "indexTutorialTitleLeft">Or you can either...take a look at my <a href = "tutorials.php" class = "textLink">tutorials</a></h1>
		<h2 class = "indexTutorialTitleRight">Or if you like what you see...</h2>
		
		<!-- tutorial panel -->
		<div class = "indexExtraPanel">

			<!-- retrieve each tutorial from database and populate panel... -->
			<div class = "indexExtraLeft" id = "tutorialPanel">
				
				<?php  

					include 'classes/config.inc.php';  
					include 'classes/tutorials/func_tutorials.php';
					$tutorials   = new Tutorials($db);

					// counter
					$i =0;

					// get each tutorial
					$result = array();
					$result = $tutorials->get_tutorials();

					foreach($result as $results){

						echo '<div class = "indexTutorialPanel">',
							'<a href = ',$result[$i]["tutorial_link"].'><img class= "indexTutorialImage" src = "images/icons/',$result[$i]["tutorial_icon"]. '"></a>',
							'<p class = "p4"><a class = "galleryLink" href = ',$result[$i]["tutorial_link"].'>' ,$result[$i]["tutorial_name"]. '<br> </a>' ,$result[$i]["tutorial_description"]. '</p>',
							'</div>';

						$i++;
					}
				?>
			</div>

			<!-- Message form -->
			<div class = "indexExtraRight" id = "messagePanel">
	           	<p class = "p6">Over the span of several years, I have made applications for a number of clients. If there is anything you need making that
	           	 involves websites, mobiles or desktops, then I can make that vision a reality!</p>

	           	<form action = "aboutme.php">
	           		<button type = "submit" value = "submit" class = "indexButton" action = "aboutme.php"> <p class = "indexButtonText">About me</p></button><br>
	           	</form>

	           	<form action = "contact.php">
	           		<button type = "submit" value = "submit" class = "indexButton"> <p class = "indexButtonText">Send me a message </p></button>
	           	</form>

	        </div>
    	</div>

	<!-- end of right panel-->
	</div>
<!-- end of main panel -->
</div>

<?php require_once('includes/footer.php'); ?> 

