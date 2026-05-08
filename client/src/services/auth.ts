/**
 * Authentication logic for MindFlow
 */

export const loginUser = async (email: string, password: string): Promise<any> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Authenticating user:', email);
      // In a real app, you'd call your backend here
      if (email && password) {
        resolve({ success: true, user: { email, name: 'MindFlow User' } });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1500);
  });
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  window.location.href = '/login';
};