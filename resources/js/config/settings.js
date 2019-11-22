const defaultSettings = {
    'serverHost' : 'localhost',
    'serverPort': 44361,
    'serverProtocol': 'https'
};

const uiSettings = {
    fieldSize: 'default',
    labelStyle: {marginTop:'5px'},
    formFieldWidth: 362,
    editOrderFieldWidth: 285
};

const pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

const urlSettings = {
    'common': '/api/common/main',
    'orders': '/api/orders/list',
    'order': '/api/orders/get',
    'addOrder': '/api/orders/add',
    'editOrder': '/api/orders/edit',
    'scenes': '/api/scenes/list',
    'addScene': '/api/scenes/add',
    'editScene': '/api/scenes/edit',
    'getScene': '/api/scenes/get',
    'deleteScene': '/api/scenes/delete',
    'getDistributors': '/api/distributors/list',
    'addDistributor': '/api/distributors/add',
    'editDistributor': '/api/distributors/edit',
    'deleteDistributor': '/api/distributors/delete',
    'getAOI': '/api/aoi/list',
    'addAOI': '/api/aoi/add',
    'editAOI': '/api/aoi/edit',
    'deleteAOI': '/api/aoi/delete',
    'customers': '/api/customers/list',
    'customer': '/api/customers/get',
    'addCustomer': '/api/customers/add',
    'editCustomer': '/api/customers/edit',
    'autocompleteCustomers': '/api/autocomplete/customers',
    'createDefaultAoi': '/api/service/add/dir/aoi',
    'registerUser': '/api/service/add/user/kosmosnimki'
};

const NETWORK_PATH = '\\\\lsync.scanex.ru\\sync';

export {defaultSettings, uiSettings, pageSettings, urlSettings, NETWORK_PATH};