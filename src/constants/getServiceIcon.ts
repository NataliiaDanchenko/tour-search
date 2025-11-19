export const getServiceIcon = (service: string) => {
  switch (service.toLowerCase()) {
    case 'wifi':
      return '📶';
    case 'pool':
    case 'swimmingpool':
      return '🏊';
    case 'parking':
      return '🅿️';
    case 'gym':
      return '🏋️';
    case 'spa':
      return '💆';
    case 'restaurant':
      return '🍽️';
    case 'bar':
      return '🍸';
    case 'beach':
      return '🏖️';
    case 'ac':
    case 'airconditioning':
      return '❄️';
    default:
      return '✔️'; 
  }
};
