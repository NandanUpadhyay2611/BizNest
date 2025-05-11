function buildMongoQueryFromRules(rules) {
    if (!rules) return {};
    if (rules.type === 'group') {
      const subQueries = rules.children.map(buildMongoQueryFromRules);
      return rules.operator === 'AND'
        ? { $and: subQueries }
        : { $or: subQueries };
    } else {
      // Leaf node: single condition
      const { field, operator, value } = rules;
  
      // Check if the field is a date field
      const isDateField = field === 'lastActive'; // Add more fields if needed
  
      let queryValue = value;
      if (isDateField) {
        queryValue = new Date(value); // Parse to JS Date
      } else if (['spend', 'visits'].includes(field)) {
        queryValue = Number(value);
      }
  
      switch (operator) {
        case '>': return { [field]: { $gt: queryValue } };
        case '<': return { [field]: { $lt: queryValue } };
        case '=': return { [field]: queryValue };
        case '>=': return { [field]: { $gte: queryValue } };
        case '<=': return { [field]: { $lte: queryValue } };
        default: return {};
      }
    }
  }

  export default buildMongoQueryFromRules;
  