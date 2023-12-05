<template>
  <div id="control-panel-wrapper">
    <div class="mode-switch-bar-wrapper radius glass">
      <button
          v-for="(mode, index) in modes"
          :key="index"
          class="switch-button"
          :class="{ active: deviceStore.activeMode === index }"
          @click="setActiveMode(index)"
      >
        {{ mode.text }}
      </button>
    </div>
    <div class="bottom-wrapper">
      <div class="radius display-wrapper">
        <div class="title">当前同步帧</div>
        <img id="display-img" class="display"
             :src="'https://asset.0xcafebabe.cn/'+this.deviceStore.deviceInfo.id+'/frame.bmp'">
      </div>
      <div class="radius settings-wrapper" v-if="deviceStore.activeMode !== 0">
        <div class="title" style="margin-bottom: 10px">控制面板</div>
        <div v-if="deviceStore.activeMode===1">
          <div class="tips">1. 挑选你喜欢的图片</div>
          <div class="tips" style="color: #909399">
            注：如果分辨率不是 400x300，图片会被自动裁切至 400x300
          </div>
          <input type="file" accept="image/*" ref="fileInput" id="fileInput" style="display: none;"
                 @change="previewFile">
          <button class="common-button" @click="triggerFileInput" style="margin-bottom: 25px">选择图片</button>
          <div class="tips" style="margin-bottom: 25px">2. 已选择的图片</div>
          <img ref="preview" id="preview" style="max-width: 100%;"/>
          <div class="tips">3. 上传</div>
          <button class="common-button" @click="uploadFile">同步至PowerInk</button>
        </div>
        <div v-if="deviceStore.activeMode === 2" class="text-mode-panel">
          <div class="tips">1. 输入你想显示的文本
            <div class="tips" style="color: #909399">
              注：支持自动换行；接受以下字符：标准Emoji表情、中文、英文、数字、标点符号、特殊符号
            </div>
          </div>
          <textarea ref="textInput" class="text-input"></textarea>
          <button class="common-button" @click="uploadText">同步至PowerInk</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {useToast} from 'vue-toastification'
import {useDeviceStore} from "@/stores/deviceStore";

const toast = useToast()

export default {
  name: "ControlPanel",
  setup() {
    const deviceStore = useDeviceStore();

    const pullDeviceInfo = async () => {
      try {
        const response = await axios.get('https://api.ink.0xcafebabe.cn/device/getDeviceInfo/' + deviceStore.deviceInfo.id);
        deviceStore.setDeviceInfo(response.data.data);
      } catch (error) {
        console.error('设备信息拉取失败', error);
      }
    };

    return {deviceStore, pullDeviceInfo};
  },
  data() {
    return {
      // activeMode: 0,
      modes: [
        {text: '清屏', value: '0'},
        {text: '图片', value: '1'},
        {text: '文字 & Emoji', value: '2'},
        // { text: '时钟', value: '3' },
        // { text: '天气', value: '4' }
      ],
      selectedFile: null,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.updateDisplayImg();
    }, 5000);
    this.deviceInfoInterval = setInterval(() => {
      this.pullDeviceInfo();
    }, 3000);
  },
  methods: {
    // pullDeviceInfo() {
    //   axios.get('https://api.ink.0xcafebabe.cn/device/getDeviceInfo/' + this.deviceStore.deviceInfo.id)
    //       .then(response => {
    //         console.log('设备信息拉取成功', response.data);
    //         deviceStore.setDeviceInfo(response.data.data);
    //       })
    // },
    updateDisplayImg() {
      document.getElementById('display-img').src = 'https://asset.0xcafebabe.cn/' + this.deviceStore.deviceInfo.id + '/frame.bmp?t=' + new Date().getTime();
    },
    setActiveMode(index) {
      this.deviceStore.setActiveMode(index);
      // sessionStorage.setItem('mode', index);
      const formData = new FormData();
      formData.append('mode', index);
      axios.post('https://api.ink.0xcafebabe.cn/settings/switchMode/' + this.deviceStore.deviceInfo.id, formData)
          .then(response => {
            console.log('Mode updated successfully', response.data);
          })
          .catch(error => {
            console.error('Error updating mode', error);
          });

      if (this.deviceStore.activeMode === 0) {
        document.getElementById('display-img').style.opacity = 0;
      } else {
        document.getElementById('display-img').style.opacity = 1;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    previewFile(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.selectedFile = input.files[0];
        console.log(this.selectedFile);
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.preview.src = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    uploadFile() {
      if (!this.selectedFile) {
        toast.warning('请先选择一个图片文件，再进行同步！');
        return;
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      axios.post('https://api.ink.0xcafebabe.cn/settings/uploadImage/' + this.deviceStore.deviceInfo.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            console.log(response);
            toast.success('图片上传成功，与PowerInk同步！');
          })
          .catch(error => {
            console.error(error);
            toast.error('图片收取失败，图片分辨率需 >= 400 × 300');
            toast.error('或检查网络连接后再试！');
          });
    },
    uploadText() {
      const text = this.$refs.textInput.value;
      if (!text) {
        toast.warning('请先输入文本！');
        return;
      }
      axios.post('https://api.ink.0xcafebabe.cn/settings/uploadText/' + this.deviceStore.deviceInfo.id, {text: text})
          .then(response => {
            console.log('文本上传成功', response);
            toast.success('文本上传成功！');
          })
          .catch(error => {
            console.error('文本上传失败', error);
            toast.error('文本上传失败！');
          });
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
    clearInterval(this.deviceInfoInterval);
  }
}
</script>

<style scoped>
.radius {
  border-radius: 25px;
}

.switch-button {
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  margin: 8px 5px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: rgba(110, 110, 110, 0.5);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.switch-button:hover {
  background: rgba(110, 110, 110, 0.7);
}

.active {
  background: #FAB000 !important;
}

#control-panel-wrapper {
}

.mode-switch-bar-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.bottom-wrapper {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.bottom-wrapper .display-wrapper {
  background: white;
  flex: 70;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.display {
  margin-top: 15px;
}

.bottom-wrapper .settings-wrapper {
  background: white;
  padding: 1rem;
  flex: 30;
}

.title {
  color: black;
  font-size: 22px;
  font-weight: 600;
  font-family: sans-serif;
  margin-left: .3rem;
}

.tips {
  color: black;
  font-size: 18px;
  font-weight: 400;
  font-family: sans-serif;
  margin-left: .3rem;
}

.common-button {
  padding: 0 1rem;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #67C23A;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.15s ease-in-out;
  margin-top: 10px;
}

.common-button:hover {
  background: #5CAB32;
}

.text-input {
  width: calc(100% - 1.3rem);
  height: 150px;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
}

</style>
