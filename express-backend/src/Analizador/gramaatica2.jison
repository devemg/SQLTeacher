
SENTENCIATCL = BACKUP
| RESTAURAR;

SENTENCIADCL = CREAR_USUARIO
| OTORGAR
| DENEGAR;


/*
*/



BACKUP = pr_backup;

RESTAURAR = pr_restaurar;

CREAR_USUARIO = pr_crear pr_usuario val_variable pr_con pr_password val_cadena;

OTORGAR = pr_otorgar val_variable pr_on val_variable;

DENEGAR = pr_denegar val_variable pr_on val_variable;

CREAR_USERTYPE = pr_crear + pr_type + val_variable + tk_par1 + LISTAATRIBUTOS + tk_par2
| pr_crear pr_type pr_if pr_not pr_exists + val_variable + tk_par1 + LISTAATRIBUTOS + tk_par2
;

LISTAATRIBUTOS = ATRIBUTO tk_coma LISTAATRIBUTOS
|ATRIBUTO
;

ATRIBUTO = val_variable TIPODATO;


			#region expresion

			EXPRESION.Rule = //aritmeticos
				//otros
				| EXPRESION + xor + EXPRESION
				| VALOR
				| TERNARIO;

			VALOR.Rule = 
				| LLAMADAFUNCION
				| ACCESO
				| llave1 + INFOCOLLECTIONS + llave2 //map
				| cor1 + INFOCOLLECTIONS + cor2 //map
				| cor1 + LISTAEXPRESIONES + cor2 //listas
				| SETDATOS  // set 
				| OBJETO
				| MODIFICADORES
				| FUNCIONAGREGACION
				| pr_new + TIPODATO
				| id + punto + ACCESO
				;

			SETDATOS.Rule=llave1 + LISTAEXPRESIONES + llave2;

			OBJETO.Rule = llave1 + LISTAEXPRESIONES + llave2 + pr_as +nombre;


			MODIFICADORES.Rule = id + masmas 
				| id + punto + ACCESO + masmas
				| id +menosmenos
				| id + punto + ACCESO + menosmenos;

			ACCESO.Rule = MakePlusRule(ACCESO, punto, AC_CAMPO);

			AC_CAMPO.Rule = nombre + cor1 + EXPRESION + cor2
				| nombre + par1 + LISTAEXPRESIONES + par2
				| nombre;

			INFOCOLLECTIONS.Rule = MakePlusRule(INFOCOLLECTIONS, coma, INFO)
				| MakePlusRule(INFOCOLLECTIONS,coma,cadena); 

			INFO.Rule = EXPRESION + dospuntos + EXPRESION;


			LLAMADAFUNCION.Rule = nombre + par1 + LISTAEXPRESIONES + par2;

			LISTA_ACCESOS.Rule = MakePlusRule(LISTA_ACCESOS, coma, ACCESO);

			LISTAEXPRESIONES.Rule = MakeStarRule(LISTAEXPRESIONES, coma, EXPRESION);


			TIPODATO.Rule = pr_text
				| pr_integer
				| pr_double
				| pr_bool
				| pr_date
				| pr_time
				| pr_counter
				| pr_map + menor + TIPODATO + coma + TIPODATO + mayor
				| pr_set + menor + TIPODATO + mayor
				| pr_list + menor + TIPODATO + mayor
				| nombre
				| pr_map
				| pr_set
				| pr_list
				| pr_cursor;

			#endregion

			#region sentencias DDL/TCL/DCL

		

		 
			/*
			ALTERAR_USUARIO.Rule=pr_alterar+pr_usuario+nombre+pr_cambiar+pr_password+igual+cadena+puntoycoma;


			ELIMINARUSUARIO.Rule = pr_eliminar + pr_usuario + nombre + puntoycoma;
			*/

			#endregion

			#region sentencias DML

			SENTENCIASDML.Rule = MakePlusRule(SENTENCIASDML, SENTENCIADML);

			SENTENCIADML.Rule = INSERTAR
				| ACTUALIZAR
				| BORRAR
				| SELECCIONAR + puntoycoma
				| BATCH;

			SENTENCIADML.ErrorRule=SyntaxError +puntoycoma;

			//cambiar si se puede insertar valores en objeto desde aca

			INSERTAR.Rule =pr_insertar+pr_into+nombre+pr_valores +par1 + LISTAEXPRESIONES+par2+puntoycoma
				|pr_insertar+pr_into+nombre+par1+LISTANOMBRESPURA+par2+pr_valores+par1+LISTAEXPRESIONES+par2+puntoycoma; 
			//validar cantidad de columnas y expresiones


			ACTUALIZAR.Rule = pr_actualizar + nombre + pr_set + LISTA_ASIGNACIONES + puntoycoma
				| pr_actualizar + nombre + pr_set + LISTA_ASIGNACIONES + PROPIEDADDONDE + puntoycoma;

			LISTA_ASIGNACIONES.Rule = MakePlusRule(LISTA_ASIGNACIONES,coma,ASIGNACIONAC);

			ASIGNACIONAC.Rule = ACCESO + igual + EXPRESION;

			//cambiar listas si se puede eliminar campos de objetos desde aca
			//
			BORRAR.Rule = pr_borrar + pr_from + nombre + puntoycoma
				| pr_borrar + pr_from + nombre + PROPIEDADDONDE + puntoycoma
				| pr_borrar + AC_CAMPO + pr_from + nombre + puntoycoma
				| pr_borrar + AC_CAMPO + pr_from + nombre + PROPIEDADDONDE + puntoycoma;

			SELECCIONAR.Rule =pr_seleccionar+LISTAEXPRESIONES+pr_from+nombre+PROPIEDADSELECCIONAR
				| pr_seleccionar + por + pr_from + nombre + PROPIEDADSELECCIONAR;

			PROPIEDADSELECCIONAR.Rule = MakeStarRule(PROPIEDADSELECCIONAR,PROPSELECT);

			PROPSELECT.Rule = PROPIEDADDONDE
				| pr_ordenar + pr_ordPor+PROPIEDADORDENAR
				| PROPIEDADLIMIT;

			PROPIEDADDONDE.Rule = pr_donde + EXPRESION
				| pr_donde +ACCESO
				| pr_donde + EXPRESION + pr_in + EXPRESION
				| pr_donde + EXPRESION + pr_in + par1 + LISTAEXPRESIONES + par2;

			PROPIEDADORDENAR.Rule = MakePlusRule(PROPIEDADORDENAR,coma,PROPORDER);

			PROPORDER.Rule = nombre + ASCDESC;

			ASCDESC.Rule =pr_asc|pr_desc|Empty;

			PROPIEDADLIMIT.Rule =pr_limit+EXPRESION;

			BATCH.Rule = pr_begin + pr_batch + SENTENCIASDML + pr_apply + pr_batch + puntoycoma;

			FUNCIONAGREGACION.Rule = NOMBREFUNCION + par1+ToTerm("<<") + SELECCIONAR +ToTerm(">>")+par2;

			NOMBREFUNCION.Rule = pr_count 
				| pr_min 
				| pr_max 
				| pr_sum 
				| pr_avg;

			#endregion

			#region sentencias FCL

			BLOQUESENTENCIAS.Rule = MakeStarRule(BLOQUESENTENCIAS, SENTENCIABLOQUE) ;
			
			SENTENCIABLOQUE.Rule = SENTENCIADDL
				| SENTENCIADML
				|SENTENCIAFCL
				;

			SENTENCIAFCL.Rule = ASIGNACION
				| DECLARACION
				| MODIFICADORES + puntoycoma
				| IF
				| SWITCH
				| WHILE
				| DOWHILE
				| FOR
				| LLAMADAFUNCION + puntoycoma
				| RETORNO
				| CALLPROC
				| BREAK
				| CONTINUE
				| CREAR_CURSOR
				| FOREACH
				| OPENCURSOR
				| CLOSECURSOR
				| LOG
				| TRYCATCH
				| OPERACIONASIGNACION
				| ASIGNACIONCALL
				| ACCESOFUNCION;

			SENTENCIAFCL.ErrorRule = SyntaxError + puntoycoma
				| SyntaxError + llave2
				;

			ACCESOFUNCION.Rule = id + punto + ACCESO+puntoycoma;

			ASIGNACIONCALL.Rule = LISTAACCESO1 + igual + CALLPROC;

			LISTAACCESO1.Rule = MakePlusRule(LISTAACCESO1, coma, ACCESOID);

			ACCESOID.Rule = id + punto + ACCESO
				| id;

			DECLARACION.Rule = TIPODATO+ LISTAVARIABLES + puntoycoma
				| TIPODATO + LISTAVARIABLES + igual + EXPRESION + puntoycoma;
				
			LISTAVARIABLES.Rule =MakePlusRule(LISTAVARIABLES,coma,id);

			ASIGNACION.Rule = id + igual + EXPRESION + puntoycoma
				| id + punto + ACCESO + igual + EXPRESION + puntoycoma;

			IF.Rule = pr_if + par1 + EXPRESION + par2 + llave1 + BLOQUESENTENCIAS + llave2
				 | pr_if + par1 + EXPRESION + par2 + llave1 + BLOQUESENTENCIAS + llave2 + pr_else+ llave1 + BLOQUESENTENCIAS + llave2
				 | pr_if + par1 + EXPRESION + par2 + llave1 + BLOQUESENTENCIAS + llave2 + ELSEIFS
				 | pr_if + par1 + EXPRESION + par2 + llave1 + BLOQUESENTENCIAS + llave2 + ELSEIFS + pr_else + llave1 + BLOQUESENTENCIAS + llave2;

			ELSEIFS.Rule = MakePlusRule(ELSEIFS,ELSEIF);

			ELSEIF.Rule = pr_else + pr_if + par1 + EXPRESION + par2  + llave1 + BLOQUESENTENCIAS + llave2;

			SWITCH.Rule = pr_switch + par1 + EXPRESION + par2 + llave1 + LISTACASE + DEFAULT + llave2
				| pr_switch + par1 + EXPRESION + par2 + llave1 + LISTACASE + llave2;

			LISTACASE.Rule = MakePlusRule(LISTACASE,CASE);

			CASE.Rule = pr_case + EXPRESION + dospuntos + llave1 + BLOQUESENTENCIAS + llave2;

			DEFAULT.Rule = pr_default + dospuntos + llave1 + BLOQUESENTENCIAS + llave2;

			BREAK.Rule = pr_break + puntoycoma;

			FOR.Rule = pr_for + par1 +INIFOR+ puntoycoma + EXPRESION + puntoycoma + EXPRESION + par2 + llave1 + BLOQUESENTENCIAS + llave2;

			INIFOR.Rule = id + igual + EXPRESION
				| TIPODATO+id + igual + EXPRESION;

			WHILE.Rule =pr_while+par1+EXPRESION+par2+ llave1 + BLOQUESENTENCIAS + llave2;

			DOWHILE.Rule = pr_do + llave1 + BLOQUESENTENCIAS + llave2 + pr_while + par1 + EXPRESION + par2 + puntoycoma;

			CREAR_PROC.Rule = pr_proc + nombre + par1 + LISTAPARAMETROS + par2+coma + par1 + LISTAPARAMETROS + par2  + llave1 + BLOQUESENTENCIAS + llave2;

			LISTAPARAMETROS.Rule = MakeStarRule(LISTAPARAMETROS, coma, PARAMETRO);

			PARAMETRO.Rule = TIPODATO + id;

			CREAR_FUNCION.Rule = TIPODATO + nombre + par1 + LISTAPARAMETROS + par2+ llave1 + BLOQUESENTENCIAS + llave2
				|pr_void + nombre + par1 + LISTAPARAMETROS + par2 + llave1 + BLOQUESENTENCIAS + llave2;

			RETORNO.Rule = pr_return+LISTAEXPRESIONES+puntoycoma;

			CALLPROC.Rule = pr_call + nombre + par1 + LISTAEXPRESIONES + par2+puntoycoma;

			CONTINUE.Rule = pr_continue+puntoycoma;

			CREAR_CURSOR.Rule = pr_cursor + id + pr_is + SELECCIONAR + puntoycoma
				|pr_cursor + id + igual +EXPRESION+puntoycoma;

			FOREACH.Rule = pr_for + pr_each + par1 + LISTAPARAMETROS + par2 + pr_in + id + llave1 + BLOQUESENTENCIAS + llave2;

			OPENCURSOR.Rule = pr_open + id + puntoycoma;

			CLOSECURSOR.Rule = pr_close + id + puntoycoma;

			LOG.Rule = pr_log + par1 + EXPRESION + par2 + puntoycoma;

			THROW.Rule = pr_throw + pr_new + nombre + puntoycoma;

			TRYCATCH.Rule = pr_try + llave1 + SENTENCIASTRY + llave2 + pr_catch + par1 + nombre + id + par2 + llave1 + BLOQUESENTENCIAS + llave2;

			SENTENCIASTRY.Rule =MakeStarRule(SENTENCIASTRY,SENTENCIATRY);

			SENTENCIATRY.Rule = THROW
				| SENTENCIABLOQUE;

			OPERACIONASIGNACION.Rule = id + mas + igual + EXPRESION + puntoycoma 
				| id + punto + ACCESO + mas + igual + EXPRESION + puntoycoma
				| id + menos + igual + EXPRESION + puntoycoma 
				| id + punto + ACCESO + menos + igual + EXPRESION + puntoycoma
				| id + div + igual + EXPRESION + puntoycoma 
				| id + punto + ACCESO + div + igual + EXPRESION + puntoycoma
				| id + por + igual + EXPRESION + puntoycoma 
				| id + punto + ACCESO + por + igual + EXPRESION + puntoycoma;