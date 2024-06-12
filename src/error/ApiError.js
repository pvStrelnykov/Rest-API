export default class ApiError extends Error{
	status
	errors

	constructor(status, message, errors = []) {
		super()
		this.status = status
		this.message = message
		this.errors = errors
	}

	static unauthorized(message) {
		return new ApiError(401, message);
	}

	static badRequest(message, errors = []) {
		return new ApiError( 400, message, errors)
	}
}