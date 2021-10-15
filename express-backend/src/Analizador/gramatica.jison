///configuraciones
%{
    const { Valor } = require('./AST/Expresiones/valor');
    const { Aritmetica } = require('./AST/Expresiones/aritmentica');
    const { TipoDato } = require('./AST/Expresiones/tipos/tipo-dato');
    const { TipoAritmetica } = require('./AST/Expresiones/tipos/tipo-operacion-aritmetica');
    const { ErrorLexico } = require('./AST/Errores/error-lexico');
    const errores = [];
%}

%lex
%options case-insensitive

%% 
//definir tokens 
// ER      retrun 'NOMBRE_TOKEN'
/* SIMBOLOS */
"+"                                                             return 'tk_suma';
"-"                                                             return 'tk_resta';
"*"                                                             return 'tk_por';
"**"                                                            return 'tk_pot';
"/"                                                             return 'tk_div';
"%"                                                             return 'tk_mod';
"("                                                             return 'tk_par1';
")"                                                             return 'tk_par2';
";"                                                             return 'tk_pycoma';
"?"                                                             return 'tk_interrogacion';
":"                                                             return 'tk_dpuntos';
"::="                                                           return 'tk_asignacion';
"<"                                                             return 'tk_menor';
">"                                                             return 'tk_mayor';
"<="                                                            return 'tk_menor_igual';
">="                                                            return 'tk_mayor_igual';
"!="                                                            return 'tk_diferente';
"!"                                                             return 'tk_not';
"="                                                             return 'tk_igual';
"||"                                                            return 'tk_or';
"&&"                                                            return 'tk_and';
"@"                                                             return 'pr_arr';
/* PALABRAS RESERVADAS */
"null"                                                          return 'pr_null';
"int"                                                           return 'pr_int';
"double"                                                        return 'pr_double';
"boolean"                                                       return 'pr_boolean';
"string"                                                        return 'pr_string';
"date"                                                          return 'pr_date';
"time"                                                          return 'pr_time';

/* EXPRESIONES REGULARES */
[0-9]+("."[0-9]+)?                                              return 'val_decimal';
[0-9]+                                                          return 'val_entero';
[a-zA-Z_]+[a-zA-Z_0-9]*\b                                       return 'val_id';
<<EOF>>                                                         return 'EOF';

.                           { errores.push(new ErrorLexico(yytext, yylloc.first_line, yylloc.first_column)); }

/lex



%left 'tk_interrogacion' 'tk_dpuntos'
%left 'tk_or'
%left 'tk_and'
%left 'tk_diferente' 'tk_igual'
%left 'tk_menor_igual' 'tk_mayor_igual' 'tk_menor' 'tk_mayor'
%left 'tk_suma' 'tk_resta'
%left 'tk_por' 'tk_div'
%left UMENOS // precedencia creada para reconocer expresiones con número negativos y no exista conflicto con la resta
%left 'tk_pot'
%left 'tk_mod'
%right 'tk_not'

%start INICIO

%% 
// Producciones

INICIO : INSTRUCCIONES EOF {
    try {
        //$1.forEach((sentencia) => sentencia.Ejecutar());
    } catch (e) {
        //console.log(e);
        console.error(e.getMessage());
    }
    
};

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1.concat($2); } 
| INSTRUCCION {$$ = [$1] }
| error { errores.push(new ErrorSintactico(yytext, @1.first_line,@1.first_column)); }; 

INSTRUCCION : INSTRUCCION_PC tk_pycoma;

INSTRUCCION_PC : DECLARACION 
| ASIGNACION;

DECLARACION : TIPO_DATO LISTA_ID tk_igual EXPRESION
| TIPO_DATO LISTA_ID;

ASIGNACION : tk_arr val_variable tk_asignacion EXPRESION;

TIPO_DATO : tk_int
| tk_double 
| tk_boolean 
| tk_string
| tk_date
| tk_time;

LISTA_ID: LISTA_ID coma tk_arr val_variable
| tk_arr val_variable;
 
EXPRESION : EXPRESION tk_suma EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.SUMA)}
|EXPRESION tk_resta EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.RESTA)}
|EXPRESION tk_por EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MULTIPLICACION)}
|EXPRESION tk_div EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.DIVISION)}
|EXPRESION tk_pot EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.POTENCIA)}
|EXPRESION tk_mod EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MODULO)}
| tk_par1 EXPRESION tk_par2 {$$ = $2}
| VALOR
| CONDICION
;
/* Aplicamos las precedencias creadas con %prec */
VALOR : tk_resta EXPRESION %prec UMENOS {$$ = new Aritmetica(@2.first_line,@2.first_column,$2,null,TipoAritmetica.RESTA)}
| val_decimal { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.DECIMAL, $1)}
| val_entero { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.ENTERO, $1)}
;

CONDICION : EXPRESION tk_menor EXPRESION 
|  EXPRESION tk_mayor EXPRESION 
| EXPRESION tk_menor_igual EXPRESION 
| EXPRESION tk_mayor_igual EXPRESION 
| EXPRESION tk_igual tk_igual EXPRESION 
| EXPRESION tk_diferente EXPRESION 
| EXPRESION tk_and EXPRESION 
| EXPRESION tk_or EXPRESION
;

/*

INCREMENTO = val_variable tk_suma tk_suma;
DECREMENTO = val_variable tk_resta tk_resta;

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