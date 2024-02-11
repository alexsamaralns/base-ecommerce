DELIMITER //

CREATE PROCEDURE PR_DELETE_USER(IN user_id INT)
BEGIN
  DECLARE user_id_exists INT;

  -- Check if the user ID exists in the USERS table
  SELECT COUNT(*) INTO user_id_exists FROM USERS WHERE id = user_id;

  -- If the user ID exists, delete records from ADDRESS and PHONES tables
  IF user_id_exists > 0 THEN
    -- Delete records from ADDRESS table
    DELETE FROM ADDRESS WHERE id_user = user_id;

    -- Delete records from PHONES table
    DELETE FROM PHONES WHERE id_user = user_id;

    -- Delete user from USERS table
    DELETE FROM USERS WHERE id = user_id;

    SELECT 'Records deleted successfully' AS result;
  ELSE
    SELECT 'User ID not found' AS result;
  END IF;
END //

DELIMITER ;
