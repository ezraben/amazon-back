const Joi = require("joi");

const productIdRole = {
  id: Joi.string().min(1).trim().alphanum(),
};
const productNameRole = {
  productName: Joi.string().min(2).max(255).trim().alphanum().required(),
};

const productPriceRole = {
  productPrice: Joi.number().min(0).max(10000).required(),
};
const categoryRole = {
  category: Joi.string().min(2).max(255).trim().alphanum().required(),
};

const productCreatorRole = {
  productCreator: Joi.string().email().min(6).max(255).trim().required(),
};

const addProductSchema = Joi.object({
  ...productNameRole,
  ...productPriceRole,
  ...categoryRole,
  ...productCreatorRole,
  //   ...isAdminRole,
});
const editProductSchema = Joi.object({
  ...productIdRole,
  ...productNameRole,
  ...productPriceRole,
  ...categoryRole,
  ...productCreatorRole,
  //
});

// const validateAddProductSchema = await addProductSchema.validateAsync({ data });

const validateAddProductSchema = async (data) => {
  try {
    return await addProductSchema.validateAsync(data, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

const validateEditProductSchema = async (data) => {
  try {
    return await editProductSchema.validateAsync(data, { abortEarly: false });
  } catch (err) {
    return err;
  }
};

module.exports = { validateAddProductSchema, validateEditProductSchema };
