export const getPositions = async () => {
    try {
        const response = await fetch(
            `https://frontend-test-assignment-api.abz.agency/api/v1/positions`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if (!response.ok) {
            switch (response.status) {
                case 404:
                case 422:
                    throw new Error('Positions not found.') // The data can be extracted in even greater detail, but for testing purposes, this will be sufficient.
                case 500:
                    throw new Error('Server error.')
                default:
                    throw new Error('Unknown error.')
            }
        }

        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message || 'Unknown API error.')
        }

        return {
            success: true,
            positions: data.positions
        };
    } catch (error) {
        if (import.meta.env.VITE_APP_MODE === 'development') {
            console.error('Get positions data error:', error)
        }

        return { success: false, message: error.message };
    }
};