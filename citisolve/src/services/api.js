
const baseURL = import.meta.env.VITE_API_URL;


const getToken = () => {
    const token = localStorage.getItem("token")
    console.log('Token in local storage:', `${token ? "exits" : "does not exist"}`);
    return token;
}

const callAPI = async (endpoint, options = {}) => {

    const config = {
        ...options,
        headers: {
            ...options.headers
        }
    }
    const token = getToken();

    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    try {
        const response = await fetch(`${baseURL}${endpoint}`, config)

        if (!response.ok) {
            const errorData = await response.json().catch(() => { })

            //console.log(errorData.message)
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }
        //console.log(response)
        return await response.json();

    } catch (error) {
        //console.log(error.message)
        throw new Error(error.message || 'Network error occurred')
    }
}

//register = https://citisolve-smarter-complaint-resolution.onrender.com/api/auth/register
//login = https://citisolve-smarter-complaint-resolution.onrender.com/api/auth/login

export const authAPI = {
    register: (userData) => {
        return callAPI("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
    login: (loginData) => {
        return callAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};



export const ComplaintAPI = {
    createComplaint: (complaintData) => {
        return callAPI('/complaints', {
            method: 'POST',
            body: complaintData,
        })
    },
    getComplaints: () => {
        return callAPI('/complaints')
    }
}