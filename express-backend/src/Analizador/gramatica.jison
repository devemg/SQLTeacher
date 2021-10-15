///configuraciones
%{
    const { Valor } = require('./AST/Expresiones/valor');
    const { Aritmetica } = require('./AST/Expresiones/aritmentica');
    const { LogicaRelacional } = require('./AST/Expresiones/logica-relacional');
    const { TipoDato } = require('./AST/Expresiones/tipos/tipo-dato');
    const { TipoAritmetica } = require('./AST/Expresiones/tipos/tipo-operacion-aritmetica');
    const { TipoLogicaRelacional } = require('./AST/Expresiones/tipos/tipo-operacion-logica-relacional');
    const { ErrorLexico } = require('./AST/Errores/error-lexico');
    const { ErrorSintactico } = require('./AST/Errores/error-sintactico');
    const { Asignacion } = require('./AST/Sentencias/asignacion');
    const { Declaracion } = require('./AST/Sentencias/declaracion');
    
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
        $1.forEach((sentencia) => sentencia.Ejecutar());
    } catch (e) {
        //console.log(e);
        console.error(e.getMessage());
    }
    
}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1.concat($2); } 
| INSTRUCCION {$$ = [$1] }
| error { errores.push(new ErrorSintactico(yytext, @1.first_line,@1.first_column)); }
; 

INSTRUCCION : INSTRUCCION_PC tk_pycoma {$$ = $1};

INSTRUCCION_PC : DECLARACION {$$ = $1}
| ASIGNACION  {$$ = $1}
;

DECLARACION : TIPO_DATO LISTA_ID tk_igual EXPRESION
    {$$ = new Declaracion($1, $2, $4, @3.first_line,@3.first_column); }
| TIPO_DATO LISTA_ID {$$ = new Declaracion($1, $2, null, @1.first_line,@1.first_column); };

ASIGNACION : tk_arr val_variable tk_asignacion EXPRESION 
    {$$ = new Asignacion($2, $4, @1.first_line,@1.first_column); }
;

TIPO_DATO : tk_int {$$ = TipoDato.ENTERO; }
| tk_double {$$ = TipoDato.DECIMAL; }
| tk_boolean {$$ = TipoDato.BOOLEANO; }
| tk_string {$$ = TipoDato.CADENA; }
| tk_date {$$ = TipoDato.FECHA; }
| tk_time {$$ = TipoDato.HORA; }
;

LISTA_ID: LISTA_ID coma tk_arr val_variable {$$ = $1.concat($4);}
| tk_arr val_variable {$$ = [$2]; }
;
 
EXPRESION : EXPRESION tk_suma EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.SUMA)}
|EXPRESION tk_resta EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.RESTA)}
|EXPRESION tk_por EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MULTIPLICACION)}
|EXPRESION tk_div EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.DIVISION)}
|EXPRESION tk_pot EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.POTENCIA)}
|EXPRESION tk_mod EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MODULO)}
| tk_par1 EXPRESION tk_par2 {$$ = $2}
| VALOR {$$ = $2}
| CONDICION {$$ = $2}
;
/* Aplicamos las precedencias creadas con %prec */
VALOR : tk_resta EXPRESION %prec UMENOS {$$ = new Aritmetica(@2.first_line,@2.first_column,$2,null,TipoAritmetica.RESTA)}
| val_decimal { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.DECIMAL, $1)}
| val_entero { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.ENTERO, $1)}
;

CONDICION : EXPRESION tk_menor EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MENOR)}
|  EXPRESION tk_mayor EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MAYOR)}
| EXPRESION tk_menor_igual EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MENOR_IGUAL)}
| EXPRESION tk_mayor_igual EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.MAYOR_IGUAL)}
| EXPRESION tk_igual tk_igual EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.IGUAL)}
| EXPRESION tk_diferente EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.DIFERENTE)}
| EXPRESION tk_and EXPRESION 
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.AND)}
| EXPRESION tk_or EXPRESION
    { $$ = new LogicaRelacional(@2.first_line,@2.first_column,$1,$3,TipoLogicaRelacional.OR)}
;
// pendiente implementar or

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