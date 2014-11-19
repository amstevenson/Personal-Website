<?php
$title= "AStevenson - Contact Me";
$pageCat = "contact";

?>

<?php require_once('includes/header.php'); ?> 

	<!-- insert information for right panel here -->
	<h1 align = "center"> Contact Me </h1>
	<h2 align = "center"> Placing an order, or have a general enquiry?</h2>

	<!-- My rates -->
	<div class = "contactRates">
		<p align = "center" class = "p7"><b>My rates</b></p>
		<div class = "contactRatesInner"><p class = "p8"> <b>Web Development</b><br><br>Design: 40 pounds <br><br>Per Page: 50 pounds.<br><br> Skill rating: 70/100. </p></div>
		<div class = "contactRatesInner"><p class = "p8"> <b>Desktop: C + Java</b><br><br>Rate: 15 pounds per hour or a fixed specified amount.<br><br> Skill rating: 80/100. </p></div>
		<div class = "contactRatesInner"><p class = "p8"> <b> Android <br></b> <br> Rate: 25 pounds per hour, or a fixed specified amount. <br><br> Skill rating: 95/100.</p></div>
	</div>

	<!-- Guarantee --> 
	<div class = "contactAdditionalInfo">
		<p class = "p7" align = "center"><b>Why you should choose me </b><br><br>
		<p class = "p7"> Hiring me as a developer, gives you an opportunity that most people do not have, the ability to work with an individual who will go the extra mile to ensure that you have an excellent product, that meets every requirement. <br><br> If you leave me a message expressing genuine interest in getting me involved with a project, or hiring me, we will arrange a time to talk either on Skype, Facebook, or in person to discuss everything.<br><br> So, book an appointment with me today! I can make your vision a reality! Whether it is a website you need making, or a desktop or mobile application, I can make it! <br><br>
		All you need to do is contact me, either on Skype (Adam.st18), Facebook, Twitter, or by sending me a message using the feature on the left.
	</div>

	<!-- Message me -->
	<div class = "contactMessageMe">
		<form id = "contactMessage">
			<input class = "contactMessageTextView1" type = "text" id="contactMessageName" name="contactMessageName" value = "Name..."><br>
			<input class = "contactMessageTextView1" type = "text" id="contactMessageEmail" name="contactMessageEmail" value = "Email Address..."><br>
			<textarea class = "contactMessageTextView2" type = "text" id="contactMessageContent" name="contactMessageContent"></textarea><br>
			<span><textarea class = "contactDisplayCount" type = "text" id = "contactMessageCount" name = "contactMessageCount"></textarea>
			<input class = "contactMessageSubmit" onclick="insertMessage();" type = "button" id = "contactMessageSubmit" name = "contactMessageSubmit" value = "Message Me"></span>
		</form>
	</div>

	<script type="text/javascript" src="js/contactFunctions.js"></script>

	<!-- end of right panel (above should be content specific for each page) -->
	</div>
<!-- end of panel -->
</div>

<?php require_once('includes/footer.php'); ?> 