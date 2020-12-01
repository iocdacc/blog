## windows powerShell 启用脚本

``` Batch
set-ExecutionPolicy RemoteSigned
```

## 重置windows网卡

``` Batch
netsh winsock reset
```

## Git生成新的SSH密钥
打开Git Bash
``` Batch
ssh-keygen -t rsa -b 4096 -C "iocdacc@gmail.com"

git config --global user.name "iocdacc"

git config --global user.email iocdacc@gmail.com
```

## jQuery手册

https://www.jb51.net/shouce/jquery1.82/
