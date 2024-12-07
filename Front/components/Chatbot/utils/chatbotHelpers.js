import businessInfo from '../data/businessInfo';

export const formatOpeningHours = () => {
  return businessInfo.openingHours
    .map(schedule => `${schedule.day}: ${schedule.open} - ${schedule.close}`)
    .join('\n');
};

export const getLocationInfo = () => {
  const { location } = businessInfo;
  return `Dirección: ${location.address}, ${location.city}, ${location.state} ${location.zipCode}`;
};

export const getContactInfo = () => {
  const { contact } = businessInfo;
  return `Teléfono: ${contact.phone}\n Email: ${contact.email}${
    contact.website ? `\n Sitio web: ${contact.website}` : ''
  }${
    contact.socialMedia 
      ? `\n Redes Sociales:\nFacebook: ${contact.socialMedia.facebook}\nInstagram: ${contact.socialMedia.instagram}` 
      : ''
  }`;
};