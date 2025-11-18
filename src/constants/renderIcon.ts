export const renderIcon = (type: string) => {
  switch (type) {
    case 'country':
      return '🌎'; 
    case 'city':
      return '🏘️'; 
    case 'hotel':
      return '🛏️'; 
    default:
      return '';
  }
};
