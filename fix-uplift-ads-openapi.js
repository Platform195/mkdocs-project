const fs = require('fs');
const spec = JSON.parse(fs.readFileSync('uplift-ads-openapi-raw.json', 'utf8'));

// Fix server URL
spec.servers = [{ url: 'https://api.upliftads.io/v3' }];

// Add security scheme
spec.components = spec.components || {};
spec.components.securitySchemes = {
    ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'x-api-key' }
};
spec.security = [{ ApiKeyAuth: [] }];

// Tag all endpoints
spec.tags = [{ name: 'Ad Decisions' }];

const summaryMap = {
    getnativeAd:      'Get Native Ad',
    getrecommenderAd: 'Get Recommender Ad',
    getsponsoredAd:   'Get Sponsored Ad',
    getdisplayAd:     'Get Display Ad',
};

const descriptionMap = {
    getnativeAd:      'Request one or more native ad decisions for the specified zones. Returns headline, image, and click-through content ready to render inline with surrounding content.',
    getrecommenderAd: 'Request one or more recommender ad decisions for the specified zones. Returns ranked product recommendations suitable for a carousel or grid layout.',
    getsponsoredAd:   'Request one or more sponsored ad decisions for the specified zones. Typically used to surface sponsored products or listings within search or browse results.',
    getdisplayAd:     'Request one or more display ad decisions for the specified zones. Returns sized image assets for banner or rich-media creatives.',
};

for (const methods of Object.values(spec.paths)) {
    for (const operation of Object.values(methods)) {
        operation.tags = ['Ad Decisions'];
        if (summaryMap[operation.operationId]) {
            operation.summary = summaryMap[operation.operationId];
        }
        if (descriptionMap[operation.operationId]) {
            operation.description = descriptionMap[operation.operationId];
        }
    }
}

const fieldDescriptions = {
    siteId:          'Your site ID. Can be passed here instead of the x-site-id header.',
    zoneIds:         'One or more zone IDs to request decisions for.',
    adTypes:         'Ad type IDs specifying the accepted creative formats. Required for display ads.',
    count:           'Maximum number of ads to return per zone.',
    keywords:        'Keyword signals used for targeting — e.g. destination names or product categories.',
    eventIds:        'Contextual event identifiers for the current page or session.',
    ip:              "The end-user's IP address, used for geo-targeting.",
    user:            'A stable user identifier for frequency capping and personalisation.',
    consentGDPR:     'Whether the user has given GDPR consent.',
    customTargeting: 'Freeform key-value targeting parameters. Values can be strings, numbers, or arrays of either.',
};

for (const schema of Object.values(spec.components.schemas || {})) {
    if (!schema.properties) continue;
    for (const [field, def] of Object.entries(schema.properties)) {
        if (fieldDescriptions[field] && !def.description) {
            def.description = fieldDescriptions[field];
        }
    }
}

fs.writeFileSync('uplift-ads-openapi.json', JSON.stringify(spec, null, 4));
console.log('uplift-ads-openapi.json written successfully.');
