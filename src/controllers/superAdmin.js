import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

//login to super admin
export const loginToSuperAdmin = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const response = await axios.post(
            `${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
            new URLSearchParams({
                grant_type: 'password',
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                username,
                password,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token, refresh_token, token_type, expires_in } = response.data;

        res.status(200).json({
            message: 'Login successful',
            access_token,
            refresh_token,
            token_type,
            expires_in,
        });
    } catch (error) {
        res.status(401).json({
            message: 'Login failed',
            error: error.response?.data || error.message,
        });
    }
})