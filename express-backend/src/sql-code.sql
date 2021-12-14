CREATE DATABASE db1;
CREATE DATABASE if not exists db2;
CREATE DATABASE if not exists db3;
CREATE DATABASE if not exists Prueba1;

use db1;
drop DATABASE db2;

CREATE TABLE EspeciesDeMono (
especie string PRIMARY KEY,
nombre_comun string,
poblacion int,
tamanio_promedio int
);

//Tabla con llave compuesta

CREATE TABLE Estudiante (
    id int PRIMARY KEY,
    nombre string,
    pais string,
    edad int
);

CREATE TABLE Muro (
usuario_id int,
mes_publicado int,
hora_publicado double,
contenido string,
publicado_por string,
PRIMARY KEY (usuario_id, mes_publicado, hora_publicado)
);

DROP TABLE IF EXISTS usuarios;

truncate table usuarios;

commit;
rollback;

CREATE USER Pedro WITH PASSWORD "1234";
GRANT Pedro ON Prueba1;
REVOKE Pedro ON Prueba1;

INSERT INTO Estudiante VALUES ( 1, "Paola" , "Colombia", 25) ;
INSERT INTO Estudiante VALUES ( 1, "Paola" , "Colombia", 15) ;
INSERT INTO Estudiante (id, nombre, pais) VALUES ( 1, "Juan Valdez" , "Colombia", 25) ;

UPDATE Estudiante
SET Nombre= "Pao",
 edad=21
WHERE Nombre == "Paola" && Edad<18;

SELECT alumno FROM Estudiante;
SELECT alumno FROM Estudiante where true;
