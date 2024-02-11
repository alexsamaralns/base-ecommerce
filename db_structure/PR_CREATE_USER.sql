DELIMITER //

CREATE PROCEDURE PR_UPDATE_USER(
    IN p_id INT,
    IN p_name VARCHAR(120),
    IN p_cpf_cnpj VARCHAR(14),
    IN p_email VARCHAR(80),
    IN p_password VARCHAR(120),
    IN p_addresses JSON,
    IN p_phones JSON
)
BEGIN
    -- Atualizar dados na tabela USERS
    UPDATE USERS
    SET userName = p_name,
        cpf_cnpj = p_cpf_cnpj,
        email = p_email,
        userPassword = p_password
    WHERE id = p_id;

    -- Deletar dados existentes na tabela ADDRESS relacionados ao usuário
    DELETE FROM ADDRESS
    WHERE id_user = p_id;

    -- Inserir novos dados na tabela ADDRESS
    INSERT INTO ADDRESS (id_user, street, number, complement, district, city, state, zip_code)
    SELECT p_id, address.street, address.number, address.complement, address.district, address.city, address.state, address.zip_code
    FROM JSON_TABLE(p_addresses, "$[*]" COLUMNS (
        street VARCHAR(120) PATH "$.street",
        number VARCHAR(10) PATH "$.number",
        complement VARCHAR(120) PATH "$.complement",
        district VARCHAR(80) PATH "$.district",
        city VARCHAR(180) PATH "$.city",
        state VARCHAR(2) PATH "$.state",
        zip_code VARCHAR(8) PATH "$.zip_code"
    )) AS address;

    -- Deletar dados existentes na tabela PHONES relacionados ao usuário
    DELETE FROM PHONES
    WHERE id_user = p_id;

    -- Inserir novos dados na tabela PHONES
    INSERT INTO PHONES (id_user, phone)
    SELECT p_id, phone
    FROM JSON_TABLE(p_phones, "$[*]" COLUMNS (
        phone VARCHAR(12) PATH "$"
    )) AS phone;
END //

DELIMITER ;
