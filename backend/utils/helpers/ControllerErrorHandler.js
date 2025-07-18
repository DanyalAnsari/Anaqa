const ControllerErrorHandler = (fn) => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next))
			.then((response) => {
				if (!response) return;
				res.status(response.statusCode || 200).json({
					success: true,
					...response,
				});
			})
			.catch(next);
	};
};

export default ControllerErrorHandler;
