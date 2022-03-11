export const responseMessages = {
    'ACCOUNT_DISABLED': 'Your account is disabled please contact to admin',
    'ALREADY_EXIST': 'Aleardy Exist Please Login',
    'ALREADY_REGISTER': 'Email already registered',
    'REGISTERD': 'Registered Successfully',
    'GROUP_CREATED': 'Group Created Successfully',
    'INVALID_EMAIL': 'Email not exist',
    'INCORRECT_PASSWORD': 'Incorrect password',
    'LOGIN': 'Logged in successfully',
    'USER_NOT_FOUND': 'User not found',
    'UNAUTHORIZED': 'Unauthorized',
    'FETCH_CONTACTS': 'Fetch Contacts Successfully',
    'FETCH_TALKIE_CONTACTS': 'Fetch Talkie Contacts Successfully',
    'FETCH_All_Group': 'Fetch All Group Successfully',
    'LOGIN': 'Login successfully',
    'OTP_MISMATCH': 'OTP mismatched',
    'INVALID_PASSWORD': 'Invalid old password',
    'INVALID': 'Invalid email or password',
    'PASSWORD_CHANGED': 'Password Changed Successfully',
    'ADMIN_ADDED': 'Admin added successfully',
    'USER_NOTFOUND': 'User not found',
    'RESET_PASSWORD': 'Password Reset Successfully',
    'OTP_FOR_PASSWORD': 'OTP For Password Reset Sent To Your Email',
    'VERIFY_OTP': 'OTP Verified',
    'EMAIL_NOT_REGISTER': 'Email not registered',
    'ALREADY_EXIST': 'Aleardy Exist Please Login',
    'ADDED_CATEGORY': 'Category Added Successfully',
    'UPDATE_CATEGORY': 'Category Updated Successfully',
    'FETCH_CATEGORIES': 'Fetch All Categories Successfully',
    'FETCH_CATEGORY': 'Fetch Category Successfully',
    'ADDED_BLOG': 'Blog Added Successfully',
    'UPDATE_BLOG': 'Blog Updated Successfully',
    'FETCH_BLOGS': 'Fetch All Blogs Successfully',
    'FETCH_BLOG': 'Fetch Blog Successfully',
    'ADDED_TAG': 'Tag Added Successfully',
    'UPDATE_TAG': 'Tag Updated Successfully',
    'FETCH_TAGS': 'Fetch All Tags Successfully',
    'FETCH_TAG': 'Fetch Tag Successfully',
    'ADDED_COMMENTS': 'Comment Added Successfully',
    'UPDATE_COMMENTS': 'Comment Updated Successfully',
    'FETCH_COMMENTS': 'Fetch All Comments Successfully',
    'FETCH_COMMENT': 'Fetch Comment Successfully',
    'ADDED_SETTINGS': 'Settings Added Successfully',
    'UPDATE_SETTINGS': 'Settings Updated Successfully',
    'FETCH_SETTINGS': 'Fetch All Settings Successfully',
    'FETCH_SETTING': 'Fetch Setting Successfully',
    'DELETE_BLOG': 'Blog deleted successfully',
    'DELETE_CATEGORIES': 'Category deleted successfully',
    'DELETE_COMMENT': 'Comment deleted successfully',
    'DELETE_TAG': 'Tag deleted successfully',
    'DELETE_SETTING': 'Setting deleted successfully',
}

export const notificationPayload = {}

export const statusCodes = {
    'SUCCESS': 200,
    'RECORD_CREATED': 201,
    'BAD_REQUEST': 400,
    'AUTH_ERROR': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'INVALID_REQUEST': 405,
    'RECORD_ALREADY_EXISTS': 409,
    'SERVER_ERROR': 500
}

const makeResponse = async (res, statusCode, success, message, payload = null, meta = {}) =>
    new Promise(resolve => {
        res.status(statusCode)
            .send({
                success,
                code: statusCode,
                message,
                data: payload,
                meta
            });
        resolve(statusCode);
    });

export { makeResponse };
