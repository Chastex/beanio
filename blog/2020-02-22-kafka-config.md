---
slug: kafka-config
title: kafka集群安装
author: beanio
author_title: Java工程师
author_url: https://www.beanio.cn
author_image_url: https://www.beanio.cn/img/logo.svg
tags: [kafka, 集群, 配置]
---
### Basic

Kafka [2.6.0](http://kafka.apache.org/downloads)

CMAK(Kafka-manager)  [3.0.0.5](https://github.com/yahoo/CMAK/releases/tag/3.0.0.5)
<!-- truncate -->
### Requirements

Java 11+

### Server-list

| ip地址                              | 安装服务                                           |
| ----------------------------------- | -------------------------------------------------- |
| 172.17.191.162 MircroServiceNode001 | zookeeper、kafka2.6.0、kafka-manager(cmak-3.0.0.5) |
| 172.17.191.163 MircroServiceNode002 | zookeeper、kafka2.6.0                              |
| 172.17.191.161 MircroServiceNode003 | zookeeper、kafka2.6.0                              |

### Configuration

#### Installation directory

- kafka & zookeeper

  ```
  /data/kafka_2.13-2.6.0
  ```

- kafka-manager

  ```
  /data/kafka-manager
  ```

#### kafka configuration

- server.properties @MircroServiceNode001

  ```properties
  broker.id=1
  
  listeners=PLAINTEXT://MircroServiceNode001:9092
  
  # A comma separated list of directories under which to store log files
  log.dirs=/kafka_log_1/kafka-logs
  
  # Zookeeper connection
  zookeeper.connect=MircroServiceNode001:2181,MircroServiceNode002:2181,MircroServiceNode003:2181
  ```

- server.properties @MircroServiceNode002

  ```properties
  broker.id=2
  
  listeners=PLAINTEXT://MircroServiceNode002:9092
  
  # A comma separated list of directories under which to store log files
  log.dirs=/kafka_log_1/kafka-logs
  
  # Zookeeper connection
  zookeeper.connect=MircroServiceNode001:2181,MircroServiceNode002:2181,MircroServiceNode003:2181
  ```

- server.properties @MircroServiceNode003

  ```properties
  broker.id=3
  
  listeners=PLAINTEXT://MircroServiceNode003:9092
  
  # A comma separated list of directories under which to store log files
  log.dirs=/kafka_log_1/kafka-logs
  
  # Zookeeper connection
  zookeeper.connect=MircroServiceNode001:2181,MircroServiceNode002:2181,MircroServiceNode003:2181
  ```

- zookeeper.properties

  ```properties
  dataDir=/data/zookeeper-data/zookeeper
  
  server.1=MircroServiceNode001:2888:3888
  server.2=MircroServiceNode002:2888:3888
  server.3=MircroServiceNode003:2888:3888
  
  #设置连接参数，添加如下配置
  #为zk的基本时间单元，毫秒
  tickTime=2000
  #Leader-Follower初始通信时限 tickTime*10
  initLimit=10
  #Leader-Follower同步通信时限 tickTime*5
  syncLimit=5
  
  /data/zookeeper-data/zookeeper 目录下创建文件myid,MircroServiceNode001服务器对应内容为 echo 1 > myid; MircroServiceNode002服务器对应内容为 echo 2 > myid; MircroServiceNode003服务器对应内容为 echo 3 > myid; 
  ```

#### kafka-manager configuration

- conf/application.conf

  ```properties
  cmak.zkhosts="MircroServiceNode001:2181,MircroServiceNode002:2181,MircroServiceNode003:2181"
  ```

  如果开启**Enable JMX Polling ** ,需要在kafka server启动命令上添加jmx_port参数
  
  ```
  if [ "x$KAFKA_HEAP_OPTS" = "x" ]; then
     # export KAFKA_HEAP_OPTS="-Xmx1G -Xms1G"
      export KAFKA_HEAP_OPTS="-server -Xms2G -Xmx2G -XX:PermSize=128m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -XX:ConcGCThreads=5 -XX:InitiatingHeapOccupancyPercent=70"
      export JMX_PORT="9999"
  fi
  ```
  
