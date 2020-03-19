## 重置windows网卡

``` Batch
netsh winsock reset
```

## Git生成新的SSH密钥
打开Git Bash
``` Batch
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```