<?php 
class Tutorials{

	private $db;
	public function __construct($database) {
	     $this->db = $database;
	}


	function get_tutorials(){
	$query = $this->db->prepare("SELECT * FROM `tutorials` ORDER BY `tutorial_id` ASC");
	
	try{
		$query->execute();
		}
	catch (PDOEXCEPTION $e) {
		die($e->getMessage());
		}
	return $query->fetchALL();
	}

}
?>