
export const ToolIntermediateBoxBlockly=`<xml id="toolbox" style="display: none">
<category name="Variables" colour="20">
<block type="declaracion"></block>
<block type="declaracion2"></block>
</category>
<category name="Sent. Control" colour="120">
<block type="mi_if"></block>
<block type="asignacion"></block>
<block type="mi_switch"></block>
<block type="case"></block>
<block type="default"></block>
<block type="break"></block>
</category>
<category name="Ciclos" colour="65">
<block type="while"></block>
<block type="do_while"></block>
<block type="mi_for"></block>
</category>

<category name="Procedimientos" colour="260">
<block type="llamada_funcion"></block>
<block type="llamada_proc"></block>
<block type="log"></block>
</category>

<category name="Sentencias" colour="330">
  <block type="insert_normal"></block>
  <block type="use"> </block>
  <block type="select"></block>
  <block type="insert_especial"></block>
  <block type="insert_normal"></block>
  <block type="update"></block>
  <block type="delete"></block>
  <block type="delete_collections"></block>
</category>

<category name="Operadores" colour="210" >
  <block type="op_aritmetica">
      <field name="OP">MAS</field>
    </block>
    <block type="mycond">
    <field name="OP">></field>
  </block>
<block type="logic_operation">
  <field name="OP">AND</field>
</block>
<block type="logic_negate"/>
</category>

<category name="Valores" colour="160" >
 <block type="math_number">
  <field name="NUM">0</field>
</block>
<block type="fecha">
  <field name="year">2019</field>
  <field name="month">12</field>
  <field name="day">1</field>
</block>
<block type="logic_boolean">
  <field name="BOOL">TRUE</field>
</block>
<block type="hora">
  <field name="horas">12</field>
  <field name="minutos">0</field>
  <field name="segundos">0</field>
</block>
<block type="logic_null"></block>
<block type="mi_texto">
  <field name="TEXT"/>
</block>
<block type="lists_create_with">
  <mutation items="3"/>
</block>
<block type="parentesis"></block>
<block type="variable"></block>
<block type="campo"></block>
<block type="acceso"></block>
<block type="orderby"></block>
<block type="acceso_arreglo"></block>
<block type="llamada_funcion_op"></block>
<block type="new_instancia">
    <field name="NAME">default</field>
</block>

<block type="in_list"></block>
<block type="comodin"/>
</category>
</xml>`;