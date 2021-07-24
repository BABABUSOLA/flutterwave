const Joi = require("joi");

exports.rule = async (req, res, next) => {
  
    const method = (value, helpers) => {

    const fields = value['rule']['field']
    const condition_rule = value['rule']['condition']
    const condition_value_rule = value['rule']['condition_value']

    // const field_value_rule  = value['rule']['field']
    const data  = value['data']
    // let original_field = field;
    field = fields.split(".")
    console.log(field,field[0],field.length,data[field[0]],data[field[0]][field[1]],'the field');

    let field_value = field.length === 1 ? field[0] : field[1];
    let data_value = field.length === 1 ? data[field[0]] : data[field[0]][field[1]]; 
    const validation_failed = {
        message: ` field ${field_value} validation failed`,
          status:"error",
          data:{
            validation: {
                error: true,
                field: fields,
                field_value: data_value,
                condition_rule:condition_rule,
                condition_value_rule: condition_value_rule
              }
          
          }
      }
    if(field.length == 1 &&( !data[field[0]] || data[field[0]] ==="undefined" )) {
        return res.status(400).json({validation_failed})
    }
    else if(field.length == 2 &&( !data[field[0]]|| !data[field[0]][field[1]])) {
        return res.status(400).json({validation_failed})
    }
    else {
        if(field.length > 2) {
            return res.status(400).json({validation_failed})
        }
    }
    

    // Replace value with a new value
    if (condition_rule === 'eq') {
        if(data_value !== condition_value_rule) {
            return res.status(400).json({validation_failed})
        }
    }
    if (condition_rule === 'neq') {
        if(data_value === condition_value_rule) {
            return res.status(400).json({validation_failed})
        }
    }
    if (condition_rule === 'gt') {
        if(data_value <= condition_value_rule) {
            return res.status(400).json({validation_failed})
        }
    }
    if (condition_rule === 'gte') {
        if(data_value < condition_value_rule) {
            return res.status(400).json({validation_failed})
        }
    }
    if (condition_rule === 'contains') {
        if(data_value.indexOf(condition_value_rule) === -1) {
            return res.status(400).json({validation_failed})
        }
    }

    // Return the value unchanged
    // return value;
    return res
      .status(200)
      .json({
        message: ` field ${fields} successfully validated`,
          status:"success",
          data:{
            validation: {
                error: false,
                field: fields,
                field_value: data_value,
                condition_rule:condition_rule,
                condition_value_rule: condition_value_rule
              }
          
          }
      });
};

  const schema = Joi.object({
    rule: Joi.object({
      field: Joi.string().required(),
      condition: Joi.string().valid('eq', 'neq', 'gt','gte','contains').required(),
      condition_value: Joi.number().required(),
    }).required(),
    data: Joi.alternatives()
    .try(
        Joi.object(), 
        Joi.array(), 
        Joi.string()
    )
    
    .required(),
  }).custom(method, 'custom validation')
  .required();


  try {
    const value = await schema.validateAsync(req.body);
    // schemaValidator(schema, body);
    return res.status(200).json({ value });
  } catch (err) {
    return res.status(400)
  }
};
