<?php

class UserGateway
{
    private PDO $conn;
    
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }
    
    public function getByEmail(string $email): array | false
    {
        $sql = "SELECT *
                FROM Cliente
                WHERE email = :email";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":email", $email, PDO::PARAM_STR);
        
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getByID(int $id): array | false
    {
        $sql = "SELECT *
                FROM Cliente
                WHERE id_cliente = :id";
                
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindValue(":id", $id, PDO::PARAM_INT);
        
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
