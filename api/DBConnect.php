<?php 
	
/******************************** Database Connection | 22-04-2022 ********************************/


$db_conn = mysqli_connect("localhost:3306","root","","react_crud") or die("connection failed");

class DbConnect{

	private $db_host = "localhost:3306";
	private $db_user = "root";
	private $db_pass = "";
	private $db_name = "react_crud";

	private $mysqli = '';
	private $conn = false;
	private $result = [];
	private $resultRows = '';

	public function __construct(){
		if (!$this->conn) {
			$this->mysqli = new mysqli($this->db_host,$this->db_user,$this->db_pass,$this->db_name);
			$this->conn = true;
			if ($this->mysqli->connect_error) {
				array_push($this->result, $this->mysqli->connect_error);
				return false;
			}
		}else{
			return true;
		}
	}


/******************************** Insert Code | 23-04-2022 ********************************/

	public function insert($table, $values=[],$FILES){
		if ($this->tableExist($table)) {
			//echo $values;exit;
			$tbl_key = implode(', ', array_keys($values));
			$tbl_val = "'" . implode ( "', '", $values ) . "'";
			//print_r($FILES);exit;
			//echo $tbl_val;exit;
			if(!empty($FILES)){
				$file = $FILES['fileUpload']['name'];
				$temp = $FILES['fileUpload']['tmp_name'];
				$pathinfo = pathinfo($file, PATHINFO_FILENAME);
				$pathexe = pathinfo($file, PATHINFO_EXTENSION);
				$data = $pathinfo."".date("Ymd").".".$pathexe;
				move_uploaded_file($temp,"img/" . $data);
				$tbl_key .= ',fileUpload';
				$tbl_val .= ",'".$data."'";
			}else{

			}
			

			$insert_qry = "INSERT INTO $table($tbl_key) VALUES($tbl_val)";
			if ($this->mysqli->query($insert_qry)) {
				array_push($this->result, $this->mysqli->insert_id);
				return true;
			}else{
				array_push($this->result, $this->mysqli->error);
				return false;
			}
		}else{
			return false;
		}
	}



/******************************** Find table exist or not Code | 23-04-2022 ********************************/

	private function tableExist($table){
		$tbl_sql = "SHOW TABLES FROM $this->db_name LIKE '$table'";
		$table_qry = $this->mysqli->query($tbl_sql);
		if ($table_qry->num_rows == 1) {
			return true;
		}else{
			array_push($this->result, "<b><i>".$table."</i></b> dos not exist in this database...!!");
			return false;
		}
	}


}
$conn_obj = new DbConnect();
/* class DbConnect {

	private $db_host = "localhost:8181";
	private $db_user = "root";
	private $db_pass = "";
	private $db_name = "react_crud";

	private $mysqli = '';
	private $conn = false;
	private $result = [];
	private $resultRows = '';

	public function __construct(){
		if (!$this->conn) {
			$this->mysqli = new mysqli($this->db_host,$this->db_user,$this->db_pass,$this->db_name);
			$this->conn = true;
			if ($this->mysqli->connect_error) {
				array_push($this->result, $this->mysqli->connect_error);
				return false;
			}
		}else{
			return true;
		}
	} */


// }
	// sql to create table
	/* $sql = "CREATE TABLE MyGuests (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	email VARCHAR(50),
	reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	)"; */

	/* if ($conn->query($sql) === TRUE) {
	echo "Table MyGuests created successfully";
	} else {
	echo "Error creating table: " . $conn->error;
	}

	$conn->close(); */
// }

	/* class DbConnect {
		private $server = 'localhost:8181';
		private $dbname = 'react_crud';
		private $user = 'root';
		private $pass = '';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
	} */
?>