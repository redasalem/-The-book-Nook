<?php
session_start();
error_log("Session save path: " . session_save_path());
error_log("Session ID: " . session_id());
error_log("Session status: " . session_status());
error_log("Session data: " . print_r($_SESSION, true));
?> 