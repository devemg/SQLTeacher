///configuraciones
%{
    const { Valor } = require('./AST/Expresiones/valor');
    const { Variable } = require('./AST/Expresiones/variable');
    const { Aritmetica } = require('./AST/Expresiones/aritmentica');
    const { LogicaRelacional } = require('./AST/Expresiones/logica-relacional');
    const { TipoDato } = require('./AST/Expresiones/tipos/tipo-dato');
    const { TipoAritmetica } = require('./AST/Expresiones/tipos/tipo-operacion-aritmetica');
    const { TipoLogicaRelacional } = require('./AST/Expresiones/tipos/tipo-operacion-logica-relacional');
    const { ErrorLexico } = require('./AST/Errores/error-lexico');
    const { ErrorSintactico } = require('./AST/Errores/error-sintactico');
    const { Asignacion } = require('./AST/Sentencias/asignacion');
    const { Declaracion } = require('./AST/Sentencias/declaracion');
    const { TablaSimbolos } = require('./AST/TablaSimbolos/tabla-simbolos');
    const { Print } = require('./AST/Sentencias/print');
    const { For } = require('./AST/Sentencias/for');
    const { SWhile } = require('./AST/Sentencias/while');
    const { SDoWhile } = require('./AST/Sentencias/do-while');
    const { Incremento } = require('./AST/Sentencias/incremento');
    const { IfElse } = require('./AST/Sentencias/if-else');
    
    const { CrearDB } = require('./AST/Database/crear-db');
    const { EliminarDB } = require('./AST/Database/eliminar-db');
    const { UsarDB } = require('./AST/Database/usar-db');
    
    const { CrearTabla, ColumnaCrearTabla } = require('./AST/Database/crear-tabla');
    const { ModificarTabla } = require('./AST/Database/modificar-tabla');
    const { TruncarTabla } = require('./AST/Database/truncar-tabla');
    const { EliminarTabla } = require('./AST/Database/eliminar-tabla');

    const { Commit } = require('./AST/Database/commit');
    const { Rollback } = require('./AST/Database/rollback');

    const { CrearUsuario } = require('./AST/Database/crear-usuario');
    const { OtorgarPermisos } = require('./AST/Database/otorgar-permisos');
    const { RevocarPermisos } = require('./AST/Database/revocar-permisos');


    const errores = [];
%}

%lex
%options case-insensitive

%% 
//definir tokens 
// ER      retrun 'NOMBRE_TOKEN'
/* SIMBOLOS */
\s+											                    // se ignoran espacios en blanco
"//".*										                    // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			                    // comentario multiple líneas

"+"                                                             return 'tk_suma';
"-"                                                             return 'tk_resta';
"*"                                                             return 'tk_por';
"**"                                                            return 'tk_pot';
"/"                                                             return 'tk_div';
"%"                                                             return 'tk_mod';
"{"                                                             return 'tk_llave1';
"}"                                                             return 'tk_llave2';
"("                                                             return 'tk_par1';
")"                                                             return 'tk_par2';
";"                                                             return 'tk_pycoma';
"?"                                                             return 'tk_interrogacion';
":"                                                             return 'tk_dpuntos';
","                                                             return 'tk_coma';
"<"                                                             return 'tk_menor';
">"                                                             return 'tk_mayor';
"<="                                                            return 'tk_menor_igual';
">="                                                            return 'tk_mayor_igual';
"!="                                                            return 'tk_diferente';
"!"                                                             return 'tk_not';
"="                                                             return 'tk_igual';
"||"                                                            return 'tk_or';
"&&"                                                            return 'tk_and';
"@"                                                             return 'tk_arr';
/* PALABRAS RESERVADAS */
"null"                                                          return 'pr_null';
"int"                                                           return 'pr_int';
"double"                                                        return 'pr_double';
"boolean"                                                       return 'pr_boolean';
"string"                                                        return 'pr_string';
"date"                                                          return 'pr_date';
"counter"                                                       return 'pr_counter';
"time"                                                          return 'pr_time';
"function"                                                      return 'pr_function';
"print"                                                         return 'pr_print';
"for"                                                           return 'pr_for';
"while"                                                         return 'pr_while';
"do"                                                            return 'pr_do';
"if"                                                            return 'pr_if';
"else"                                                          return 'pr_else';
"true"                                                          return 'pr_true';
"false"                                                         return 'pr_false';
"create"                                                        return 'pr_create';
"use"                                                           return 'pr_use';
"drop"                                                          return 'pr_drop';
"not"                                                           return 'pr_not';
"exists"                                                        return 'pr_exists';
"database"                                                      return 'pr_database';
"table"                                                         return 'pr_table';
"primary"                                                       return 'pr_primary';
"key"                                                           return 'pr_key';
"alter"                                                         return 'pr_alter';
"add"                                                           return 'pr_add';
"truncate"                                                      return 'pr_truncate';
"rollback"                                                      return 'pr_rollback';
"commit"                                                        return 'pr_commit';
"user"                                                          return 'pr_user';
"with"                                                          return 'pr_with';
"password"                                                      return 'pr_password';
"on"                                                            return 'pr_on';
"grant"                                                         return 'pr_grant';
"revoke"                                                        return 'pr_revoke';


/* EXPRESIONES REGULARES */
\"[^\"]*\"				                                        { yytext = yytext.substr(1,yyleng-2); return 'val_cadena'; }
\'[^\']*\'				                                        { yytext = yytext.substr(1,yyleng-2); return 'val_cadena'; }
[0-9]+("."[0-9]+)?                                              return 'val_decimal';
[0-9]+                                                          return 'val_entero';
[a-zA-Z_]+[a-zA-Z_0-9]*\b                                       return 'val_variable';
<<EOF>>                                                         return 'EOF';

.                           { console.log('error léxico'); errores.push(new ErrorLexico(yytext, yylloc.first_line, yylloc.first_column)); }

/lex



%left 'tk_interrogacion' 'tk_dpuntos'
%left 'tk_or'
%left 'tk_and'
%left 'tk_diferente' 'tk_igual'
%left 'tk_menor_igual' 'tk_mayor_igual' 'tk_menor' 'tk_mayor'
%left 'tk_suma' 'tk_resta'
%left 'tk_por' 'tk_div'
%right UMENOS // precedencia creada para reconocer expresiones con número negativos y no exista conflicto con la resta
%left 'tk_pot'
%left 'tk_mod'
//%right UNOT // precedencia creada para reconocer expresiones con número negativos y no exista conflicto con la diferencia

%start INICIO

%% 
// Producciones

INICIO : SENTENCIAS EOF {
    const ast = $1;
     return { ast, errores}; }
;

/***** SENTENCIAS DB ************************************************************************************************/

SENTENCIAS: SENTENCIAS SENTENCIA { $$ = $1.concat($2); } 
| SENTENCIA {$$ = [$1] }
;

SENTENCIA : SENTENCIADDL tk_pycoma { $$ = $1; }
| SENTENCIATCL tk_pycoma { $$ = $1; } //commit y rollback
| SENTENCIADCL tk_pycoma { $$ = $1; } //usuarios y permisos
//| SENTENCIADML //base de datos
//| CREAR_FUNCION
//| CREAR_PROC
//| CREAR_USERTYPE
//| FUNCIONAGREGACION + puntoycoma
//| SENTENCIAFCL
;

SENTENCIADDL: CREAR_DB { $$ = $1; }
| USAR_DB { $$ = $1; }
| ELIMINAR_DB { $$ = $1; }
| CREAR_TABLA { $$ = $1; }
| ALTERAR_TABLA { $$ = $1; }
| ELIMINAR_TABLA { $$ = $1; }
| TRUNCAR_TABLA { $$ = $1; }
;


/***** DDL *****/
CREAR_DB: pr_create pr_database val_variable { $$ = new CrearDB($3, false, @1.first_line, @1.first_column); }
| pr_create pr_database pr_if pr_not pr_exists val_variable { $$ = new CrearDB($6, true, @1.first_line, @1.first_column); }
;

USAR_DB: pr_use val_variable { $$ = new UsarDB($2, @1.first_line, @1.first_column); }
;

ELIMINAR_DB: pr_drop pr_database val_variable { $$ = new EliminarDB($3, @1.first_line, @1.first_column); }
;

CREAR_TABLA: pr_create pr_table val_variable tk_par1 LISTACAMPOSTABLA tk_par2 {
    $$ = new CrearTabla($3, false, $5, @1.first_line, @1.first_column);
}
| pr_crear pr_tabla pr_if pr_not pr_exists val_variable tk_par1 LISTACAMPOSTABLA tk_par2  {
    $$ = new CrearTabla($6, true, $8, @1.first_line, @1.first_column);
}
;

LISTACAMPOSTABLA: CAMPOTABLA tk_coma LISTACAMPOSTABLA { $$ = $3.concat($1); }
|CAMPOTABLA { $$ = [$1]; };

CAMPOTABLA: val_variable TIPO_DATO_DB pr_primary pr_key { $$ = new ColumnaCrearTabla($1, $2, true, null, @1.first_line, @1.first_column); }
| val_variable TIPO_DATO_DB { $$ = new ColumnaCrearTabla($1, $2, false, null, @1.first_line, @1.first_column); }
| pr_primary pr_key tk_par1 LISTANOMBRESPURA tk_par2 { $$ = new ColumnaCrearTabla('', TipoDato.COUNTER, true, $4, @1.first_line, @1.first_column); }
;

TIPO_DATO_DB : TIPO_DATO {$$ = $1; } 
| pr_counter { $$ = TipoDato.COUNTER }
;

LISTANOMBRESPURA: val_variable tk_coma LISTANOMBRESPURA { $$ = $3.concat($1); }
| val_variable { $$ = [$1]; };


ALTERAR_TABLA: pr_alter pr_table val_variable pr_add  LISTACAMPOSTABLA {
    $$ = new ModificarTabla($3, $5, null,@1.first_line, @1.first_column);
}
| pr_alter pr_table val_variable pr_drop LISTANOMBRESPURA {
    $$ = new ModificarTabla($3, null, $5, @1.first_line, @1.first_column);
}
; 

ELIMINAR_TABLA: pr_drop pr_table val_variable {
    $$ = new EliminarTabla($3, false, @1.first_line, @1.first_column);
}
| pr_drop pr_table pr_if pr_exists val_variable {
    $$ = new EliminarTabla($5, true, @1.first_line, @1.first_column);
}
;

TRUNCAR_TABLA: pr_truncate pr_table val_variable {
    $$ = new TruncarTabla($3, @1.first_line, @1.first_column);
}
;

/***** TCL *****/

SENTENCIATCL: pr_commit { $$ = new Commit(@1.first_line, @1.first_column); }
| pr_rollback { $$ = new Rollback(@1.first_line, @1.first_column); }
;


/***** DCL *****/
SENTENCIADCL: CREAR_USUARIO { $$ = $1; }
| OTORGAR { $$ = $1; }
| DENEGAR { $$ = $1; }
;

CREAR_USUARIO: pr_create pr_user val_variable pr_with pr_password val_cadena {
    $$ = new CrearUsuario($3, $5, @1.first_line, @1.first_column);
};

OTORGAR: pr_grant val_variable pr_on val_variable {
    $$ = new OtorgarPermisos($2, $4, @1.first_line, @1.first_column);
};

DENEGAR: pr_revoke val_variable pr_on val_variable{
    $$ = new RevocarPermisos($2, $4, @1.first_line, @1.first_column);
};


/***** SENTENCIAS FCL ************************************************************************************************/

FUNCIONES : FUNCIONES FUNCION { $$ = $1.concat($2); } 
| FUNCION {$$ = [$1] }
| error { errores.push(new ErrorSintactico(yytext, @1.first_line,@1.first_column)); }
; 

FUNCION : pr_function val_variable tk_par1 tk_par2 BLOQUE;

BLOQUE : tk_llave1 INSTRUCCIONES tk_llave2 {$$ = $2;};

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1.concat($2); } 
| INSTRUCCION {$$ = [$1] }
//| error { errores.push(new ErrorSintactico(yytext, @1.first_line,@1.first_column)); }
; 

INSTRUCCION : INSTRUCCION_PC tk_pycoma {$$ = $1}
| INSTRUCCION_SPC {$$ = $1}
;

INSTRUCCION_PC : DECLARACION {$$ = $1}
| ASIGNACION  {$$ = $1}
| PRINT {$$ = $1}
| DOWHILE {$$ = $1}
;

INSTRUCCION_SPC : FOR {$$ = $1}
| WHILE {$$ = $1}
| IF {$$ = $1}
;

IF : pr_if tk_par1 CONDICION tk_par2 BLOQUE ELSE {$$ = new IfElse($3,$5,@1.first_line,@1.first_column,$6);}
;

ELSE : pr_else BLOQUE {$$ = $2; }
|
;


/*SWITCH : pr_switch tk_par1 EXPRESION tk_par2 CASES; 

CASES: CASES CASE { $$ = $1.concat($2); } 
| CASE { $$ = [$1]; } 
;

CASE: pr_case EXPRESION tk_dpuntos;

DEFAULT: pr_default tk_dpuntos; */


FOR: pr_for tk_par1 TIPO_DATO tk_arr val_variable tk_igual EXPRESION tk_pycoma 
    CONDICION tk_pycoma
    INCREMENTO tk_par2 BLOQUE {
    $$ = new For(new Declaracion($3, [$5], $7, @3.first_line,@3.first_column),$9, $11, $13, @1.first_line,@1.first_column);
};

WHILE : pr_while tk_par1 CONDICION tk_par2 BLOQUE {$$ = new SWhile($3,$5,@1.first_line,@1.first_column); };

DOWHILE : pr_do BLOQUE pr_while tk_par1 CONDICION tk_par2 {$$ = new SDoWhile($5,$2,@1.first_line,@1.first_column); };

INCREMENTO: tk_arr val_variable tk_suma tk_suma { $$ = new Incremento($2,@1.first_line,@1.first_column); };

DECLARACION : TIPO_DATO LISTA_ID tk_igual EXPRESION
    {$$ = new Declaracion($1, $2, $4, @3.first_line,@3.first_column); }
| TIPO_DATO LISTA_ID {$$ = new Declaracion($1, $2, null, @1.first_line,@1.first_column); };

ASIGNACION : tk_arr val_variable tk_igual EXPRESION 
    {$$ = new Asignacion($2, $4, @1.first_line,@1.first_column); }
;

PRINT : pr_print tk_par1 EXPRESION tk_par2 {{$$ = new Print($3, @1.first_line,@1.first_column); }};

TIPO_DATO : pr_int {$$ = TipoDato.ENTERO; }
| pr_double {$$ = TipoDato.DECIMAL; }
| pr_boolean {$$ = TipoDato.BOOLEANO; }
| pr_string {$$ = TipoDato.CADENA; }
| pr_date {$$ = TipoDato.FECHA; }
| pr_time {$$ = TipoDato.HORA; }
;

LISTA_ID: LISTA_ID tk_coma tk_arr val_variable {$$ = $1.concat($4);}
| tk_arr val_variable {$$ = [$2]; }
;
 
EXPRESION : EXPRESION tk_suma EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.SUMA)}
|EXPRESION tk_resta EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.RESTA)}
|EXPRESION tk_por EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MULTIPLICACION)}
|EXPRESION tk_div EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.DIVISION)}
|EXPRESION tk_pot EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.POTENCIA)}
|EXPRESION tk_mod EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MODULO)}
| tk_par1 EXPRESION tk_par2 {$$ = $2}
| VALOR {$$ = $1}
| CONDICION {$$ = $1}
;

/* Aplicamos las precedencias creadas con %prec */
VALOR : tk_resta EXPRESION %prec UMENOS {$$ = new Aritmetica(@2.first_line,@2.first_column,$2,null,TipoAritmetica.RESTA)}
| val_decimal { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.DECIMAL, $1)}
| val_entero { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.ENTERO, $1)}
| tk_arr val_variable { $$ = new Variable($2,@1.first_line,@1.first_column)}
| val_cadena { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.CADENA, $1)}
//| CASTEO
//| TERNARIO
;

/*
CASTEO: tk_par1 TIPO_DATO tk_par2 EXPRESION;

TERNARIO = CONDICION + tk_interrogacion + EXPRESION + tk_dpuntos + EXPRESION;
*/
CONDICION : EXPRESION tk_menor EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MENOR)}
|  EXPRESION tk_mayor EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MAYOR)}
| EXPRESION tk_menor_igual EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MENOR_IGUAL)}
| EXPRESION tk_mayor_igual EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MAYOR_IGUAL)}
| EXPRESION tk_igual tk_igual EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$4,TipoLogicaRelacional.IGUAL)}
| EXPRESION tk_diferente EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.DIFERENTE)}
| EXPRESION tk_and EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.AND)}
| EXPRESION tk_or EXPRESION
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.OR)}
//| pr_true
//| pr_false
//| tk_not CONDICION
;

/*
ASIGN_OPERACION = val_variable AOP;

AOP : tk_suma tk_igual
|tk_resta tk_igual
|tk_por tk_igual
|tk_div tk_igual;

*/

/*
EXPRESION TK_SUMA EXPRESION 
1           2       3
*/