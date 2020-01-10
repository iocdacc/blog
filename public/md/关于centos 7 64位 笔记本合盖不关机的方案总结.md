>有时候需要：合上笔记本盖子（显示屏关闭），但是远程在操作此机器，则希望合盖不睡眠（包括网络正常使用）

## 编辑下列文件：
``` shell
\#gedit /etc/systemd/logind.conf  很多地方看的是system!!到处抄;这里是Centos7.2!在systemd目录!!!

\#HandlePowerKey按下电源键后的行为，默认power off
\#HandleSleepKey 按下挂起键后的行为，默认suspend
\#HandleHibernateKey 按下休眠键后的行为，默认hibernate
\#HandleLidSwitch 合上笔记本盖后的行为，默认suspend   （改为lock；即合盖不休眠）在原文件中，还要去掉前面的#
```
## 运行：

\#systemctl restart systemd-logind

## 生效。

~~但在实际中似乎不起作用 反而用Ubuntu的合盖不关机的设置反而有效果！~~  
~~vim /etc/systemd/logind.conf~~  
~~HandleLidSwitch=ignore~~  