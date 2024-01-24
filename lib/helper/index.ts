export const getDomainFromUrl = (url : string) => {
    let domain = '';
  
    try {
      const urlObject = new URL(url);
      const hostParts = urlObject.host.split('.');
      
      // Extract the last two parts of the host to get the domain
      if (hostParts.length >= 2) {
        domain = `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}`;
      }
    } catch (error) {
      throw new Error('Invalid URL');
    }
  
    return domain;
  }