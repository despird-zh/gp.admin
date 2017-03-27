import devService from './devService';
export devService from './devService';

import authService from './authService';
export authService from './authService';

import configService from './configService';
export configService from './configService';

import securityService from './securityService';
export securityService from './securityService';
/**
 * collect all the API service and export them
 */
export default { devService, authService, configService, securityService };
