const affiliateOverview = require('./schemaTypes/documents/affiliate/affiliate-overview.ts');
const affiliateCampaign = require('./schemaTypes/documents/affiliate/affiliate-campaign.ts');
const affiliateCommission = require('./schemaTypes/documents/affiliate/affiliate-commission.ts');
const affiliateRefferedUser = require('./schemaTypes/documents/affiliate/affiliate-reffered-user.ts');
const affiliateFaq = require('./schemaTypes/documents/affiliate/affiliate-faq.ts');

console.log('Schema Comparison');
console.log('================');

// Extract field names from each schema
function getFieldNames(schema) {
  if (!schema || !schema.default || !schema.default.fields) {
    return [];
  }
  return schema.default.fields.map(f => f.name);
}

const schemas = {
  'affiliateOverview': getFieldNames(affiliateOverview),
  'affiliateCampaign': getFieldNames(affiliateCampaign),
  'affiliateCommission': getFieldNames(affiliateCommission),
  'affiliateRefferedUser': getFieldNames(affiliateRefferedUser),
  'affiliateFaq': getFieldNames(affiliateFaq),
};

Object.entries(schemas).forEach(([name, fields]) => {
  console.log(`\n${name}:`);
  console.log(fields.join(', '));
});
