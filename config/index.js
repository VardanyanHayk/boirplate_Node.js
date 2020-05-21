import 'dotenv/config';
import nconf from 'nconf';

nconf.argv().env().file({ file: `${__dirname}/config.json` });

export default nconf;
