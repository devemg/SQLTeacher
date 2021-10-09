///configuraciones
%{
    const { Valor } = require('./AST/Expresiones/valor');
    const { Aritmetica } = require('./AST/Expresiones/aritmentica');
    const { TipoDato } = require('./AST/Expresiones/tipos/tipo-dato');
    const { TipoAritmetica } = require('./AST/Expresiones/tipos/tipo-operacion-aritmetica');
    const { ErrorLexico } = require('./AST/Errores/error-lexico');
    errores = [];
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
"**"                                                             return 'tk_pot';
"/"                                                             return 'tk_div';
"%"                                                             return 'tk_mod';
"("                                                             return 'tk_par1';
")"                                                             return 'tk_par2';
";"                                                             return 'tk_pycoma';
"::="                                                             return 'tk_asignacion';
/* PALABRAS RESERVADAS */
"null"                                                          return 'pr_null';
"int"                                                           return 'pr_int';
"double"                                                        return 'pr_double';
"boolean"                                                       return 'pr_boolean';
"string"                                                        return 'pr_string';
"date"                                                          return 'pr_date';
"time"                                                          return 'pr_time';

/* EXPRESIONES REGULARES */
[0-9]+("."[0-9]+)?                                            return 'val_decimal';
[0-9]+                                                      return 'val_entero';

<<EOF>>                                                         return 'EOF';

.                           { errores.push(new ErrorLexico(yytext, yylloc.first_line, yylloc.first_column)); }

/lex


%left 'tk_suma' 'tk_resta'
%left 'tk_por' 'tk_div'
%left 'tk_pot'
%left 'tk_mod'

%start INICIO

%% 
// Producciones

INICIO : EXPRESION EOF {
    try {
        console.log('valor: ', $1.getValor());
    } catch (e) {
        console.log(e);
        console.error(e.getMessage());
    }
}; 

EXPRESION : EXPRESION tk_suma EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.SUMA)}
|EXPRESION tk_resta EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.RESTA)}
|EXPRESION tk_por EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MULTIPLICACION)}
|EXPRESION tk_div EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.DIVISION)}
|EXPRESION tk_pot EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.POTENCIA)}
|EXPRESION tk_mod EXPRESION { $$ = new Aritmetica(@2.first_line,@2.first_column,$1,$3,TipoAritmetica.MODULO)}
| tk_par1 EXPRESION tk_par2 {$$ = $2}
| VALOR {$$ = $1;}; 

VALOR : 
| tk_resta EXPRESION {$$ = $2}
| val_decimal { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.DECIMAL, $1)}
| val_entero { $$ = new Valor(@1.first_line,@1.first_column,TipoDato.ENTERO, $1)}
;


/*INSTRUCCIONES EOF {
    //$1.forEach((sentencia) => sentencia.Ejecutar());
};

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $$ = $1.concat($2); } 
| INSTRUCCION {$$ = [$1] }
| error {console.log('Error Sintáctico con ', yytext); }; 

INSTRUCCION: val_id { console.log($1); };
*/
/*

INSTRUCCION : DECLARACION 
| 

DECLARACION : TIPO_DATO LISTA_ID igual EXPRESION tk_pycoma
| TIPO_DATO LISTA_ID tk_pycoma;

ASIGNACION : val_variable tk_asignacion EXPRESION;



VALOR : DECIMAL { $$ = $1; }
| ENTERO { $$ = $1; }
| INCREMENTO
| DECREMENTO
;


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