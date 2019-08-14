const defaultSettings = {
    'serverHost' : 'localhost',
    'serverPort': 44361,
    'serverProtocol': 'https'
};

const uiSettings = {
    fieldSize: 'default',
    labelStyle: {marginTop:'5px'},
    formFieldWidth: 352
};

const pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

const urlSettings = {
    'common': '/Home/Common',
    'orders': '/Home/Orders',
    'order': '/Home/Order',
    'addOrder': '/api/orders/add',
    'addDistributor': '/Home/AddDistributor',
    'editDistributor': '/Home/EditDistributor',
    'getDistributors': '/Home/GetDistributors',
    'deleteDistributor': '/Home/DeleteDistributor',
    'getAOI': '/Home/GetAOI',
    'addAOI': '/Home/AddAOI',
    'editAOI': '/Home/EditAOI',
    'deleteAOI': '/Home/DeleteAOI',
    'customers': '/Home/Customers',
    'customer': '/Home/Customer',
    'addCustomer': '/Home/AddCustomer',
    'editCustomer': '/Home/EditCustomer',
    'autocompleteCustomers': '/Home/AutocompleteCustomers'
};

export {defaultSettings, uiSettings, pageSettings, urlSettings};