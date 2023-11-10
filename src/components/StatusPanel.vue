<script>
export default {
  name: "StatusPanel",
  computed: {
    sn() {
      return sessionStorage.getItem('sn');
    }
  },
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
          Raspberry Pi Zero WH (Gen 1)
        </div>
        <div style="margin-top: .4em">
          <span style="background: #909399;border-radius: 10px;padding: 2px 4px 2px 9px;">
            S/N
          </span>
          <span style="margin-left: 8px">
            {{ sn }}
          </span>
        </div>
      </div>
    </div>
    <div class="uptime-info">
      <div class="description">
        <span style="margin-left: 0;color: #909399">
            * 设备已受到 PowerInk Server 验证
        </span>
      </div>
      <div class="last-seen" style="margin-top: 2px">
        <span style="background: #409EFF;border-radius: 10px;padding: 2px 4px 2px 8px;">
            最后在线
          </span>
        <span style="margin-left: 8px">
            2023年11月8日 23:29:34
          </span>
      </div>
      <div class="status" style="margin-top: 2px">
        <span style="background: #67C23A;border-radius: 10px;padding: 2px 4px 2px 8px;">
            状态
          </span>
        <span style="margin-left: 8px">
            在线
          </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
