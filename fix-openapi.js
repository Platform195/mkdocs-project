const fs = require('fs');
const spec = JSON.parse(fs.readFileSync('openapi.json', 'utf8'));

spec.servers = [{ url: 'https://app.uplifthub.io/P195_Exposed_Integrations/rest/V1' }];

const tagMap = {
  'Account':      'Accounts',
  'Campaign':     'Campaigns',
  'LineItem':     'Line Items',
  'Product':      'Products',
  'DocumentType': 'Documents',
  'SourceMarket': 'Source Markets',
  'Reporting':    'Reporting',
  'SYS_':         'System',
};

const summaryMap = {
  'CreateAccount':                  'Create Account',
  'UpdateAccount':                  'Update Account',
  'ListAccounts':                   'List Accounts',
  'ListAccountTypes':               'List Account Types',
  'CreateCampaign':                 'Create Campaign',
  'UpdateCampaign':                 'Update Campaign',
  'ListCampaigns':                  'List Campaigns',
  'ListCampaignStatues':            'List Campaign Statuses',
  'CreateLineItem':                 'Create Line Item',
  'UpdateLineItem':                 'Update Line Item',
  'ListLineItems':                  'List Line Items',
  'ListLineItemStatuses':           'List Line Item Statuses',
  'CreateProduct':                  'Create Product',
  'UpdateProduct':                  'Update Product',
  'ListProducts':                   'List Products',
  'ListProductChannels':            'List Product Channels',
  'ListProductPlatforms':           'List Product Platforms',
  'CreateCampaignDocument':         'Create Campaign Document',
  'CreateDocumentType':             'Create Document Type',
  'ListDocumentTypes':              'List Document Types',
  'ListSourceMarket':               'List Source Markets',
  'Reporting':                      'Run Report',
  'SYS_CreateCampaignNotification': 'Create Campaign Notification',
};

// Valid values for ReportingRequest.Columns, with human-readable descriptions.
// IMPORTANT: reporting is at LINE ITEM level — every row returned is a single
// line item, and every column describes that line item or the campaign/account/
// product it belongs to (e.g. client_id is the client of THIS line item, not a
// separate entity). Descriptions are drafted from field names/sample data —
// validate against actual business meaning before relying on them.
const columnDescriptions = {
  line_item_id:                      'Unique numeric ID of this line item.',
  client_id:                         'Unique numeric ID of the client associated with this line item.',
  account_id:                        'Unique numeric ID of the account (partner) associated with this line item.',
  campaign_id:                       'Unique numeric ID of the campaign this line item belongs to.',
  product_id:                        'Unique numeric ID of the product booked on this line item.',
  line_item_name:                    'Display name of this line item.',
  assignees:                         'JSON string array of users assigned to this line item, each with `name` and `role`.',
  partner_discount:                  'Discount percentage applied to the partner rate on this line item.',
  quantity:                          'Number of units/placements booked on this line item.',
  partner_rate:                      'Rate charged to the partner for this line item.',
  fulfillment_cost:                  'Internal cost to fulfil this line item.',
  line_item_budget:                  'Total budget allocated to this line item.',
  line_item_fulfillment:             'Amount fulfilled against this line item\'s budget so far.',
  media_cost:                        'Media cost associated with this line item, if applicable.',
  ecpm:                              'Effective cost per mille (CPM) for this line item, if applicable.',
  line_item_status:                  'Current status label of this line item (e.g. Complete, Live).',
  start_date:                        'Start date of this line item.',
  end_date:                          'End date of this line item.',
  product_name:                      'Name of the product booked on this line item.',
  source_market:                     'Name of the source market the parent campaign originates from.',
  source_market_abbreviation:        'Abbreviation of the source market the parent campaign originates from.',
  product_description:               'Description of the product booked on this line item.',
  platform:                          'Platform this line item runs on (e.g. On-Site).',
  channel:                           'Channel of the product booked on this line item.',
  format_aspect:                     'Ad format/aspect spec for the product booked on this line item.',
  cost_basis_id:                     'ID of the cost basis used to price the product on this line item (e.g. CPM, flat fee).',
  rate_card:                         'Standard rate card price for the product booked on this line item.',
  minimum_partner_budget:            'Minimum partner budget required for the product booked on this line item.',
  mark_up:                           'Whether a mark-up is applied to the product on this line item.',
  mark_up_value:                     'Mark-up percentage/value applied on this line item, if any.',
  source_market_id:                  'Unique numeric ID of the source market the parent campaign originates from.',
  campaign_name:                     'Display name of the campaign this line item belongs to.',
  campaign_type:                     'Type of the campaign this line item belongs to (e.g. Custom Campaign).',
  campaign_managers_id:              'ID of the campaign manager assigned to the parent campaign.',
  package:                           'Name of the package the parent campaign/line item belongs to, if part of a package deal.',
  package_fixed_commitment_total:    'Total fixed commitment value for the package, if this line item is part of one.',
  package_blended_total_commitment:  'Total blended commitment value for the package, if this line item is part of one.',
  campaign_budget:                   'Total budget for the campaign this line item belongs to.',
  campaign_brief_field_id:           'Comma-separated IDs of the brief fields on the parent campaign.',
  campaign_status:                   'Current status of the campaign this line item belongs to (e.g. Closed).',
  account_name:                      'Name of the account (partner) associated with this line item.',
  account_type:                      'Type of the account associated with this line item (e.g. Tourist Board).',
  contacts:                          'JSON string of contact details for the account associated with this line item.',
  sales_manager:                     'Name of the sales manager on the account associated with this line item.',
  product_ids:                       'JSON array of all product IDs available to the account associated with this line item.',
  client_name:                       'Name of the client associated with this line item.',
  url:                               'Direct link to this line item\'s detail page in Uplift Hub.',
  impressions:                       'Total impressions delivered for this line item.',
  clicks:                            'Total clicks delivered for this line item.',
  spend:                             'Total spend recorded against this line item.',
  conversions:                       'Total conversions recorded for this line item.',
  completion_capped:                 'Delivery completion percentage for this line item, capped at 100.',
  pacing:                            'Delivery pacing percentage for this line item, relative to plan.',
  line_item_tags:                    'Tags applied directly to this line item.',
  campaign_tags:                     'Tags applied to the campaign this line item belongs to.',
  all_tags:                          'Combined tags from both this line item and its parent campaign.',
};

for (const [path, methods] of Object.entries(spec.paths)) {
  for (const operation of Object.values(methods)) {
    const tag = Object.entries(tagMap).find(([key]) => path.includes(key));
    operation.tags = tag ? [tag[1]] : ['General'];
    if (summaryMap[operation.operationId]) {
      operation.summary = summaryMap[operation.operationId];
    }
  }
}

spec.tags = [
  { name: 'Accounts' },
  { name: 'Campaigns' },
  { name: 'Line Items' },
  { name: 'Products' },
  { name: 'Documents' },
  { name: 'Source Markets' },
  { name: 'Reporting' },
  { name: 'System' },
];

spec.components.securitySchemes = {
  ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'X-apikey' }
};
spec.security = [{ ApiKeyAuth: [] }];

// Document the valid values for ReportingRequest.Columns so the API reference
// shows the full list of columns you can request, with a description of each.
const reportingRequest = spec.components.schemas?.ReportingRequest;
if (reportingRequest?.properties?.Columns) {
  const columnNames = Object.keys(columnDescriptions);
  reportingRequest.properties.Columns.items = {
    type: 'string',
    enum: columnNames,
  };
  reportingRequest.properties.Columns.description =
    'Columns to include in the report. Reporting is at line item level — each ' +
    'row returned represents a single line item, and every column describes ' +
    'that line item or the campaign/account/product it belongs to. Valid values:\n\n' +
    columnNames.map((name) => `- \`${name}\`: ${columnDescriptions[name]}`).join('\n');
}

fs.writeFileSync('openapi.json', JSON.stringify(spec, null, 4));
