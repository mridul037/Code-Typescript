interface User {
  id: string;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

type Result<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

async function fetchUserData(userId: string): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }
    
    const apiResponse: ApiResponse<User> = await response.json();
    return { success: true, data: apiResponse.data };
    
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
