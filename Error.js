class BaseError extends Error
{
    constructor(message, statusCode)
    {
        super(message);
        this.status = statusCode;
    }
    getStatus(){
        return this.status
    }
}

module.exports = BaseError;
