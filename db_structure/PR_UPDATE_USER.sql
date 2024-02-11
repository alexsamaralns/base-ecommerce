DELIMITER //

CREATE PROCEDURE PR_UPDATE_USER(
    IN userId INT,
    IN userName VARCHAR(120),
    IN userCpfCnpj VARCHAR(14),
    IN userEmail VARCHAR(80),
    IN userPassword VARCHAR(120),
    IN addressStreet VARCHAR(120),
    IN addressNumber VARCHAR(10),
    IN addressComplement VARCHAR(120),
    IN addressDistrict VARCHAR(80),
    IN addressCity VARCHAR(180),
    IN addressState VARCHAR(2),
    IN addressZipCode INT,
    IN phonesArray JSON
)
BEGIN
    -- Start transaction
    START TRANSACTION;

    -- Update user information
    UPDATE USERS
    SET
        name = userName,
        cpf_cnpj = userCpfCnpj,
        email = userEmail,
        password = userPassword,
        updated_at = NOW()
    WHERE id = userId;

    -- Update address information
    UPDATE ADDRESS
    SET
        street = addressStreet,
        number = addressNumber,
        complement = addressComplement,
        district = addressDistrict,
        city = addressCity,
        state = addressState,
        zip_code = addressZipCode,
        updated_at = NOW()
    WHERE id_user = userId;

    -- Delete existing phones for the user
    DELETE FROM PHONES WHERE id_user = userId;

    -- Insert new phones
    INSERT INTO PHONES (id_user, phone, created_at, updated_at)
    VALUES
        (userId, JSON_UNQUOTE(JSON_EXTRACT(phonesArray, '$[0]')), NOW(), NOW()),
        (userId, JSON_UNQUOTE(JSON_EXTRACT(phonesArray, '$[1]')), NOW(), NOW());

    -- Commit the transaction
    COMMIT;
END //

DELIMITER ;
