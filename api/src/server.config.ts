module.exports = {
  apps: [
    {
      name: 'fincheckApi',
      script: './main.js',

      instances: 4,
      exec_mode: 'cluster',

      // Graceful start
      wait_ready: true,

      // Graceful stop
      listen_timeout: 2000,
      kill_timeout: 0,
    },
  ],
};
