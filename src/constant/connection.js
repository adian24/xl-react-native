import {API_URL} from '../../env.json';
// http://172.30.251.160/api
// http://52.237.113.189/api'
const headerAuth = 'Basic eGwtZGNwLXNlY3VyaXR5OnhsLWRjcC1zZWN1cml0eS1zZWNyZXQ=';
const super_base_url = API_URL;
const base_url = `${super_base_url}/apim`;

export {headerAuth, super_base_url, base_url};
