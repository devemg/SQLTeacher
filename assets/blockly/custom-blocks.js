  Blockly.Blocks['comodin'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("*");
      this.setOutput(true, "comodin");
      this.setColour(210);
   this.setTooltip("Comodín \"todos\"");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['new_instancia'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("new ")
          .appendField(new Blockly.FieldTextInput("default"), "NAME");
      this.setOutput(true, "new");
      this.setColour(230);
   this.setTooltip("Crea una nueva instancia de un objeto o Collection");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['fecha'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Date: ")
          .appendField(new Blockly.FieldNumber(2019, 0, 3000), "year")
          .appendField("-")
          .appendField(new Blockly.FieldNumber(12, 1, 12), "month")
          .appendField("-")
          .appendField(new Blockly.FieldNumber(1, 0, 31), "day");
      this.setOutput(true, "date");
      this.setColour(230);
   this.setTooltip("Fecha");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['hora'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Time: ")
          .appendField(new Blockly.FieldNumber(12, 0, 23), "horas")
          .appendField(":")
          .appendField(new Blockly.FieldNumber(0, 0, 59), "minutos")
          .appendField(":")
          .appendField(new Blockly.FieldNumber(0, 0, 59), "segundos");
      this.setOutput(true, "time");
      this.setColour(230);
   this.setTooltip("Time");
   this.setHelpUrl("");
    }
  };
 
  Blockly.Blocks['campo'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("campo"), "valor");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("campo");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['use'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("campo")
          .appendField("USE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Sentencia USE");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['insert_normal'] = {
    init: function() {
      this.appendValueInput("tabla")
          .setCheck("campo")
          .appendField("INSERT INTO");
      this.appendValueInput("valores")
          .setCheck("Array")
          .appendField("VALUES");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['insert_especial'] = {
    init: function() {
      this.appendValueInput("tabla")
          .setCheck("campo")
          .appendField("INSERT INTO");
      this.appendValueInput("NAME")
          .setCheck(["variable", "Array"])
          .appendField("(");
      this.appendDummyInput()
          .appendField(")");
      this.appendValueInput("valores")
          .setCheck(null)
          .appendField("VALUES");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Sentencia INSERT especial");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['select'] = {
    init: function() {
      this.appendValueInput("expresion")
          .setCheck(null)
          .appendField("SELECT");
      this.appendValueInput("tabla")
          .setCheck("campo")
          .appendField("FROM");
      this.appendValueInput("where")
          .setCheck("Boolean")
          .appendField("WHERE");
      this.appendValueInput("order")
          .setCheck(["orderby", "Array"])
          .appendField("ORDER BY");
      this.appendValueInput("limit")
          .setCheck(null)
          .appendField("LIMIT");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Sentencias SELECT");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['update'] = {
    init: function() {
      this.appendValueInput("tabla")
          .setCheck("campo")
          .appendField("UPDATE");
      this.appendStatementInput("asignaciones")
          .setCheck("asignacion")
          .appendField("SET");
      this.appendValueInput("where")
          .setCheck("Boolean")
          .appendField("WHERE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Sentencia UPDATE");
   this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['delete'] = {
    init: function() {
      this.appendValueInput("tabla")
          .setCheck("campo")
          .appendField("DELETE FROM");
      this.appendValueInput("where")
          .setCheck("Boolean")
          .appendField("WHERE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Sentencia DELETE");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['acceso'] = {
    init: function() {
      this.appendValueInput("variable")
          .setCheck(["campo", "variable"]);
      this.appendValueInput("campo")
          .setCheck(["acceso", "campo"])
          .appendField(".");
      this.setInputsInline(true);
      this.setOutput(true, "acceso");
      this.setColour(230);
   this.setTooltip("Acceso");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['variable'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("@ ")
          .appendField(new Blockly.FieldTextInput("variable"), "valor");
      this.setOutput(true, "variable");
      this.setColour(230);
   this.setTooltip("Variable");
   this.setHelpUrl("");
    }
  };



  Blockly.Blocks['asignacion'] = {
    init: function() {
      this.appendValueInput("access")
          .setCheck(["acceso", "variable"]);
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("=");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Sentencia de asignación");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['acceso_arreglo'] = {
    init: function() {
      this.appendValueInput("variable")
          .setCheck(["variable", "campo", "acceso"]);
      this.appendValueInput("valor")
          .setCheck(null)
          .appendField("[");
      this.appendDummyInput()
          .appendField("]");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("Instrucción para acceder al elemento de un arreglo");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['delete_collections'] = {
    init: function() {
      this.appendValueInput("acceso")
          .setCheck("acceso_arreglo")
          .appendField("DELETE ");
      this.appendValueInput("tabla")
          .setCheck("campo")
          .appendField("FROM");
      this.appendValueInput("where")
          .setCheck("Boolean")
          .appendField("WHERE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("Sentencia DELETE");
   this.setHelpUrl("");
    }
  };
 
  Blockly.Blocks['in_list'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(" ")
          .appendField(new Blockly.FieldTextInput("campo"), "NAME");
      this.appendValueInput("NAME")
          .setCheck(["variable", "Array", "acceso", "campo"])
          .appendField("IN");
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setColour(230);
   this.setTooltip("Variable en lista");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['orderby'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("Campo"), "campo")
          .appendField(new Blockly.FieldDropdown([["ASC","asc"], ["DESC","desc"]]), "ascdes");
      this.setOutput(true, "orderby");
      this.setColour(230);
   this.setTooltip("campo para Order By");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mi_texto'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("\"")
          .appendField(new Blockly.FieldTextInput("    "), "TEXT");
      this.appendDummyInput()
          .appendField("\"");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(160);
   this.setTooltip("Texto");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['op_aritmetica'] = {
    init: function() {
      this.appendValueInput("A")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["+","MAS"], ["-","MENOS"], ["*","POR"], ["/","DIV"], ["**","POW"], ["%","MOD"]]), "OP");
      this.appendValueInput("B")
          .setCheck(null);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['declaracion'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["int","int"], ["double","double"], ["string","string"], ["boolean","boolean"], ["date","date"], ["time","time"]]), "tipoDato");
      this.appendDummyInput()
          .appendField(" @")
          .appendField(new Blockly.FieldTextInput("valor"), "nombre");
      this.appendValueInput("expresion")
          .setCheck(null)
          .appendField(" = ");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
   this.setTooltip("Sentencia de declaración");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mi_if'] = {
    init: function() {
      this.appendValueInput("condicion")
          .setCheck("Boolean")
          .appendField("If    (");
      this.appendDummyInput()
          .appendField(")");
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.appendStatementInput("else")
          .setCheck(null)
          .appendField("else");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Sentencia If");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mi_switch'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Switch(");
      this.appendDummyInput()
          .appendField(")");
      this.appendStatementInput("cases")
          .setCheck("case");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Sentencia Switch");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['case'] = {
    init: function() {
      this.appendValueInput("valor")
          .setCheck(null)
          .appendField("case ");
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, ["switch", "case"]);
      this.setNextStatement(true, "case");
      this.setColour(120);
   this.setTooltip("Sentencia Switch-case");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['default'] = {
    init: function() {
      this.appendStatementInput("NAME")
          .setCheck(null)
          .appendField("default");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Instrucción default");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['break'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Break");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Sentencia Break");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['while'] = {
    init: function() {
      this.appendValueInput("condicion")
          .setCheck("Boolean")
          .appendField("while(");
      this.appendDummyInput()
          .appendField(")");
      this.appendStatementInput("sentencia")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['do_while'] = {
    init: function() {
      this.appendStatementInput("sentencias")
          .setCheck(null);
      this.appendValueInput("condicion")
          .setCheck("Boolean")
          .appendField("while(");
      this.appendDummyInput()
          .appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
   this.setTooltip("Ciclo do-while");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mi_for'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("For  ")
          .appendField(new Blockly.FieldTextInput("int @var=0"), "asignacion");
      this.appendDummyInput()
          .appendField(";")
          .appendField(new Blockly.FieldTextInput("@var<10"), "condicion");
      this.appendDummyInput()
          .appendField(";")
          .appendField(new Blockly.FieldTextInput("@var++"), "modificador");
      this.appendStatementInput("sentencias")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
   this.setTooltip("Ciclo for");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['llamada_funcion'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("saludar"), "nombre")
          .appendField(" (");
      this.appendValueInput("NAME")
          .setCheck("Array");
      this.appendDummyInput()
          .appendField(" )");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
   this.setTooltip("Llamada a función");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['llamada_proc'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("Array")
          .appendField("call ")
          .appendField(new Blockly.FieldTextInput("default"), "NAME")
          .appendField(" (");
      this.appendDummyInput()
          .appendField(" )");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
   this.setTooltip("Llamada a procedimiento");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['log'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("Log  (");
      this.appendDummyInput()
          .appendField(" ) ");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(260);
   this.setTooltip("Sentencia LOG");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['mycond'] = {
    init: function() {
      this.appendValueInput("izq")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["<","<"], ["<=","<="], [">",">"], [">=",">="], ["==","=="], ["!=","!="]]), "OP");
      this.appendValueInput("der")
          .setCheck(null);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("Comparación");
   this.setHelpUrl("");
    }
  };

Blockly.Blocks['parentesis'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("(");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("Parentesis");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['declaracion2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("objeto"), "NAME");
    this.appendDummyInput()
        .appendField(" @")
        .appendField(new Blockly.FieldTextInput("valor"), "nombre");
    this.appendValueInput("expresion")
        .setCheck(null)
        .appendField(" = ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("Sentencia de declaración");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['instancia_objeto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("{");
    this.appendValueInput("NAME")
        .setCheck("Array");
    this.appendDummyInput()
        .appendField("}")
        .appendField("as");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("objeto"), "obj");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("Instancia de objeto");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['llamada_funcion_op'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("saludar"), "nombre")
        .appendField(" (");
    this.appendValueInput("NAME")
        .setCheck("Array");
    this.appendDummyInput()
        .appendField(" )");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(260);
 this.setTooltip("Llamada a función");
 this.setHelpUrl("");
  }
};