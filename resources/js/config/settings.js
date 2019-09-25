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
    'common': '/Home/Common',
    'orders': '/api/orders/list',
    'order': '/Home/Order',
    'addOrder': '/api/orders/add',
    'editOrder': '/api/orders/edit',
    'scenes': '/api/scenes/list',
    'addScene': '/api/scenes/add',
    'editScene': '/api/scenes/edit',
    'getScene': '/api/scenes/get',
    'addDistributor': '/Home/AddDistributor',
    'editDistributor': '/Home/EditDistributor',
    'getDistributors': '/Home/GetDistributors',
    'deleteDistributor': '/Home/DeleteDistributor',
    'getAOI': '/Home/GetAOI',
    'addAOI': '/Home/AddAOI',
    'editAOI': '/Home/EditAOI',
    'deleteAOI': '/Home/DeleteAOI',
    'customers': '/api/customers/list',
    'customer': '/api/customers/get',
    'addCustomer': '/Home/AddCustomer',
    'editCustomer': '/Home/EditCustomer',
    'autocompleteCustomers': '/api/autocomplete/customers'
};

const NETWORK_PATH = '\\\\lsync\\sync';

export {defaultSettings, uiSettings, pageSettings, urlSettings, NETWORK_PATH};