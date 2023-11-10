<script>
import axios from "axios";

export default {
  name: "ControlPanel",
  data() {
    return {
      activeMode: null,
      modes: [
        {text: '空白', value: '0'},
        {text: '图形', value: '1'},
        {text: '文字', value: '2'},
        {text: '时钟', value: '3'},
        {text: '天气', value: '4'}
      ],
      selectedFile: null,
    }
  },
  computed: {
    dynamicSrc() {
      const sn = sessionStorage.getItem('sn');
      const base = "https://asset.0xcafebabe.cn/";
      const path = "/frame.bmp";
      return `${base}${sn}${path}`;
    }
  },
  methods: {
    setActiveMode(index) {
      // 将新的模式值设置到Vue实例的数据属性中
      this.activeMode = index;
      // 更新sessionStorage的值
      sessionStorage.setItem('mode', index);

      // 设置要发送的数据
      const formData = new FormData();
      formData.append('mode', index);

      // 使用axios发送数据到你的后端
      axios.post('http://127.0.0.1:8080/settings/switchMode/' + sessionStorage.getItem('sn'), formData)
          .then(response => {
            // 这里处理成功的响应
            console.log('Mode updated successfully', response.data);
          })
          .catch(error => {
            // 这里处理错误的响应
            console.error('Error updating mode', error);
          });
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // 触发文件输入
    },
    previewFile(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.selectedFile = input.files[0]; // 保存选中的文件
        console.log(this.selectedFile)
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$refs.preview.src = e.target.result; // 预览图片
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    uploadFile() {
      if (!this.selectedFile) {
        alert('请先选择一个图片文件！');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // 使用axios发送formData
      axios.post('http://127.0.0.1:8080/settings/uploadImage/' + sessionStorage.getItem('sn'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            // 处理上传成功
            console.log(response)
            alert('图片上传成功！');
          })
          .catch(error => {
            // 处理上传失败
            console.log(error)
            alert('图片上传失败！');
          });
    }
  },
  created() {
    // 组件创建完成后从sessionStorage读取mode
    this.activeMode = sessionStorage.getItem('mode') || 0;
  }
}
</script>

<template>
  <div id="control-panel-wrapper">
    <div class="mode-switch-bar-wrapper radius glass">
      <button
          v-for="(mode, index) in modes"
          :key="index"
          class="switch-button"
          :class="{ active: activeMode === index }"
          @click="setActiveMode(index)"
      >
        {{ mode.text }}
      </button>
    </div>
    <div class="bottom-wrapper">
      <div class="radius display-wrapper">
        <div class="title">当前帧</div>
        <img class="display" :src="dynamicSrc">
      </div>
      <div class="radius settings-wrapper">
        <div class="title" style="margin-bottom: 10px">控制面板</div>
        <div v-if="activeMode===1">
          <div class="tips">1. 上传你喜欢的图片</div>
          <input type="file" ref="fileInput" id="fileInput" style="display: none;" @change="previewFile">
          <button class="common-button" @click="triggerFileInput" style="margin-bottom: 25px">选择图片</button>
          <div class="tips" style="margin-bottom: 25px">2. 图片预览</div>
          <img ref="preview" id="preview" style="max-width: 100%;"/>
          <div class="tips">3. 上传</div>
          <button class="common-button" @click="uploadFile">上传图片</button>
        </div>
      </div>
    </div>
  </div>
</template>

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


</style>
