// globals.js
const globals = {
	user: JSON.parse(localStorage.getItem('user')),
	userId: null,
	token: localStorage.getItem('token')
};

globals.userId = globals.user ? globals.user._id : null;

export const { userId, token } = globals;
export default globals;
