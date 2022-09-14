exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  allowedFields.forEach((field) => {
    if (allowedFields.includes(field)) newObj[field] = obj[field];
  });

  return newObj;
};
