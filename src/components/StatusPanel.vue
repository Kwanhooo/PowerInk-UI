<script>
import {useDeviceStore} from "@/stores/deviceStore";

export default {
  setup() {
    const deviceStore = useDeviceStore();
    return {deviceStore};
  },
  name: "StatusPanel",
  methods: {
    pad(number) {
      return number < 10 ? '0' + number : number;
    },
    beautifyDateTime(dateTime) {
      if (dateTime) {
        const date = new Date(dateTime);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`
      }
      return null;
    }
  }
}
</script>

<template>
  <div id="status-panel-wrapper">
    <div class="basic-info">
      <div class="device-img-wrapper">
        <img src="@/assets/img/pcb.png" class="device-img">
      </div>
      <div class="device-info-wrapper">
        <div class="device-name">
          {{ deviceStore.deviceInfo.name?.length > 0 ? deviceStore.deviceInfo.name : '获取中...' }}
        </div>
        <div style="margin-top: .4em">
          <span style="background: #909399;border-radius: 10px;padding: 2px 4px 2px 9px;">
            S/N
          </span>
          <span style="margin-left: 8px">
            {{ deviceStore.deviceInfo.id ?? '获取中...' }}
          </span>
        </div>
      </div>
    </div>
    <div class="uptime-info">
      <div class="description">
        <span style="margin-left: 0;color: #909399">
            * 设备 “<span style="color: #FAB000;font-weight: bold">{{ deviceStore.deviceInfo.description }}</span>”
          源自 <span style="color: #FAB000;font-weight: bold">{{ deviceStore.deviceInfo.ip ?? '因特网' }}</span> 与 PowerInk™ Server 连接
        </span>
      </div>
      <div class="last-seen" style="margin-top: 2px">
        <span style="background: #409EFF;border-radius: 10px;padding: 2px 4px 2px 8px;">
            最后在线
          </span>
        <span style="margin-left: 8px">
            {{ beautifyDateTime(deviceStore.deviceInfo.lastSeen) ?? '获取中...' }}
          </span>
      </div>
      <div class="status" style="margin-top: 2px">
        <span style="border-radius: 10px;padding: 2px 4px 2px 8px;"
              :class="{online:deviceStore.deviceInfo.online,offline:!deviceStore.deviceInfo.online}">
            状态
          </span>
        <span style="margin-left: 8px">
            {{ deviceStore.deviceInfo.online ? '在线' : '离线' }}
          </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: #222;
}

#status-panel-wrapper {
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
}

.basic-info {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
}

.device-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.device-name {
  font-size: 1.2rem;
  font-weight: 600;
}

.basic-info .device-img {
  width: 50px;
  height: 50px;
  margin: 15px 10px 10px 0px;
}

.uptime-info {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 13px;
}

.online {
  background: #67C23A
}

.offline {
  background: #F56C6C
}
</style>
