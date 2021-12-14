CREATE DATABASE db1;
CREATE DATABASE if not exists db2;
CREATE DATABASE if not exists db3;

use db1;
drop DATABASE db2;

CREATE TABLE EspeciesDeMono (
especie string PRIMARY KEY,
nombre_comun string,
poblacion int,
tamanio_promedio int
);

//Tabla con llave compuesta

CREATE TABLE Muro (
usuario_id int,
mes_publicado int,
hora_publicado double,
contenido string,
publicado_por string,
PRIMARY KEY (usuario_id, mes_publicado, hora_publicado)
);
