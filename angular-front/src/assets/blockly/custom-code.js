  Blockly.JavaScript['comodin'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '*';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['new_instancia'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'new '+text_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['fecha'] = function(block) {
    var number_year = block.getFieldValue('year');
    var number_month = block.getFieldValue('month');
    var number_day = block.getFieldValue('day');
    // TODO: Assemble JavaScript into code variable.
    var code = '\''+number_year+'-'+number_month+'-'+number_day+'\'';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['hora'] = function(block) {
    var number_horas = block.getFieldValue('horas');
    var number_minutos = block.getFieldValue('minutos');
    var number_segundos = block.getFieldValue('segundos');
    // TODO: Assemble JavaScript into code variable.
    var code = '\''+number_horas+':'+number_minutos+':'+number_segundos+'\'';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };


  Blockly.JavaScript['campo'] = function(block) {
    var text_valor = block.getFieldValue('valor');
    // TODO: Assemble JavaScript into code variable.
    var code = text_valor;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['use'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'USE '+value_name+';\n';
    return code;
  };

  Blockly.JavaScript['insert_normal'] = function(block) {
    var value_tabla = Blockly.JavaScript.valueToCode(block, 'tabla', Blockly.JavaScript.ORDER_ATOMIC);
    var value_valores = Blockly.JavaScript.valueToCode(block, 'valores', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    value_valores=formatearListaInsert(value_valores);
    var code = 'INSERT INTO '+value_tabla+' VALUES ('+value_valores+');\n';
    return code;
  };
  

  Blockly.JavaScript['select'] = function(block) {
    var value_expresion = Blockly.JavaScript.valueToCode(block, 'expresion', Blockly.JavaScript.ORDER_ATOMIC);
    var value_tabla = Blockly.JavaScript.valueToCode(block, 'tabla', Blockly.JavaScript.ORDER_ATOMIC);
    var value_where = Blockly.JavaScript.valueToCode(block, 'where', Blockly.JavaScript.ORDER_ATOMIC);
    var value_order = Blockly.JavaScript.valueToCode(block, 'order', Blockly.JavaScript.ORDER_ATOMIC);
    var value_limit = Blockly.JavaScript.valueToCode(block, 'limit', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'SELECT '+value_expresion+' FROM '+value_tabla;
    if(value_where!=''){
      code += ' WHERE '+value_where;
    }
    if(value_order!=''){
      value_order=formatearListaInsert(value_order);
      code += ' ORDER BY '+value_order;
    }
    if(value_limit!=''){
      code += ' LIMIT '+value_limit;
    }
    return code+';\n';
  };


Blockly.JavaScript['update'] = function(block) {
  var value_tabla = Blockly.JavaScript.valueToCode(block, 'tabla', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_asignaciones = Blockly.JavaScript.statementToCode(block, 'asignaciones');
  var value_where = Blockly.JavaScript.valueToCode(block, 'where', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code="";
  var lista =statements_asignaciones.split(';\n');
  var asignaciones="";
  lista.forEach(element => {
    if(element!=""){
      if(asignaciones!=""){
        asignaciones+=",";
      }
      asignaciones+=element.replace(" ","");
    }
  });
  if(value_where==''){
    code = 'UPDATE '+value_tabla+' SET '+asignaciones+';\n';
  }else{
    code = 'UPDATE '+value_tabla+' SET '+asignaciones+' WHERE '+value_where+';\n';
  }
  return code;
};

Blockly.JavaScript['delete'] = function(block) {
  var value_tabla = Blockly.JavaScript.valueToCode(block, 'tabla', Blockly.JavaScript.ORDER_ATOMIC);
  var value_where = Blockly.JavaScript.valueToCode(block, 'where', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  if(value_where==''){
    code = 'DELETE FROM '+value_tabla+';\n';
  }else{
    code = 'DELETE FROM '+value_tabla+' WHERE '+value_where+';\n';
  }
  return code;
};

Blockly.JavaScript['insert_especial'] = function(block) {
  var value_tabla = Blockly.JavaScript.valueToCode(block, 'tabla', Blockly.JavaScript.ORDER_ATOMIC);
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var value_valores = Blockly.JavaScript.valueToCode(block, 'valores', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_valores=formatearListaInsert(value_valores);
  value_name=formatearListaInsert(value_name);
  var code = 'INSERT INTO '+value_tabla+' ('+value_name+') VALUES ('+value_valores+');\n';
  return code;
};

Blockly.JavaScript['asignacion'] = function(block) {
  var value_access = Blockly.JavaScript.valueToCode(block, 'access', Blockly.JavaScript.ORDER_ATOMIC);
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_access+'='+value_name+';\n';
  return code;
};

Blockly.JavaScript['acceso'] = function(block) {
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  var value_campo = Blockly.JavaScript.valueToCode(block, 'campo', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_variable+'.'+value_campo;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variable'] = function(block) {
  var text_valor = block.getFieldValue('valor');
  // TODO: Assemble JavaScript into code variable.
  var code = '@'+text_valor;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['campo'] = function(block) {
  var text_valor = block.getFieldValue('valor');
  // TODO: Assemble JavaScript into code variable.
  var code = text_valor;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['acceso_arreglo'] = function(block) {
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_variable+'['+value_valor+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['delete_collections'] = function(block) {
  var value_acceso = Blockly.JavaScript.valueToCode(block, 'acceso', Blockly.JavaScript.ORDER_ATOMIC);
  var value_tabla = Blockly.JavaScript.valueToCode(block, 'tabla', Blockly.JavaScript.ORDER_ATOMIC);
  var value_where = Blockly.JavaScript.valueToCode(block, 'where', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  if(value_where==''){
    code = 'DELETE '+value_acceso+' FROM '+value_tabla+';\n';
  }else{
    code = 'DELETE '+value_acceso+' FROM '+value_tabla+' WHERE '+value_where+';\n';
  }
  return code;
};

Blockly.JavaScript['in_list'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_name=formatearListaInsert(value_name);
  var code = text_name+' IN '+value_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['orderby'] = function(block) {
  var text_campo = block.getFieldValue('campo');
  var dropdown_ascdes = block.getFieldValue('ascdes');
  // TODO: Assemble JavaScript into code variable.
  var code = text_campo+' '+dropdown_ascdes;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mi_texto'] = function(block) {
  var text_text = block.getFieldValue('TEXT');
  // TODO: Assemble JavaScript into code variable.
  var code = '\"'+text_text+'\"';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['op_aritmetica'] = function(block) {
  // Basic arithmetic operators, and power.
  var b = {
    'MAS': [' + ', Blockly.JavaScript.ORDER_ADDITION],
    'MENOS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
    'POR': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
    'DIV': [' / ', Blockly.JavaScript.ORDER_DIVISION],
    'POW': ['**', Blockly.JavaScript.ORDER_MULTIPLICATION] ,
    'MOD': ['%', Blockly.JavaScript.ORDER_MULTIPLICATION] 
  }
  [block.getFieldValue("OP")],c=b[0];
  b=b[1];
  var d=Blockly.JavaScript.valueToCode(block,"A",b)||"0";
  block=Blockly.JavaScript.valueToCode(block,"B",b)||"0";
  var code=[d+c+block,b]
  return code;
};


Blockly.JavaScript['declaracion'] = function(block) {
  var dropdown_tipodato = block.getFieldValue('tipoDato');
  var text_nombre = block.getFieldValue('nombre');
  var value_expresion = Blockly.JavaScript.valueToCode(block, 'expresion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var expresion ='';
  if(value_expresion!=""){
    expresion='='+value_expresion;
  }
  var code = dropdown_tipodato+' @'+text_nombre+expresion+';\n';
  return code;
};

Blockly.JavaScript['declaracion2'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_nombre = block.getFieldValue('nombre');
  var value_expresion = Blockly.JavaScript.valueToCode(block, 'expresion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var expresion ='';
  if(value_expresion!=""){
    expresion='='+value_expresion;
  }
  var code = text_name+' @'+text_nombre+expresion+';\n';
  return code;
};

Blockly.JavaScript['mi_if'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
  // TODO: Assemble JavaScript into code variable.
  var code = 'if('+value_condicion+'){\n'+statements_name+'}\n';
  if(statements_else!=''){
    code+='else {\n'+statements_else+'}\n';
  }
  return code;
};

Blockly.JavaScript['mi_switch'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_cases = Blockly.JavaScript.statementToCode(block, 'cases');
  // TODO: Assemble JavaScript into code variable.
  var code = 'switch('+value_name+'){\n'+statements_cases+'}\n';
  return code;
};

Blockly.JavaScript['case'] = function(block) {
  var value_valor = Blockly.JavaScript.valueToCode(block, 'valor', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'case '+value_valor+':\n'+'{\n'+statements_name+'\}';
  return code;
};

Blockly.JavaScript['default'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'default:{\n'+statements_name+'\n}\n';
  return code;
};

Blockly.JavaScript['break'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'break;\n';
  return code;
};

Blockly.JavaScript['while'] = function(block) {
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_sentencia = Blockly.JavaScript.statementToCode(block, 'sentencia');
  // TODO: Assemble JavaScript into code variable.
  var code = 'while('+value_condicion+'){\n'+statements_sentencia+'}\n';
  return code;
};

Blockly.JavaScript['do_while'] = function(block) {
  var statements_sentencias = Blockly.JavaScript.statementToCode(block, 'sentencias');
  var value_condicion = Blockly.JavaScript.valueToCode(block, 'condicion', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'do {\n'+statements_sentencias+'}while('+value_condicion+');\n';
  return code;
};

Blockly.JavaScript['mi_for'] = function(block) {
  var text_asignacion = block.getFieldValue('asignacion');
  var text_condicion = block.getFieldValue('condicion');
  var text_modificador = block.getFieldValue('modificador');
  var statements_sentencias = Blockly.JavaScript.statementToCode(block, 'sentencias');
  // TODO: Assemble JavaScript into code variable.
  var code = 'for('+text_asignacion+';'+text_condicion+';'+text_modificador+'){\n'+statements_sentencias+'}\n';
  return code;
};

Blockly.JavaScript['llamada_funcion'] = function(block) {
  var text_nombre = block.getFieldValue('nombre');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_name=formatearListaInsert(value_name);
  var code = text_nombre+'('+value_name+');\n';
  return code;
};

Blockly.JavaScript['llamada_proc'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_name=formatearListaInsert(value_name);
  var code = 'call '+text_name+'('+value_name+');\n';
  return code;
};

Blockly.JavaScript['log'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'log('+value_name+');\n';
  return code;
};

Blockly.JavaScript['mycond'] = function(block) {
  var value_izq = Blockly.JavaScript.valueToCode(block, 'izq', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_der = Blockly.JavaScript.valueToCode(block, 'der', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_izq+" "+dropdown_op+" "+value_der;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['parentesis'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '('+value_name+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['instancia_objeto'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var text_obj = block.getFieldValue('obj');
  // TODO: Assemble JavaScript into code variable.
  value_name=formatearListaInsert(value_name);
  var code = '{'+value_name+'} as '+text_obj;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['llamada_funcion_op'] = function(block) {
  var text_nombre = block.getFieldValue('nombre');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  value_name=formatearListaInsert(value_name);
  var code = text_nombre+'('+value_name+')';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

//****************************************************************************************************/
function formatearListaInsert(value_valores){
  value_valores=value_valores.replace('[','');
  value_valores=value_valores.replace(']','');
  return value_valores;
}