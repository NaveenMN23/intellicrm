export const EndPoints = {
    SIGN_IN: 'Auth/Authenticate',
    REFRESH_TOKEN: 'Auth/RefreshToken',
    FETCH_CUSTOMER_DETAILS : 'SuperAdmin/GetCustomerDetails',
    FETCH_SUBADMIN_DETAILS : 'SuperAdmin/GetSubAdminDetails',
    SAVE_CUSTOMER_DETAILS: 'SuperAdmin/CreateCustomer',
    SAVE_SUBADMIN_DETAILS: 'SuperAdmin/CreatSuperAdmin',
    GET_ALL_CUSTOMER_DETAILS: 'SuperAdmin/GetAllUserDetails/1',
    GET_ALL_SUBADMIN_DETAILS: 'SuperAdmin/GetAllUserDetails/2',
    GET_ALL_PRODUCT_DETAILS: 'Product/GetProductDetails',
    ADD_PRODUCT_DETAILS: 'Product/CreateProductDetails',
    GET_ALL_CUSTOMER_PRIORITY_DETAILS: 'SuperAdmin/GetAllUserPriority',
    UPDATE_CUSTOMER_PRIORITY_DETAILS: 'SuperAdmin/UpdateUserPriority',
    GET_ALL_CUSTOMER_PRODUCT_DETAILS:"Product/GetCustomerProductDetails",
    DELETE_CUSTOMER: 'SuperAdmin/DeleteUserDetails?email=',
    DELETE_SUBADMIN: 'SuperAdmin/DeleteUserDetails?email=',
    SAVE_ORDER : 'Orders/CreateOrder',
    GET_ORDER:'Orders/GetOrderDetails',
    GET_INVOICE_DETAILS :'Orders/GetInvoiceDetails',
    GET_LABEL_DETAILS:'Orders/GetLableDetails',
    UPDATE_ORDER:'Orders/UpdateOrderDetails',
    GET_SOA_DETAILS:'SuperAdmin/GetSOADetails',
}

/*
Request Method
*/
export const RequestType = {
   GET : 'get',
   POST : 'post',
   PostJson: 'postJson'
}
