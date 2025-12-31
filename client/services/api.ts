const API_BASE_URL = 'https://api.thedigna.com/api/v1';
//
//'http://localhost:5000/api/v1';
//'http://dignaapi-env.eba-72fpqrmx.ap-south-1.elasticbeanstalk.com/api/v1';
//'https://localhost:57309/api/v1';//process.env.VITE_API_BASE_URL || 

// Token management
export const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setTokens = (token: string, refreshToken: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};
export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Generic fetch wrapper
async function apiCall<T>(
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    requiresAuth?: boolean;
  } = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    requiresAuth = false,
  } = options;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (requiresAuth) {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'API request failed');
  }

  return data;
}

// ============ AUTHENTICATION APIS ============

export const authAPI = {
  // Sign In
  login: async (email: string, password: string) => {
    const response:any = await apiCall('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (response.success) {
      setTokens(response.data.token, response.data.refreshToken);
    }
    return response;
  },

  // Sign Up
  register: async (name: string, email: string, password: string) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: { name, email, password, acceptTerms: true },
    });
    return response;
  },

  // Social Login
  socialLogin: async (provider: 'google' | 'facebook' | 'apple', idToken: string, accessToken?: string) => {
    const response:any = await apiCall('/auth/social-login', {
      method: 'POST',
      body: { provider, idToken, accessToken: accessToken || '' },
    });
    if (response.success) {
      setTokens(response.data.token, response.data.refreshToken);
    }
    return response;
  },

  // Initiate Google Sign-In - redirects to backend OAuth endpoint
  initiateGoogleSignIn: () => {
    // Redirect to backend Google OAuth endpoint
    // Backend will handle OAuth flow and redirect back to callback URL
    // Use hash route for HashRouter compatibility
    const callbackUrl = `${window.location.origin}/#/auth/callback`;
    window.location.href = `${API_BASE_URL}/auth/google?redirect_uri=${encodeURIComponent(callbackUrl)}`;
  },

  // Initiate Facebook Sign-In - redirects to backend OAuth endpoint
  initiateFacebookSignIn: () => {
    // Redirect to backend Facebook OAuth endpoint
    // Backend will handle OAuth flow and redirect back to callback URL
    // Use hash route for HashRouter compatibility
    const callbackUrl = `${window.location.origin}/#/auth/callback`;
    window.location.href = `${API_BASE_URL}/auth/facebook?redirect_uri=${encodeURIComponent(callbackUrl)}`;
  },

  // Exchange Google ID token for JWT tokens
  exchangeGoogleToken: async (idToken: string) => {
    const response: any = await apiCall('/auth/google/exchange', {
      method: 'POST',
      body: { idToken },
    });
    if (response.success) {
      setTokens(response.data.token, response.data.refreshToken);
    }
    return response;
  },

  // Exchange Facebook access token for JWT tokens
  exchangeFacebookToken: async (accessToken: string) => {
    try {
      const response: any = await apiCall('/auth/facebook/exchange', {
        method: 'POST',
        body: { accessToken },
      });
      
      console.log("Facebook exchange response:", response);
      
      if (response.success && response.data) {
        const jwtToken = response.data.token || response.data.access_token;
        const refreshToken = response.data.refreshToken || response.data.refresh_token;
        
        if (jwtToken && refreshToken) {
          setTokens(jwtToken, refreshToken);
          console.log("Facebook tokens set successfully");
        } else {
          console.error("Missing tokens in Facebook exchange response:", response.data);
        }
      }
      
      return response;
    } catch (error) {
      console.error("Facebook exchange error:", error);
      throw error;
    }
  },

  // Send Verification Email
  sendVerificationEmail: async (email: string) => {
    return await apiCall('/auth/send-verification-email', {
      method: 'POST',
      body: { email },
    });
  },

  // Verify Email
  verifyEmail: async (email: string, verificationCode: string) => {
    return await apiCall('/auth/verify-email', {
      method: 'POST',
      body: { email, verificationCode },
    });
  },

  // Change Password
  changePassword: async (currentPassword: string, newPassword: string) => {
    return await apiCall('/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
      requiresAuth: true,
    });
  },

  // Forgot Password
  forgotPassword: async (email: string) => {
    return await apiCall('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  },

  // Reset Password
  resetPassword: async (email: string, resetToken: string, newPassword: string) => {
    return await apiCall('/auth/reset-password', {
      method: 'POST',
      body: { email, resetToken, newPassword },
    });
  },

  // Refresh Token
  refreshToken: async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response:any = await apiCall('/auth/refresh-token', {
      method: 'POST',
      body: { refreshToken },
    });
    if (response.success) {
      setTokens(response.data.token, response.data.refreshToken);
    }
    return response;
  },

  // Logout
  logout: async () => {
    const refreshToken = getRefreshToken();
    const response:any = await apiCall('/auth/logout', {
      method: 'POST',
      body: { refreshToken },
      requiresAuth: true,
    });
    if (response.success) {
      clearTokens();
    }
    return response;
  },
};

// ============ IMAGE APIS ============

export const imageAPI = {

  searchImages:async (query: string) => {
  try {
    return await apiCall(`/images/search/${query}`, {
      method: 'GET',
       headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
},
  // Get All Images
  getAllImages: async () => {
    return await apiCall('/images', {
      method: 'GET',
    });
  },

  // Get Image Details
  getImageDetails: async (imageId: string) => {
    return await apiCall(`/image/${imageId}`, {
      method: 'GET',
    });
  },

  // Download Image
  downloadImage: async (imageId: string, sizeId: string) => {
    return await apiCall(`/image/${imageId}/download`, {
      method: 'POST',
      body: { sizeId },
    });
  },

  // Track Image Download - records download in user's stats
  trackDownload: async (imageId: string, imageData?: {
    title?: string;
    imageUrl?: string;
    photographer?: string;
    sizeId?: string;
  }) => {
    return await apiCall(`/image/${imageId}/track-download`, {
      method: 'POST',
      body: {
        title: imageData?.title,
        imageUrl: imageData?.imageUrl,
        photographer: imageData?.photographer,
        sizeId: imageData?.sizeId,
      },
      requiresAuth: true,
    });
  },

  likeImage: async (imageId: string) => {
    return await apiCall(`/image/like/${imageId}`, {
      method: 'POST',
      requiresAuth: true,
    });
  },
};

// ============ PROFILE APIS ============

export const profileAPI = {
  // Get Profile
  getProfile: async () => {
    return await apiCall('/profile', {
      requiresAuth: true,
    });
  },

  // Update Profile
  updateProfile: async (profileData: {
    firstName?: string;
    lastName?: string;
    website?: string;
    bio?: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      pinterest?: string;
    };
    newsletter?: boolean;
  }) => {
    return await apiCall('/profile', {
      method: 'PUT',
      body: profileData,
      requiresAuth: true,
    });
  },

  // Upload Profile Picture
  uploadProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}/profile/upload-picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data;
  },
};

// ============ USER PROFILE APIS ============
// added to support UserProfile page and the upload modal/component
export const userProfileAPI = {
  // fetch user's stats (uploads, downloads, followers, etc.)
  getUserStats: async (id?) => {
    return await apiCall(`/profile/stats/${id}`, { requiresAuth: true });
  },
   getProfile: async (id?) => {
    return await apiCall(`/profile/${id}`, { requiresAuth: true });
  },

// Follow or unfollow a user
followUser: async (followeeId: string) => {
  return await apiCall(`/profile/followUser/${followeeId}`, {
    method: 'POST',
    requiresAuth: true,
  });
},

  updateProfile: async (formData: FormData) => {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    const response = await fetch(
            `${API_BASE_URL}/profile/update`,
            {
              method: "POST",
              headers: {
        Authorization: `Bearer ${token}`,
      },
              body: formData, // no JSON, FormData auto sets headers
            }
          );
          const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data;
  },
  // upload multiple images (FormData expected)
  uploadImages: async (formData: FormData) => {
    const token = getToken();
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}/profile/uploads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data;
  },
};

// ============ TYPES ============

export interface LoginResponse {
  success: boolean;
  data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    userId: string;
    email: string;
    name: string;
    emailVerified: boolean;
    verificationToken: string;
    createdAt: string;
  };
  message: string;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    website: string;
    bio: string;
    socialLinks: {
      instagram: string;
      twitter: string;
      youtube: string;
      pinterest: string;
    };
    newsletter: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode?: number;
  };
}
