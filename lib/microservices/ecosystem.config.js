module.exports = {
  apps : [
  //   {
  //   name: 'thumbnail client',
  //   script: './bin/www',
  //   //script: 'thumbnailClient.js',

  //   // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  //   //args: 'one two',
  //   instances: 1,
  //   autorestart: false,
  //   watch: true,
  //   log_file: 'log1.log',
  //   log_date_format: 'YYY-MM-DD HH:mm'
  //   // max_memory_restart: '1G',
  //   // env: {
  //   //   NODE_ENV: 'development'
  //   // },
  //   // env_production: {
  //   //   NODE_ENV: 'production'
  //   // }
  // }, 

  {
    name: 'thumbnail',
    script: 'thumbnailService.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    //args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    log_file: 'log2.log',
    log_date_format: 'YYY-MM-DD HH:mm'
    // max_memory_restart: '1G',
    // env: {
    //   NODE_ENV: 'development'
    // },
    // env_production: {
    //   NODE_ENV: 'production'
    // }
  }
],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
