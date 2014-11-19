<?php 	
include '../config.inc.php';  
$user   = new Users($db);

$message_username = $_POST['username'];
$message_email = $_POST['userEmail'];
$message_content = $_POST['userMessage'];

$user->post_message($message_username, $message_email, $message_content);
echo "Message successfully sent! Your name, email address and message have been sent to my hotmail account. I will respond as quickly as possible.";

$mailToMessage = 'Message from: '.$message_username.'<br>Message Email: '.$message_email.'<br>Message Content: '.$message_content;

mail("addstevenson@hotmail.com",$message_username,$mailToMessage,"From: $message_username\n");

class Users{

	private $db;
	public function __construct($database) {
	     $this->db = $database;
	}

	function post_message($message_username, $message_email, $message_content){
	 
	  
	 $query  = $this->db->prepare("INSERT INTO `messages` ( 
	 	`message_name`, `message_email`, `message_content`) 
	           VALUES (?, ?, ?) ");

	  
	  $query->bindValue(1, $message_username);
	  $query->bindValue(2, $message_email);
	  $query->bindValue(3, $message_content);
	  
	  try{
	   $query->execute();
	  } catch(PDOException $e){
	   die($e->getMessage());
	  } 
	}
}

?>