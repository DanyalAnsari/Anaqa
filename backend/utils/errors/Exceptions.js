import ClientError from "./ClientError.js";

export class BadRequestException extends ClientError {
	constructor(message = "Bad Request") {
		super(400, message);
	}
}

export class UnauthorizedException extends ClientError {
	constructor(message = "Unauthorized") {
		super(401, message);
	}
}

export class NotFoundException extends ClientError {
	constructor(message = "Not Found") {
		super(404, message);
	}
}

export class ForbiddenException extends ClientError {
	constructor(message = "Forbidden") {
		super(403, message);
	}
}

export class ValidationException extends ClientError {
	constructor(message = "Invalid Request") {
		super(400, message);
	}
}
export class InternalServerException extends ClientError {
	constructor(message = "Internal Server Error") {
		super(500, message);
	}
}
