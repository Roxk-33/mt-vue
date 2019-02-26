module.exports = {
  // modules开始
  modules: [
    {
      name: '本机', // 标识要发布的环境描述
      env: 'production', // 发布环境的唯一标识
      ssh: {
        host: '120.79.207.205', // 远程服务器ip
        password: 'Alibaba1995', // 登录服务器的密码
        port: 22,
        username: 'root', // 登录服务器的用户名
        // rc版本的user选项和userName选项请在未来统一配置为username
      },
      buildCommand: 'build', // 要进行构建的命令build => npm run build
      localPath: 'dist', // 项目中要发布的目录
      remotePath: '/var/www/shop', // 项目中要发布到远程服务器的目录    },
    },
  ],
  // modules结束
  // nobuild: true,
  nobackup: true,
  tag: 'v1', // modules外的字段可用于每一个module继承,这里仅用于举例
};

// fjpublish env -s
