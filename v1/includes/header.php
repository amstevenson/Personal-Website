<!DOCTYPE html>
<!-- HEADER START -->
<header>
	<head>
		<meta></meta>
		<title><?php echo $title; ?></title>
		<link rel="stylesheet" type="text/css" href="style/main.css" />
		<script src="js/jquery.js"></script>
	</head>
</header>

<body>
<!-- main panel -->
<div class = "contentPanel" id = "contentPanel">

	<?php
	if($pageCat != 'projects') /* functions specific to each $pageCat */
		if($pageCat != 'contact')
			echo '<script "text/javascript" src="js/',$pageCat. 'Functions.js"> </script>'; 
	?>

	<!-- left panel start -->
	<div class = "contentPanelLeft" align="center" > 
		<h1>Adam Stevenson</h1>
		<h2>Android, Website and Desktop developer</h2>
		<!-- main image -->
		<img src = "images/tresNoName.jpg" class = "panelLeftPicture" alt = "profile picture">
		<!-- navigation links -->
		<ul class = "panelLeftNavigation">
			
			<div class = "navSpacingTop"></div>
			<a class="<?php if($pageCat=='index'){ echo 'active'; } else { echo 'link'; } ?>" href="index.php">Home</a><br>
			<div class = "navSpacingBottom"></div>
			
			<div class = "navSpacingTop"></div>
			<a class="<?php if($pageCat=='aboutme'){ echo 'active'; } else { echo 'link'; } ?> "href="aboutme.php">About Me</a><br>
			<div class = "navSpacingBottom"></div>

			<div class = "navSpacingTop"></div>
			<a class="<?php if($pageCat=='projects'){ echo 'active'; } else { echo 'link'; } ?> "href="projects.php">Projects</a><br>
			<div class = "navSpacingBottom"></div>
			
			<div class = "navSpacingTop"></div>
			<a class="<?php if($pageCat=='tutorials'){ echo 'active'; } else { echo 'link'; } ?>" href="tutorials.php">Tutorials</a><br>
			<div class = "navSpacingBottom"></div>
			
			<div class = "navSpacingTop"></div>
			<a class="<?php if($pageCat=='contact'){ echo 'active'; } else { echo 'link'; } ?> "href="contact.php">Contact Me</a><br>
			<div class = "navSpacingBottom"></div>
			<div class = "navSpacingTop"></div>

		</ul>

		<!-- social media links -->
		<div class = "panelLeftSocialMedia">
			<a href = "https://www.mail.me"><img src = "images/icons/emailblue.png"    name = "emailIcon"    class = "panelLeftSocialMediaIcon" alt = "email me icon"></a>

			<a href = "https://www.github.com/amstevenson"><img src = "images/icons/githubblue.png"   name = "githubIcon"   class = "panelLeftSocialMediaIcon" alt = "github icon"></a>
			
			<a href = "https://www.facebook.com/forlornsc.gaming"><img src = "images/icons/facebook.png" name = "facebookIcon" class = "panelLeftSocialMediaIcon" alt = "facebook icon"> </a>

			<a href = "https://www.twitter.com/forlornsc"><img src = "images/icons/twitterblue.png"  name = "twitterIcon"  class = "panelLeftSocialMediaIcon" alt = "twitter icon"></a>
			
		</div>

	<!-- end left panel -->
	</div>
	<div class = "contentPanelRight" id = "contentPanelRight">
	<!-- HEADER END -->