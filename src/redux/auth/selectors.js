// Auth selectors
export const selectToken = state => state.auth.token;
export const selectError = state => state.auth.error;
export const selectLoading = state => state.auth.loading;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUserId = state => state.auth.data.userId;
