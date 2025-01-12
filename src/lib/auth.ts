const MOCK_USER = {
  id: '1',
  email: 'george.charles@bird.co.uk',
  password: 'test',
  firstName: 'George',
  lastName: 'Charles',
  savedProperties: [],
  preferences: {
    location: {
      address: '123 Main St, London',
      postcode: 'SW1A 1AA',
      coordinates: {
        lat: 51.5074,
        lng: -0.1278
      }
    }
  }
};

export async function login(email: string, password: string) {
  // In a real app, this would be an API call
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    const { password: _, ...user } = MOCK_USER;
    return user;
  }
  throw new Error('Invalid credentials');
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  // In a real app, this would be an API call
  if (userId === MOCK_USER.id && currentPassword === MOCK_USER.password) {
    MOCK_USER.password = newPassword;
    return true;
  }
  throw new Error('Invalid current password');
}

export async function updateUserPreferences(userId: string, preferences: any) {
  // In a real app, this would be an API call
  if (userId === MOCK_USER.id) {
    MOCK_USER.preferences = {
      ...MOCK_USER.preferences,
      ...preferences
    };
    const { password: _, ...user } = MOCK_USER;
    return user;
  }
  throw new Error('User not found');
}