>SELinux(Security-Enhanced Linux) 是美国国家安全局（NSA）对于强制访问控制的实现，是 Linux历史上最杰出的新安全子系统。  
>但是SELinux的学习使用及其复杂，加之我所使用的只是本地的私人服务器，而且并非走的运维这条路所以将其关闭。  

临时关闭：
``` linux
[root@localhost ~]# getenforce
Enforcing

[root@localhost ~]# setenforce 0
[root@localhost ~]# getenforce
Permissive
```


永久关闭：
``` linux
[root@localhost ~]# vim /etc/sysconfig/selinux

SELINUX=enforcing 改为 SELINUX=disabled
```
重启服务reboot

