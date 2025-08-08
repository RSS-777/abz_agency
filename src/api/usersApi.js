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
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        return {
            success: true,
            users: data.users,
            totalPages: data.total_pages,
            currentPage: data.page,
        };
    } catch (error) {
        console.error('Get users data error:', error);
        return { success: false };
    }
};