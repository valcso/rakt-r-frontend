function decodeJWT(token) {
    const [headerEncoded, payloadEncoded] = token.split('.');

    // Decode header and payload
    const header = JSON.parse(atob(headerEncoded));
    const payload = JSON.parse(atob(payloadEncoded));

    return {
        header: header,
        payload: payload
    };
}
