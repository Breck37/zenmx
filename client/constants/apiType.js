const defaultEndPoints = {
  getUser: '/api/get-user',
}

export const mx = {
  weekResults: '/api/mx/get-weeks-results',
  liveResults: '/api/mx/get-live-results',
  assignPoints: '/api/mx/assign-points',
  ...defaultEndPoints
};
export const sx = {
  weekResults: '/api/sx/get-weeks-results',
  liveResults: '/api/sx/get-live-results',
  assignPoints: '/api/sx/assign-points',
  ...defaultEndPoints
};
