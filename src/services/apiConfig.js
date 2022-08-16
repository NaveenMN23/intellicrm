export const EndPoints = {
    SIGN_IN: 'Auth/Authenticate',
    REFRESH_TOKEN: 'Auth/RefreshToken',
    FETCH_CUSTOMER_DETAILS : 'SuperAdmin/GetCustomerDetails',
    FETCH_SUBADMIN_DETAILS : 'SuperAdmin/GetSubAdminDetails',
    SAVE_CUSTOMER_DETAILS: 'SuperAdmin/CreateCustomer',
    SAVE_SUBADMIN_DETAILS: 'SuperAdmin/CreatSuperAdmin',
    GET_ALL_CUSTOMER_DETAILS: 'SuperAdmin/GetAllUserDetails/1',
    GET_ALL_SUBADMIN_DETAILS: 'SuperAdmin/GetAllUserDetails/2'
}

/*
Request Method
*/
export const RequestType = {
   GET : 'get',
   POST : 'post',
   PostJson: 'postJson'
}
