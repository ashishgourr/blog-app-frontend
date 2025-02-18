export const parseJwt = (token) => {
  try {
    // Split the token into its three parts
    const base64Url = token.split(".")[1];

    // Replace the Base64URL characters to standard Base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode the Base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // Parse the JSON string to get the payload
    const decoded = JSON.parse(jsonPayload);

    // Log the decoded payload
    console.log("Decoded JWT Payload:", decoded);

    return decoded; // Return the decoded payload
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
