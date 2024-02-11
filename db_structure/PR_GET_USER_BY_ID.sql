DELIMITER //

CREATE PROCEDURE PR_GET_USER_BY_ID(IN idUser INT)
BEGIN
    SELECT
    U.*,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', A.id,
                'street', A.street,
                'number', A.number,
                'complement', A.complement,
                'district', A.district,
                'city', A.city,
                'state', A.state,
                'zip_code', A.zip_code
            )
        ) 
        FROM ADDRESS A
        WHERE A.id_user = U.id
    ) AS addresses,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', P.id,
                'phone', P.phone
            )
        ) 
        FROM PHONES P
        WHERE P.id_user = U.id
    ) AS phones
FROM USERS U
WHERE U.id = idUser;

END //

DELIMITER ;
