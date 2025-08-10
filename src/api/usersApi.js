export const getUsers = async (page = 1, count = 6) => {
    try {
        const response = await fetch(
            `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            switch (response.status) {
                case 404:
                    throw new Error('Page not found.')
                case 422:
                    throw new Error('Validation failed.')
                case 500:
                    throw new Error('Server error.')
                default:
                    throw new Error('Unknown error.')
            }
        }

        const data = await response.json();

        return {
            success: true,
            users: data.users,
            totalPages: data.total_pages,
            currentPage: data.page,
        };
    } catch (error) {
        if (import.meta.env.VITE_APP_MODE === 'development') {
            console.error('Get users data error:', error);
        }

        return { success: false, message: error.message };
    }
};

export const postUser = async (data) => {
    try {
        const tokenRes = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        if (!tokenRes.ok) throw new Error('Failed to get token.');
        const { token } = await tokenRes.json();

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('position_id', Number(data.position));
        formData.append('photo', data.upload[0])

        const response = await fetch(
            'https://frontend-test-assignment-api.abz.agency/api/v1/users',
            {
                method: 'POST',
                headers: {
                    'Token': token
                },
                body: formData
            }
        );

        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new Error('The token expired.');
                case 409:
                    throw new Error('User with this phone or email already exists.');
                case 422:
                    throw new Error('Validation failed.');
                case 500:
                    throw new Error('Server error.');
                default:
                    throw new Error('Unknown error.');
            }
        }

        const result = await response.json();

        return {
            success: true,
            userId: result.user_id,
            message: result.message,
        };
    } catch (error) {
        if (import.meta.env.VITE_APP_MODE === 'development') {
            console.error('Post user error:', error);
        }

        return { success: false, message: error.message };
    }
};