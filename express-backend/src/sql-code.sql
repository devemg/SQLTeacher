CREATE DATABASE db1;
CREATE DATABASE db2;
drop DATABASE db2;
use db1;

CREATE TABLE EspeciesDeMono (
especie string PRIMARY KEY,
nombre_comun string,
poblacion int,
tamanio_promedio int
);


CREATE TABLE Muro (
usuario_id int,
mes_publicado int,
hora_publicado double,
contenido string,
publicado_por string,
PRIMARY KEY (usuario_id, mes_publicado, hora_publicado)
);

CREATE TABLE Muro (
usuario_id int,
mes_publicado int,
hora_publicado double,
contenido string,
publicado_por string,
PRIMARY KEY (usuario_id, mes_publicado, hora_publicado)
);

commit;
/*


//Tabla con llave compuesta



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
*/