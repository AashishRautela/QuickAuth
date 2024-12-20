import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';


//login to super admin
export const loginToSuperAdmin = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

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


    res
        .cookie("access_token", access_token)
        .cookie("refresh_token", refresh_token)
        .status(200).json({
            success: true,
            message: 'Login successful',
            access_token,
            refresh_token,
            token_type,
            expires_in,
        });
});

//funtion to create realme
export const createRealm = asyncHandler(async (req, res, next) => {
    const { access_token } = req.cookies;
    console.log('access_token', access_token)

    if (!access_token) {
        return res.status(401).json({
            success: false,
            message: 'Access token is required to create a realm',
        });
    }

    const { name, numberOfEmployees, website, description } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Realm name is required',
        });
    }

    const realmPayload = {
        realm: name,
        enabled: true,
        attributes: {
            numberOfEmployees: numberOfEmployees || '',
            website: website || '',
            description: description || '',
        },
    };

    const response = await axios.post(
        `${process.env.KEYCLOAK_URL}/admin/realms`,
        realmPayload,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    res.status(201).json({
        success: true,
        message: `Realm "${name}" created successfully`,
        data: response.data,
    });
});

//funtion to create admin user in realm
export const createAdminUser = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found. Please log in.' });
    }
    const { realm, username, email, password, firstName, lastName } = req.body;

    if (!realm || !username || !email || !password) {
        return res.status(400).json({ message: 'Realm, username, email, and password are required.' });
    }

    const newUserPayload = {
        username,
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        enabled: true,
        credentials: [
            {
                type: 'password',
                value: password,
                temporary: false,
            },
        ],
        realmRoles: ['admin'],
    };

    const url = `${process.env.KEYCLOAK_URL}/admin/realms/${realm}/users`;

    const response = await axios.post(url, newUserPayload, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    res.status(201).json(
        {
            success: true,
            message: `Admin user "${username}" created successfully`,
            data: response.data
        }
    );
});

