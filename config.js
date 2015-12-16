endpoints = [
    {
        "url": "/pouet",
        "httpMethod": "GET",
        "response":{"msg":"Je suis OK", "ReturnCode":"200"}
    },
    {
        "url": "/pouet2",
        "httpMethod": "POST",
        "response":{"msg":"Je suis OK 2", "ReturnCode":"200"}
    },
    {
        "url": "/pouet3",
        "httpMethod": "PUT",
        "response":{"msg":"Je suis OK 3", "ReturnCode":"200"}
    },
    {
        "url": "/pouet4",
        "httpMethod": "DELETE",
        "response":{"msg":"Je suis OK 4", "ReturnCode":"200"}
    }
]

module.exports = {
    endpoints: endpoints
};