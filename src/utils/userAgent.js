import UserAgent from "user-agents";

export const generateUserAgent = (type) => {
	let filter;

	switch (type?.toLowerCase()) {
		case "windows":
			filter = /Windows NT/;
			break;
		case "macos":
			filter = /Mac OS X/;
			break;
		case "iphone":
			filter = /iPhone/;
			break;
		case "android":
			filter = /Android/;
			break;
		default:
			filter = {};
			break;
	}

	const userAgent = new UserAgent(filter);
	return userAgent.toString();
};
